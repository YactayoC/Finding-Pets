import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderPublications = () => (
  <ContentLoader
    speed={2}
    width={776}
    height={475}
    viewBox="0 0 776 475"
    backgroundColor="#fcfcfc"
    foregroundColor="#d6d1d1"
  >
    <path d="M 0 51 h 776 v 424 H 0 z M 58 25 h 102 v 15 H 58 z M 58 0 h 120 v 19 H 58 z" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export default LoaderPublications;
