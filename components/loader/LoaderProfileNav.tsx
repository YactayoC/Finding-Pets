import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderProfileNav = (props: any) => (
  <ContentLoader
    speed={2}
    width={45}
    height={45}
    viewBox="0 0 45 45"
    backgroundColor="#fcfcfc"
    foregroundColor="#d6d1d1"
    {...props}
  >
    <circle cx="23" cy="23" r="23" />
  </ContentLoader>
);

export default LoaderProfileNav;
