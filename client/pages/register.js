import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {SyncOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';

const register = () => {
  const [name, setName] = useState("");
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
      const {data} = await axios.post(`/api/auth/signup`,{name, email, password});
      toast.success("Accout crated successfully.")
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  
  }
  
  return (
    <>
      <h1 className='jumbotron text-center p-5 bg-primary'>Register</h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={submitHandler}>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control mb-3 p-3" placeholder="Name" />
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control mb-3 p-3" placeholder="Email" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control mb-3 p-3" placeholder="Password" />
          <button disabled={!name || !email || !password || loading} className='btn btn-block p-3 btn-primary w-100'>{loading ? <SyncOutlined spin />:"Submit"}</button>
        </form>
        <p className='text-center p-3'>
          Have an account ? 
          <Link href="/login">
            <a> Login</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default register