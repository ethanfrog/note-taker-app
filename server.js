const express = require('express');

const htmlRouteStart = require('./routes/htmlRoutes');
const apiRouteStart = require('./routes/apiRoutes');

// Initialize express app
const app = express();
// Port number is defined here
const PORT = process.env.PORT || 3001;

// JSON encoding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static middleware
app.use(express.static('public'));
// Routing middleware
app.use('/', htmlRouteStart);
app.use('/api', apiRouteStart);

// Start server, display port number
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
