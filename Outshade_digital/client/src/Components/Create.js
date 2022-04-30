import React from 'react'
import {useState} from 'react';

function Create({jwt}) {

    let [users,setUsers] = useState("");
    let [name,setName] = useState("");
    let [date,setDate] = useState("");
    let [description,setDescription] = useState("");

    async function create(){
            let go = users.split(' ');
            setUsers(go);
            const data = {name,description,date,users,token:jwt};
            let now = await fetch('http://localhost:5005/events/create',{method:"POST",body:JSON.stringify(data)}).then(res=>res.json())  
            console.log(now);
        }


    return (
    <>
            {jwt?<p></p>:<p>Please sign in. </p>}

        {jwt&&<div>
            <form onSubmit={create}>
                <label htmlFor="name">NAME : </label>
                <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <label htmlFor="descr">DESCRIPTION : </label>
                <input type="text" id="descr" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                <label htmlFor="date">DATE</label>
                <input type="date" id="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                <label htmlFor="users">Invitd</label>
                <input type="text" id="users" value={users} onChange={(e)=>{setUsers(e.target.value)}}/>
            </form>
        </div>}
    </>
  )
}

export default Create