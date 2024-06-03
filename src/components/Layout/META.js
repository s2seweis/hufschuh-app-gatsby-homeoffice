import React from 'react';
import Helmet from 'react-helmet';
import meta from '../../constants/meta';

export default function Meta({ title, description }) {
  return (
    <Helmet>
      {/* Language for screen readers */}
      <html lang="de" />

      {/* Char set */}
      <meta charSet="utf-8" />

      {/* Title for browser and search engines */}
      <title>{title ? title : meta.DEFAULT_TITLE}</title>

      {/* Description for search engines and social media */}
      <meta name="description" content={description || meta.DEFAULT_DESCRIPTION} />
      <meta
        property="og:description"
        content={description || meta.DEFAULT_DESCRIPTION}
      />
      <meta
        property="twitter:description"
        content={description || meta.DEFAULT_DESCRIPTION}
      />
    </Helmet>
  );
}
