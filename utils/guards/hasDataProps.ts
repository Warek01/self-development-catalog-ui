const hasDataProps = (obj: unknown): obj is PageData => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return 'pageData' in obj && typeof obj['pageData'] === 'object';
};

export default hasDataProps;
