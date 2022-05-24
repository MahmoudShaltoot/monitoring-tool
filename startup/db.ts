import mongoose from 'mongoose';
import config from 'config';
 
mongoose.connect(config.get('db.uri'))
  .then(() => { console.log('connected to mongoDB...') })
  .catch((err) => { console.log('could not connect to mongoDB', err) })
