import React from 'react'
import {Menu} from 'antd';
import Link from 'next/link';
import {AppstoreAddOutlined, UserAddOutlined, LoginOutlined} from "@ant-design/icons";

const {Item} = Menu;

const TopNav = () => {
  return (
    <Menu mode='horizontal'>
      <Item icon={<AppstoreAddOutlined />}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>
      <Item icon={<UserAddOutlined />}>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>
      <Item icon={<LoginOutlined />}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>
    </Menu>
  )
}

export default TopNav