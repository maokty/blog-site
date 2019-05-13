import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import MobileMenu from 'rc-drawer';
import { enquireScreen } from 'enquire-js';
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
      // theme="dark"
      style={{ height: '100%' }}
      defaultSelectedKeys={[pathname]}
      className="aside-container menu-site"
      defaultOpenKeys={[pathname.substr(0, pathname.lastIndexOf('/'))]}
      mode="inline"
    >
      {renderMenuChildren(dataBlog)}
    </Menu>
  );
}

function RenderDrawer(props) {
  const { visible, onClose = () => { }, ...otherProps } = props;

  return <MobileMenu
    iconChild={[<Icon type="menu-unfold" />, <Icon type="menu-fold" />]}
    key="Mobile-menu"
    wrapperClassName="drawer-wrapper"
  >
    {renderMenu(props)}
  </MobileMenu>
}


let isMobile = false;
enquireScreen(b => {
  isMobile = b;
});

export default class Layout extends React.PureComponent {
  state = {
    isMobile
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  render() {
    const { isMobile } = this.state;
    const props = this.props;
    return (
      <DocumentTitle title={props.themeConfig.sitename}>
        <Row className="main-wrapper">
          <Col xs={{ span: 0 }} sm={{ span: 5 }} className="main-menu">
            {isMobile ? null : renderMenu(props)}
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 19 }} className="main-container">
            {isMobile ? <RenderDrawer {...props} visible={true} onClose={() => { }} /> : null}
            <div style={isMobile ? { padding: 0 } : {}} className="main-article-wrapper markdown">
              {props.children}
            </div>
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
}