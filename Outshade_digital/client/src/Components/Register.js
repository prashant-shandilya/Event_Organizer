import React from 'react'
import {useState} from 'react';
function Register() {
    let[username,setUsername] = useState();
    let[password,setPassword] = useState();
    let[msg,setMsg] = useState("");

   async function register(){
        const data = {username,password};
        let st = await fetch('http://localhost:5005/user/register',{method:"POST",body:JSON.stringify(data)}).then(res=>res.json());
        //Display the registered message on the board.
    }
  return (
    <div>
      //Register form for registration of a new user , does not return jwt you have to login with this new username and password.
        <form onSubmit={register}>
            <label htmlFor="usr">Username</label>
            <input type="text" id="usr" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
            <label htmlFor="pswd">Password</label>
            <input type="password" id="pswd" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button type="submit"/>
        </form>

    </div>
  )
}

export default Register