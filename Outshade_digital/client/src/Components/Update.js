import React from 'react'
import {useState} from 'react';

function Update() {
    let[username,setUsername] = useState();
    let[password,setPassword] = useState();

   async function update(){
     const data = {username,password};
     let st = await fetch('http://localhost:5005/user/update',{method:"POST",body:JSON.stringify(data)}).then(res=>res.json());
     console.log(st);
     //Display the error message if any and if it is success call the logout function if the pswrd change is success.
   }
  return (
    <div>
    <form onSubmit={update}>
        <label htmlFor="usr">Username</label>
        <input type="text" id="usr" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
        <label htmlFor="pswd">Password</label>
        <input type="password" id="pswd" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button type="submit"/>
    </form>

</div>
  )
}

export default Update