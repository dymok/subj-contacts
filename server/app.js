const express = require('express');
const bodyParser = require('body-parser');

const contactsRoutes = require('./routes/contacts');

//const Sequelize = require('sequelize');

const __initDB = Symbol('initDB');

module.exports = class App {
  constructor(config) {
    this.config = config;
  }

  start() {
    this[__initDB]();

    const app = express();

    app.use(bodyParser.json())
    app.use(express.static(this.config.staticPath));

    app.use('/api/contacts', contactsRoutes);

    app.get('*', (req,res) => {
      res.sendFile(this.config.staticPath + '/index.html');
    });

    app.listen(this.config.port, () => {
    });
  }

  [__initDB]() {
    const { name, user, pass, host } = this.config.db;

    const db = require('./db');

    //await connect(host, name, user, pass);
    /*
    const sequelize = new Sequelize(name, user, pass, {
      host,
      dialect: 'postgres'
    });

    const models = require('./db/models');

    console.log('models', models);

    models.Contacts(sequelize, Sequelize);

    sequelize.sync().then(_ => console.log('synced'));

    sequelize.authenticate().then( _ => {
      console.log('Connected to PG');
    })
    console.log('========== initDB is called ===========');
    */
  }
}
