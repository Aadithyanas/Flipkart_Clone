import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

import Connection from './database/db.js';
import DefaultData from './default.js';
import Routes from './routes/route.js';


dotenv.config();
const app = express();

const PORT = 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
DefaultData();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);

export let paytmMerchantkey ='bKMfNxPPf_QdZppa';
export let paytmParams = {};
paytmParams['MID'] = 'DIY12386817555501617';
paytmParams['WEBSITE'] = 'DIYtestingweb';
paytmParams['CHANNEL_ID'] = 'WEB';
paytmParams['INDUSTRY_TYPE_ID'] = 'Retail';
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = 'unzVbK56349744191124';
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'kunaltyagi@gmail.com';
paytmParams['MOBILE_NO'] = '1234567852';

