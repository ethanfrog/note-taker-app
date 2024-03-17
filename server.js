const express = require('express');

const htmlRouteStart = require('./routes/htmlRoutes');
const apiRouteStart = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', htmlRouteStart);
app.use('/api', apiRouteStart);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
