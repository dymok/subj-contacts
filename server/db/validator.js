module.exports = {
  getErrors: (contact) => {
    const { firstname, lastname, phone, address } = contact;
    const errors = [];

    if (!firstname && !lastname) {
      errors.push({message: 'At least one of fields "firstname" and "lastname" should not be empty'});
    }

    // If phone is not empty it should match the next pattern:
    // optional '+' in the begining
    // then combination of digits and spaces
    if (phone) {
      if (!/^\+{0,1}(\s*[0-9]+\s*)+$/.test(phone)) {
        errors.push({message: 'Phone number is incorrect'});
      };
    }
    return errors;
  }
}
