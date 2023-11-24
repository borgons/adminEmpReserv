const path = require('path')
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 6001;

connectDB();

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))


// ROUTES
const rtAdmin = require('./routes/api/admin');
const rtEmployee = require('./routes/api/employee');

app.use('/routes/api/admin', rtAdmin);
app.use('/routes/api/employee', rtEmployee)


// SERVE FRONTEND
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})