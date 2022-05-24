import { User } from '../../models/user';
import { auth } from '../../middleware/auth';
import mongoose from 'mongoose';

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      email: 'user@test.com'
    };

    const token = new User(user).generateAuthToken();
    const req: any = {
      headers: {
        'authorization': token
      }
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});