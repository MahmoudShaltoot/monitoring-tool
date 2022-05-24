
import { User } from '../../models/user';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import config from 'config'


describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      email: 'user@test.com'
    };

    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});