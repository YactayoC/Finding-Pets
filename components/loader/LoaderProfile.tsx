import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderProfile = (props: any) => (
  <ContentLoader
    speed={2}
    width={180}
    height={180}
    viewBox="0 0 180 180"
    backgroundColor="#ffffff"
    foregroundColor="#d6d1d1"
    {...props}
  >
    <circle cx="90" cy="90" r="90" />
  </ContentLoader>
);

export default LoaderProfile;
