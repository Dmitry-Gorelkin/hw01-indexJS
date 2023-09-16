const { program } = require('commander');

const contacts = require('./contacts.js');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')
  .parse();

const option = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.getContacts();
      return console.table(allContacts);

    case 'getById':
      const contactById = await contacts.getContactById(id);
      return console.table(contactById);

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);

    default:
      console.warn('Unknown action type!');
  }
};

invokeAction(option);
