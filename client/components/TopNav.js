import React, { useContext, useEffect, useState } from 'react'
import {Menu} from 'antd';
import Link from 'next/link';
import {AppstoreAddOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined, UserOutlined, ProfileOutlined} from "@ant-design/icons";
import { Context } from '../context';
import axios from 'axios';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

const {Item , SubMenu, ItemGroup} = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const {state, dispatch} = useContext(Context);

  const {user} = state;

  const router = useRouter();

  useEffect(()=>{
    typeof window !== 'undefined' && setCurrent(window.location.pathname);
  },[]);

  const logOut = async () => {

    dispatch({type:"LOGOUT"});

    window.localStorage.removeItem("user");

    const {data} = await axios.get("/api/auth/signout");
    toast.success(data.message);

    router.push("/login");
  }

  return (
    <Menu mode='horizontal' selectedKeys={[current]}>
      <Item key="/" onClick={(e)=>setCurrent(e.key)}  icon={<AppstoreAddOutlined />}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>
      {user === null && (
        <>
          <Item key="/register" onClick={e=>setCurrent(e.key)} icon={<UserAddOutlined />}>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
          <Item key="/login" onClick={(e)=>setCurrent(e.key)}  icon={<LoginOutlined />}>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
        </>
      )}
      
      {user !== null && (
        <SubMenu key={""} className='float-end' icon={<UserOutlined />} title={user && user.name}>
          <ItemGroup>
            <Item key="/user" onClick={(e)=>setCurrent(e.key)}  icon={<ProfileOutlined  />}>
              <Link href="/user">
                <a>Profile</a>
              </Link>
            </Item>
            <Item key="" onClick={logOut} icon={<LogoutOutlined />}  className="float-right">
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  )
}

export default TopNav