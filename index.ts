
import express from 'express';
const app = express();

import './startup/db';
import './cronjobs';
import './startup/task-consumers';
import './startup/axios';
import './startup/notification-subscribers'
require('./startup/routes')(app);

app.listen(process.env.PORT || 3000, () => { console.log('Listening on PORT 3000...') });
