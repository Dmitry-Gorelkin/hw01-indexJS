const { program } = require('commander');

const contacts = require('./contacts.js');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')
  .parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.getContacts();
      return console.log(allContacts);

    case 'getById':
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn('Unknown action type!');
  }
};

invokeAction(argv);
