const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); 

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());


app.use(morgan('dev')); 

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
