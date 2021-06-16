export const checkCurrentUserFollowStatus = (currentUser, userId) => {
  return currentUser.following.find((id) => id === userId) ? true : false;
};

