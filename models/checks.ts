import mongoose, { Schema } from "mongoose";
import Joi from 'joi';

const checkSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
  url: { type: String, required: true },
  protocol: {
    type: String,
    required: true,
    enum: ['http', 'https', 'tcp'],
    lowercase: true
  },
  path: { type: String },
  port: { type: Number, min: 1, max: 65535 },
  webhook: { type: String },
  timeout: { type: Number, min: 5, default: 5, required: true },
  interval: { type: Number, min: 1, default: 10, required: true },
  threshold: { type: Number, min: 1, default: 1, required: true },
  totalNumOfFailures: { type: Number, default: 0, required: true },
  authentication: {
    type: new mongoose.Schema({
      username: { type: String, required: true },
      password: { type: String, required: true }
    }),
  },
  httpHeaders: { type: Object },
  assert: {
    type: new mongoose.Schema({
      response: { type: String },
      statusCode: { type: Number, required: true }
    })
  },
  tags: { type: [String] },
  ignoreSSL: {
    type: Boolean,
    //@ts-ignore
    required: function () { return this.protocol === 'HTTPS' }
  },
  next_check_date: { type: Date, required: true, default: Date.now() },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Check = mongoose.model('Check', checkSchema);

const validateCheck = (check) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    url: Joi.string().min(5).max(255).required().uri(),
    protocol: Joi.string().valid('http', 'https', 'tcp').insensitive().required(),
    path: Joi.string(),
    port: Joi.number().min(1).max(65535),
    webhook: Joi.string().required().uri(),
    timeout: Joi.number().min(5),
    interval: Joi.number().min(1),
    threshold: Joi.number().min(1),
    authentication: Joi.object(),
    httpHeaders: Joi.object(),
    assert: Joi.object({
      response: Joi.string(),
      statusCode: Joi.number().required()
    }),
    tags: Joi.array(),
    ignoreSSL: Joi.when('protocol', {
      is: 'https', then: Joi.boolean().required()
    })
  })

  return schema.validate(check);
}

const validateCheckOnUpdate = (check) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255),
    url: Joi.string().min(5).max(255).uri(),
    protocol: Joi.string().valid('http', 'https', 'tcp').insensitive(),
    path: Joi.string(),
    port: Joi.number().min(1).max(65535),
    webhook: Joi.string().uri(),
    timeout: Joi.number().min(5),
    interval: Joi.number().min(1),
    threshold: Joi.number().min(1),
    authentication: Joi.object(),
    httpHeaders: Joi.object(),
    assert: Joi.object({
      response: Joi.string(),
      statusCode: Joi.number()
    }),
    tags: Joi.array(),
    ignoreSSL: Joi.when('protocol', {
      is: 'https', then: Joi.boolean().required()
    })
  })

  return schema.validate(check);
}

export { Check, validateCheck as validate, validateCheckOnUpdate as validateOnUpdate }
