const Sequelize = require('sequelize');
const { defineContacts } = require('./models');

const
    host = process.env.DB_HOST,
    name = process.env.DB_NAME,
    user = process.env.DB_USER,
    pass = process.env.DB_PASS;

const sequelize = new Sequelize(name, user, pass, {
  host,
  dialect: 'postgres'
});

const Contact = defineContacts(sequelize, Sequelize);

const sync = async () => await sequelize.sync();

sync();

module.exports = {
  Contact
}
