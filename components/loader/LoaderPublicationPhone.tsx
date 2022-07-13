import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderPublicationsPhone = (props: any) => (
  <ContentLoader
    speed={2}
    width={355}
    height={282}
    viewBox="0 0 355 282"
    backgroundColor="#fcfcfc"
    foregroundColor="#d6d1d1"
    {...props}
  >
    <path d="M 0 51 h 776 v 424 H 0 z M 58 25 h 102 v 15 H 58 z M 58 0 h 120 v 19 H 58 z" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export default LoaderPublicationsPhone;
