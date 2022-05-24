import express from 'express';
import checks from '../routes/checks';
import users from '../routes/users';
import reports from '../routes/reports';
import auth from '../routes/auth';
import error from '../middleware/error';

export = (app: any) => {
  app.use(express.json());
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/checks', checks);
  app.use('/reports', reports);
  app.use('/reports', reports);
  app.use(error);
}