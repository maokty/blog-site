import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import '../../static/style';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


function renderMenu(props) {
  const { picked, data } = props;
  const BLOG_KEY = Object.keys(picked)[0];
  const blog = picked[BLOG_KEY];
  const dataBlog = data[BLOG_KEY];

  let keyBlog = {};
  blog.forEach(element => {
    let key = element.meta.filename.replace(/\.md$/i, '');
    keyBlog[key] = element;
  });

  function renderMenuChildren(dataBlog, prePath = BLOG_KEY) {
    return Object.keys(dataBlog).map(key => {
      let pathKey = prePath + `/${key}`;
      let current = dataBlog[key];

      if (current instanceof Function) {
        let pathData = keyBlog[pathKey];
        return <Menu.Item onClick={() => { props.router.push(pathKey) }} key={pathKey}>{pathData.meta.title}</Menu.Item>
      } else {
        return (
          <SubMenu key={pathKey} title={<span>{key}</span>}>
            {renderMenuChildren(current, pathKey)}
          </SubMenu>
        );
      }
    })
  }

  const { pathname } = props.location;
  return (
    <Menu
      style={{ height: '100%' }}
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={[pathname.substr(0, pathname.lastIndexOf('/'))]}
      mode="inline"
    >
      {renderMenuChildren(dataBlog)}
    </Menu>
  );
}

export default (props) => {
  return (
    <DocumentTitle title={props.themeConfig.sitename}>
      <Row className="main-wrapper">
        <Col span={5} className="main-menu">
          {renderMenu(props)}
        </Col>
        <Col span={19} className="main-container ">
          <div className="main-article-wrapper markdown">
            {props.children}
          </div>
        </Col>
      </Row>
    </DocumentTitle>
  );
}