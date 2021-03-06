
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');


const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const barberAptRouter = require('./routes/barberApt.router');
const aptSlotRouter = require('./routes/aptSlot.router');
const barberRouter = require('./routes/barber.router');
const addAptRouter = require('./routes/aptSetter.router');
const deleteRouter = require('./routes/delete.router');
const aptHistoryRouter = require('./routes/aptHistory.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/barberApt', barberAptRouter)
app.use('/api/slots', aptSlotRouter),
app.use('/api/barbers', barberRouter),
app.use('/api/addApt', addAptRouter);
app.use('/api/delete', deleteRouter);
app.use('/api/history', aptHistoryRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
