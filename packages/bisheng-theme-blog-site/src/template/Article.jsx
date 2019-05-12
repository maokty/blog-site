import React from 'react';
import collect from 'bisheng/collect';
import { Affix } from 'antd';
import { formatContent } from '../utils';
import DocumentTitle from 'react-document-title';

const Post = (props) => {
  const { pageData, utils } = props;
  const { meta, description, content } = pageData;
  let formatedContent = formatContent(content);
  return (
    <DocumentTitle title={`${meta.title} | ${props.themeConfig.sitename}`}>
      <div className="markdown">
        <h1 className="entry-title">{meta.title}</h1>
        {
          !description ? null :
            <div className="entry-description">{utils.toReactComponent(description)}</div>
        }
        <div className="entry-content">{utils.toReactComponent(formatedContent.content)}</div>

        <Affix className="toc-affix" offsetTop={16}>
          {props.utils.toReactComponent(
            ['ul', { className: 'toc' }].concat(formatedContent.toc)
          )}
        </Affix>
      </div>
    </DocumentTitle>
  );
}

export default collect(async (nextProps) => {
  if (!nextProps.pageData) {
    throw 404;
  }
  const pageData = await nextProps.pageData();
  return { pageData };
})(Post);