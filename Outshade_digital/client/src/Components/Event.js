import React from 'react'
import {useState} from 'react';
import Invitation from './Invitation'
import Create from './Create'
import List from './List'
import Details from './Details';
import Update_ev from './Update_ev';

function Event({jwt}) {
  let [indx,setIndx] = useState(0);



  function display(indx){
    if(indx==0){
      <Invitation jwt={jwt}/>
    }
    else if(indx==1){
      <Create jwt={jwt}/>
    }
    else if(indx==2){
      <List jwt={jwt}/>
    }
    else if(indx==3){
      <Details jwt={jwt}/>
    }
    else{
      <Update_ev jwt={jwt}/>
    }
  }

  return (
    <>
    // Buttons for navigation on the Event options.
    <div>
      <button onClick={()=>{setIndx(0)}}>INVITATIONS</button>
      <button onClick={()=>{setIndx(1)}}>CREATE</button>
      <button onClick={()=>{setIndx(2)}}>LIST</button>
      <button onClick={()=>{setIndx(3)}}>DETAILS</button>
      <button onClick={()=>{setIndx(4)}}>UPDATE</button>
    </div>
    {display(indx)}

    </>
  )
}

export default Event