const express = require('express');
const router = express.Router();

const { Contact } = require('../db');

const { getErrors } = require('../db/validator');

// Get list of contacts
router.get('/', (req, res) => {
  Contact.findAll({
    order: [
      ['lastname'],
      ['firstname']
    ]
  }).then( items => res.json(items));
});

// Create new contact
router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, phone, address } = req.body;

    // Some basic validation
    const errors = getErrors(req.body);

    if (errors.length) {
      res.status(400).send({errors});
    } else {
      const newItem = await Contact.create(req.body);
      res.send(newItem);
    }
  } catch (error) {
    res.status(500).send({error: 'Server error'});
  }
});

// Update contact
router.put('/:id', async (req, res) => {
  try {
    const { firstname, lastname, phone, address } = req.body;

    // Some basic validation
    const errors = getErrors(req.body);

    if (errors.length) {
      res.status(400).send({errors});
    } else {
      const [count, items] = await Contact.update( req.body, {
        where: {
          id: req.params.id
        },
        returning: true
      });

      if (count) {
        res.send(items[0]);
      } else {
        res.status(400).send({error: "No affected rows"});
      }
    }
  } catch(error) {
    res.status(500).json({error: 'Some error'});
  }
});

// Delete contact
router.delete('/:id', (req, res) => {
  Contact.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send(204));
});

module.exports = router;
