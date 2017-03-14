export const usersSelector = (state) => state.entities.github.users;

export const userSelector = (state, userId) => state.entities.github.users[userId];

export const repositoriesSelector = (state) => state.entities.github.repositories;

export const repositorySelector = (state, repositoryId) => state.entities.github.repositories[repositoryId];
