import { transform, sortBy } from 'lodash';

import { usersSelector, repositoriesSelector } from 'core/entities/github/github.selectors';

export const feedSelector = (state) => {
  const users = usersSelector(state);
  const repositories = repositoriesSelector(state);

  const feed = transform(state.pages.feed.feedData, (result, value) => {
    result.push({
      id: value.id,
      starredAt: new Date(value.starredAt),
      userName: users[value.userId].name,
      userAvatarURL: users[value.userId].avatarURL,
      repositoryName: repositories[value.repositoryId].name,
      repositoryOwner: repositories[value.repositoryId].owner.login,
      repositoryDescription: repositories[value.repositoryId].description
    });

    return result;
  }, []);

  return sortBy(feed, ({ starredAt }) => -starredAt);
};

export const previewSelector = (state) => ({
  readme: state.pages.feed.previewData ? window.atob(state.pages.feed.previewData.readme) : null
});

export const feedLoadingSelector = (state) => state.pages.feed.feedLoading;

export const previewLoadingSelector = (state) => state.pages.feed.previewLoading;

export const feedDataItemSelector = (state, feedItemId) => state.pages.feed.feedData[feedItemId];

export const previewItemIdSelector = (state) => state.pages.feed.previewData && state.pages.feed.previewData.feedItemId;
