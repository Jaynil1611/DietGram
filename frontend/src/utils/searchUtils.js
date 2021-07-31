export const checkSearchQuery = (property, searchQuery) =>
  property.toLowerCase().includes(searchQuery);

export const getSearchResults = (users, searchQuery) => {
  return searchQuery
    ? users.filter((user) => {
        const { username, fullname } = user;
        return (
          checkSearchQuery(username, searchQuery) ||
          checkSearchQuery(fullname, searchQuery)
        );
      })
    : [];
};
