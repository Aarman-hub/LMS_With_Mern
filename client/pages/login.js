import { SyncOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Context } from '../context';
import {useRouter} from 'next/router'

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {state, dispatch} = useContext(Context);

  const {user} = state;

  const router = useRouter();

  useEffect(()=>{
    if(user !== null) router.push("/");
  },[user]);

  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/auth/signin`, {
        email,
        password,
      });
      // console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.push("/");
      // setLoading(false);
    } catch (err) {
      toast.error("Login failed try again.");
      setLoading(false);
    }
  }
  
  return (
    <>
      <h1 className='jumbotron text-center p-5 bg-primary'>Login</h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={submitHandler}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control mb-3 p-3" placeholder="Email" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control mb-3 p-3" placeholder="Password" />
          <button disabled={!email || !password} className='btn btn-block p-3 w-100 btn-primary'>{loading ? <SyncOutlined spin />:"Login"}</button>
        </form>
        <p className='text-center pt-3'>
          Hav'nt an account ? 
          <Link href="/register">
            <a> Register</a>
          </Link>
        </p>
        <p className='text-center'>
          <Link href="/forgot-password">
            <a className='text-danger'> Forgot Password</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default login