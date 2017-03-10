import { transform, sortBy } from 'lodash';

export const feedSelector = (state) => {
  const feed = transform(state.pages.feed.feedList, (result, value) => {
    result.push({
      id: value.id,
      starredAt: new Date(value.starredAt),
      userName: state.entities.github.users[value.userId].name,
      userAvatarURL: state.entities.github.users[value.userId].avatarURL,
      repositoryURL: state.entities.github.repositories[value.repositoryId].url,
      repositoryName: state.entities.github.repositories[value.repositoryId].name,
      repositoryDescription: state.entities.github.repositories[value.repositoryId].description
    });

    return result;
  }, []);

  const sortedFeed = sortBy(feed, ({ starredAt }) => -starredAt);

  return sortedFeed;
};
