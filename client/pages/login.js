import axios from 'axios';
import React, { useState } from 'react'

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post(`http://localhost:8000/api/auth/signin`,{email, password});
      toast.success("Accout crated successfully.")
      setLoading(false);
    } catch (err) {
      toast.error("Accout crated failed.")
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
          <button className='btn btn-block p-3 w-100 btn-primary'>Login</button>
        </form>
      </div>
    </>
  )
}

export default login