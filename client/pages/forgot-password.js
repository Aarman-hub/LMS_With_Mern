import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../context';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [succes, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
 
  const route = useRouter();

  const {state:{user}} = useContext(Context);

  useEffect(() => {
    if(user !== null) route.push("/");
  }, [user]);
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        setLoading(true);
        const {data} = await axios.post("/api/auth/forgot-password", {email});
        setSuccess(true);
        toast(`Send link to ${email}`);
        setLoading(false);
    } catch (err) {
        setLoading(false)
        toast(err.response.data);
    }
  }

  const handleResetSubmit = async (e) =>{
    e.preventDefault();
    try {
        setLoading(true);
        const {data} = await axios.post("/api/auth/reset-password", {email, code, newPassword});
        setEmail("");
        setCode("");
        setNewPassword("");
        route.push("/login")
        setLoading(false);
    } catch (err) {
        setLoading(false);
        toast(err.response.data);
    }
  }

  return (
    <>
        <h1 className='jumbotron text-center p-5 text-primary'>Forgot Password</h1>
        <div className='container col-md-4 offset-md-4'>
            <form onSubmit={succes ? handleResetSubmit : handleSubmit}>
                <input 
                    type="email"
                    className='form-control mb-2 p-3'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                {succes && (
                    <>
                        <input 
                            type="text"
                            className='form-control mb-2 p-3'
                            value={code}
                            onChange={e=>setCode(e.target.value)}
                            placeholder="Enter Secret Code"
                            required
                        />
                        <input 
                            type="password"
                            className='form-control mb-2 p-3'
                            value={newPassword}
                            onChange={e=>setNewPassword(e.target.value)}
                            placeholder="New Password"
                            required
                        />
                    </>
                )}
                <button type='submit' disabled={loading || !email} className='btn p-2 btn-primary btn-block w-100'>{loading ? <SyncOutlined spin />: "Submit"}</button>
            </form>
        </div>
    </>
  )
}

export default ForgotPassword;