import React from 'react';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, Icon } from 'antd';
import DocumentTitle from 'react-document-title';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function getTime(date) {
  return (new Date(date)).getTime();
}


function renderMenu() {
  return (
    <Menu
      onClick={() => { }}
      style={{ height: '100%' }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
        <MenuItemGroup key="g1" title="Item 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default (props) => {
  const toReactComponent = props.utils.toReactComponent;
  const posts = props.picked.posts
    .sort((a, b) => getTime(b.meta.publishDate) - getTime(a.meta.publishDate));

  let year = NaN;
  const entryList = [];
  posts.forEach(({ meta, description }, index) => {
    if (!meta.publishDate) {
      console.error(`You must set 'publishDate' in meta data for ${meta.filename}.`);
      return;
    }
    const publishYear = meta.publishDate.slice(0, 4);
    if (year !== publishYear) {
      year = publishYear;
      entryList.push(
        <a className="item-year" href={`#${publishYear}`} key={publishYear} id={publishYear}>
          {publishYear}
        </a>);
    }

    entryList.push(
      <div className="item" key={index}>
        <h2 className="item-title" id={meta.title}>
          <time>{`${meta.publishDate.slice(0, 10)} `}</time>
          <Link to={`/${meta.filename.replace(/\.md$/i, '')}`}>{meta.title}</Link>
        </h2>
        {
          !description ? null :
            <div className="item-description">
              {toReactComponent(description)}
            </div>
        }
      </div>
    );
  })
  return (
    <DocumentTitle title={props.themeConfig.sitename}>
      <Row className="main-wrapper">
        <Col span={5} className="main-menu">
          {renderMenu()}
        </Col>
        <Col span={19} className="main-container ">
          <div className="main-article-wrapper markdown">
            {entryList}
          </div>
        </Col>
      </Row>
    </DocumentTitle>
  );
}