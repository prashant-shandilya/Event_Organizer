import React from 'react'
import {useState} from 'react';

function Login({setJwt}) {
    let[username,setUsername] = useState();
    let[password,setPassword] = useState();
async function login(){
    const data = {username,password};
    let st = await fetch('http://localhost:5005/user/login',{method:"POST",body:JSON.stringify(data)}).then(res=>res.json());
    
    // Sets the jwt , now the user is authorised.
    if(st.token)setJwt(st.token);
}

  return (
    //Login form for login, it returns the jwt which is used for authorization.
    <div>
    <form onSubmit={login}>
        <label htmlFor="usr">Username</label>
        <input type="text" id="usr" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
        <label htmlFor="pswd">Password</label>
        <input type="password" id="pswd" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button type="submit"/>
    </form>

</div>
  )
}

export default Login