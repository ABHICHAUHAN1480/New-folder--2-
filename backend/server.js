const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const connectDB = require('./dbconnection/db');
connectDB();

const { clerkMiddleware } = require('@clerk/express');
app.use(cors());
app.use(express.json()); 
app.use(clerkMiddleware());


app.get('/', (req, res) => {
    res.send('Hello World');
  });
app.use("/temp", require('./routes/temprout'));
app.use("/User", require('./routes/user'));
app.use("/course", require('./routes/course'));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });