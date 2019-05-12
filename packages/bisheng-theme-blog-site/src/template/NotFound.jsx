import React from 'react';
import DocumentTitle from 'react-document-title';

export default (props) => {
  return (
    <DocumentTitle title="Not Found">
      <h1 className="entry-title">404 Not Found!</h1>
    </DocumentTitle>
  );
}