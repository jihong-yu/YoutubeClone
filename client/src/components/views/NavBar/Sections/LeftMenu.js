import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="Home">
        <a href="/" style={{ display: 'inline-block' }}>
          Home
        </a>
      </Menu.Item>
      <Menu.Item key="Upload">
        <a href="/video/upload" style={{ display: 'inline-block' }}>
          Upload
        </a>
      </Menu.Item>
      <Menu.Item key="Subscription">
        <a href="/subscription" style={{ display: 'inline-block' }}>
          subscription
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
