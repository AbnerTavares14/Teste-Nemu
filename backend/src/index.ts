import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {journeyRouter} from './router/journeyRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use(journeyRouter);


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});