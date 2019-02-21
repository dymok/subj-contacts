module.exports = {
  defineContacts: (sequelize, type) => {
    return sequelize.define('contacts', {
      firstname: type.STRING,
      lastname: type.STRING,
      phone: type.STRING,
      address: type.STRING
    })
  }
}
