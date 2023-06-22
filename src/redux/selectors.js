
export const phonebookSelector = (state) => state.phonebook.contacts;
export const phonebookFilter = (state) => state.phonebook.filter;
export const filteredNamesArr = (state) => (state.phonebook.contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(state.phonebook.filter.toLowerCase())));
