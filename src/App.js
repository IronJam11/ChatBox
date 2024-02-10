import React, {useState, useRef} from'react';
import './App.css';
import Auth from "./components/Auth"
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom ] = useState("")
  const roomInputRef = useRef(null);
  const signUserOut = async () => 
  {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
 
  }
  if(!isAuth)
  {
  return (

    <div className="App">
    
    <Auth setIsAuth={setIsAuth}/>
    
    </div>
  
  );
}
  return <div className='room'> {room ? <div> <Chat room={room}/> </div>: <div> 
     <label> Join a room  </label>
     <input ref ={roomInputRef}/>
     <button onClick={() => setRoom(roomInputRef.current.value)}> Enter Chat </button>

     <div className='sign-out'>  <button onClick={signUserOut}>Sign Out </button></div> 

  </div>}</div>
  

}

export default App;
