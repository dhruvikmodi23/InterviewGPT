require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./config/passport');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('AI Interviewer API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});