import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'config';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
  return token;
}

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(user)
}

const User = mongoose.model('User', userSchema);

export { User, validateUser as validate }