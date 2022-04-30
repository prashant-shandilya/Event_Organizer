import React from 'react'
import {useState} from 'react';
import Register from './Register'
import Login from './Login'
import Update from './Update'

function User({jwt,setJwt}) {
  let [indx,setIndx] = useState(0);

 function logout(){
   setJwt("");
 }

  function display(indx){
    if(indx==0){
      <Register/>
    }
    else if(indx==1){
      <Login setJwt={setJwt}/>
    }
    else if(indx==2){
      <Update jwt={jwt} logout={logout}/>
    }
    else{
      logout();
    }
  }

  return (
    <>
      <div style={{display:"inline-block",border:"2px solid green",margin:"40px"}}>
        <button onClick={()=>{setIndx(0)}}>REGISTER</button>
        <button onClick={()=>{setIndx(1)}}>LOGIN</button>
        <button onClick={()=>{setIndx(2)}}>UPDATE</button>
        <button onClick={()=>{setIndx(3)}}>LOGOUT</button>
      </div>
      {display(indx)}
    
    </>
  )
}

export default User