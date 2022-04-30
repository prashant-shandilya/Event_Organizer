import React from 'react'
import {useState} from 'react';
function List({jwt}) {

    let [num,setNum] = useState(0);
    let [srch,setSrch] = useState("");
    let [eve,setEve] = useState("");
   async function paginate(){
        const data = {token:jwt}
        let eve  = await fetch(`http://localhost:5005/events/list/pagination/${num}`,{method:"POST",body:JSON.stringify(data)}).then(res=>res.json());  
    }
  async function sort(){
       const data = {token:jwt};
       let eve = await fetch('http://localhost:5005/events/list/sort',{method:"POST",body:JSON.stringify(data)}).then(res=>res.json());
   }
  async function dsort(){
       const data = {token:jwt};
       let eve = await fetch('http://localhost:5005/events/list/date',{method:"POST",body:JSON.stringify(data)}).then(res=>res.json());
   }
   async function search(){
       const data = {token:jwt};
       let eve = await fetch(`http://localhost:5005/events/list/${srch}`,{method:"POST",body:JSON.stringify(data)}).then(res=>res.json());
   }
  return (
    <>
        // Different options which provide methods to sort according to the name,date pagination search box etc.
        // API's are built to fetch the respective events.
       {jwt&&<div>
            <label htmlFor="num">Pagination : </label>
            <input type="number" id="num" value={num} onChange={(e)=>{setNum(e.target.value)}}/>
            <button onClick={paginate}>Pagination</button>

            <button onClick={sort}>SORT</button>
            <button onClick={dsort}>Date Sort</button>

            <label htmlFor="s_box">Search Name</label>
            <input type="text" id="s_box" value={srch} onChange={(e)=>{setSrch(e.target.value)}}/>
            <button onClick={search}>GO</button>
        </div>}

        {jwt&&eve.map((item,index)=>{
            return <div key={index}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <h3>{item.creator}</h3>
            </div>
        })}
    </>
  )
}

export default List