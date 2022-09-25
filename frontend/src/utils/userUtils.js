export const checkCurrentUserFollowStatus = (currentUser, userId) => {
  return currentUser.following.find(
    (user) => user === userId || user.id === userId
  )
    ? true
    : false;
};

export const checkCurrentUserFollowerStatus = (list, userId) => {
  return list.find(({ id }) => id === userId) ? true : false;
};
