import { Check, validate, validateOnUpdate } from '../models/checks';
import express from 'express';
import { auth } from '../middleware/auth';
import config from 'config';
const router = express.Router();

router.get('/:id', auth, async (req: any, res) => {
  const check = await Check.findById(req.params.id);
  if (!check) return res.status(404).send(`Check with id: ${req.params.id} not found`);

  if (req.user._id !== check.user_id.valueOf()) return res.status(403).send('Access denied');

  return res.send({ check, subscription_link: config.get('pushover.subscription_link') });
});

router.put('/:id', auth, async (req: any, res) => {
  try {
    let check = await Check.findOne({ _id: req.params.id });
    if (!check) return res.status(404).send(`Check with id: ${req.params.id} not found`);

    if (req.user._id !== check.user_id.valueOf()) return res.status(403).send('Access denied');

    const { error } = validateOnUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = await Check.updateOne({ _id: req.params.id }, req.body);
    return res.send(result);
  } catch (err: any) {
    return res.status(500).send(`${err.message}`)
  }
});

router.post('/', auth, async (req: any, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const check = new Check(req.body);
    check.user_id = req.user._id;
    await check.save();

    return res.send({ check, subscription_link: config.get('pushover.subscription_link') });
  } catch (err: any) {
    return res.status(500).send(`${err.message}`)
  }
});

export = router;