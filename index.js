const express = require('express');
const path = require('path');
const app = express();





app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members Api Routes
app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`));