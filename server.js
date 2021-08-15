const express       = require('express');
const dotenv        = require('dotenv');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const path          = require('path');

const app = express();

// ***** DOTENV setting ***** //
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// ***** log request status ***** //
app.use(morgan('tiny'));

// ***** Body Parser Configuration ***** //
app.use(bodyParser.urlencoded({ extended: true }));

// ***** View Configuration ***** //
app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/ejs'));

// **** Load Asset ***** //
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));


// ***** Routes ***** //
const userRoutes = require('./server/routes/router');
app.use('/', userRoutes);

// ***** LISTEN APP ***** //
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})