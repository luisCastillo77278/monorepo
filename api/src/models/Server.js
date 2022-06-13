require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('../../utils/logger');
const routes = require('../routes');
const { connectionDB } = require('../config/db.config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.uri = process.env.URL_DEV;

    this.connectDb();
    this.middlewares();
    this.routers();
  }

  routers() {
    this.app.use('/api', routes);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  async connectDb() {
    if (process.env.NODE_ENV === 'production')
      this.uri = process.env.URL_PROD;
    if (process.env.NODE_ENV === 'test')
      this.uri = process.env.URL_TEST;

    await connectionDB(this.uri);
    logger.info('Base de datos connectada');
  }

  listener() {
    this.app.listen(
      this.port,
      () => logger.info(`Server corriendo en el puerto ${this.port}`)
    );
  }
}

module.exports = Server;