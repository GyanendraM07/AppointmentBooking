const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const organizeRoutes = require('./src/Routers/organizeRoutes');
const dotenv = require('dotenv'); 

const app = express();
// Set up Global configuration access 
dotenv.config(); 
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
console.log('TOKEN_HEADER_KEY:', process.env.TOKEN_HEADER_KEY);
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());
// Body parser middleware
app.use(express.json());

organizeRoutes(app);
connectDB();

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
