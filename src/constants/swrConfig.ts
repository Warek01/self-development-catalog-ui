import type { SWRConfiguration } from 'swr';

const swrConfig: SWRConfiguration = {
  dedupingInterval: 60_000,
  fetcher: (key) => fetch(key).then((key) => key.json()),
  revalidateIfStale: true,
  shouldRetryOnError: true,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  fallbackData: {
    'social-media-links': [],
  },
  errorRetryInterval: 5000,
  errorRetryCount: 10,
  loadingTimeout: 5000,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
  onError(error, key) {
    console.error('SWR error on ', key);
    console.error(error);
  },
  onErrorRetry(error, key) {
    console.log('Retrying ', key);
  },
  onLoadingSlow(key) {
    console.log('Loading slow ', key);
  },
  onDiscarded(key) {
    console.log('Request ignored ', key);
  },
  onSuccess(data, key) {
    console.log('Fetched from ', key, data);
  },
};

export default swrConfig;
