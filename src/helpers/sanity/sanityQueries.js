export const userQuery = (username, password) => {
  const query = `*[_type == 'user' && username == '${username}' && password == '${password}']`;
  return query;
};

export const contactsQuery = (userId) => {
  const query = `*[_type == 'contact' && creator._ref == '${userId}']`;
  return query;
};

export const singleContactQuery = (contactId) => {
  const query = `*[_type == 'contact' && _id == '${contactId}']`;
  return query;
};
