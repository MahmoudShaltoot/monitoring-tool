import { User, validate } from '../models/users';
import _ from 'lodash';
import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send('User already exist');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  } catch (err: any) {
    return res.status(500).send(`${err.message}`)
  }
});

export = router;