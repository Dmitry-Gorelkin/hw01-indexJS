const fs = require('fs').promises;
const path = require('node:path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname, '/db/contacts.json');

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
};

const getContactById = async id => {
  const data = await getContacts();
  const contact = data.find(e => id === e.id);
  return contact || null;
};

const removeContact = async id => {
  const data = await getContacts();
  const removeContact = data.find(e => id === e.id);
  if (!removeContact) return null;

  const newContacts = data.filter(e => id !== e.id);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return removeContact;
};

const addContact = async data => {
  const contacts = await getContacts();
  const newContact = { id: nanoid(), ...data };
  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, newContact], null, 2)
  );
  return newContact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};
