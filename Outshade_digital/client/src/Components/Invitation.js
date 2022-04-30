import React from 'react'
import {useEffect,useState} from 'react'
function Invitation({jwt}) {
    let [eve,setEve] = useState();

    useEffect(async ()=>{
        let data = {token:jwt}
       let eve = await fetch('http://localhost:5005/events/invites',{method:"POST",body:JSON.stringify(data)}).then(res=>{res.json()})
    //    console.log(eve);
        
    setEve(eve);
        
    },[jwt])
    
  return (
    <>
    <div>
        {jwt?<p></p>:<p>Please sign in. </p>}

    //Checks for JWT if present then lists the events that are fetched from the /events/invites endpoints which are specific for a user

        {jwt&&eve.map((item,index)=>{
            return <div key={index}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <h3>{item.creator}</h3>
            </div>
        })}



    </div>
    </>
  )
}

export default Invitation