// src/components/PageWrapper.js
import React from 'react';
import { Helmet } from 'react-helmet';

const PageWrapper = ({ title, description, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <main>{children}</main>
    </>
  );
};

export default PageWrapper;
