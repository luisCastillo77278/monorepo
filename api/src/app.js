// ! cambiar esto y user el  modelo Server
// ! importar app y la conexion del listen del server
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('../utils/logger');
const routes = require('./routes');
const { connectionDB } = require('./config/db.config');
const { handlingError } = require('./middlewares/handlingErrors');

app = express();
port = process.env.PORT || 3001;
uri = process.env.URL_DEV;

if (process.env.NODE_ENV === 'production')
  uri = process.env.URL_PROD;
if (process.env.NODE_ENV === 'test')
  uri = process.env.URL_TEST;

connectionDB(uri);
logger.info('Base de datos connectada');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../app/build')));

app.use('/api', routes);

app.use(handlingError);

const server = app.listen(
  port,
  () => logger.info(`Server corriendo en el puerto ${port}`)
);

module.exports = {
  app,
  server
};