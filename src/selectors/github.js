import { transform, sortBy } from 'lodash';

export const followingSelector = (state) => (
  transform(state.entities.github.following, (result, value) => (
    result.push(value) && result
  ), [])
);

export const followingLoginsSelector = (state) => (
  followingSelector(state).map(({ login }) => login)
);

export const starredRepositoriesSelector = (state) => (
  transform(state.entities.github.starredRepositories, (result, value) => (
    result.push(value) && result
  ), [])
);

export const feedSelector = (state) => {
  const starredRepositories = starredRepositoriesSelector(state);

  const mapResult = starredRepositories.map((repository) => ({
    cursor: repository.cursor,
    userName: state.entities.github.following[repository.starredBy].name,
    userAvatarURL: state.entities.github.following[repository.starredBy].avatarURL,
    starredAt: new Date(repository.starredAt),
    repositoryURL: repository.url,
    repositoryName: repository.name,
    repositoryDescription: repository.description
  }));

  const result = sortBy(mapResult, (feed) => -feed.starredAt);

  return result;
};
