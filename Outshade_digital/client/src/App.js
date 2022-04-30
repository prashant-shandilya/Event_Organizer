import './App.css';
import {useState} from 'react';
import User from './Components/User'
import Event from './Components/Event'

function App() {
  let [jwt,setJwt] = useState();

  return (
    <>
    // Event component deals with creation,invitation,updation,listing,details;
    <Event jwt={jwt}/>
    // User component deals with Register,Login and update password
    <User jwt={jwt} setJwt={setJwt}/>
    </>
  );
}

export default App;
