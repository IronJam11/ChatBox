import { useEffect, useState } from "react"
import {addDoc, collection, onSnapshot, serverTimestamp, query,where, orderBy} from "firebase/firestore"
import { db , auth } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
    const {room} = props
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([])
    useEffect(() =>
    {
        const queryMessages = query(messagesRef, where("room","==", room), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapshot)=> {
            let messages = []
            snapshot.forEach((doc)=>
            {
                messages.push({...doc.data(), id: doc.id})

            });
            setMessages(messages);

        });
        return  ()=> unsubscribe();
    },[])
    const handleSubmit =async(e)=>
    {
        e.preventDefault();
        if(newMessage==="") return;
        await addDoc(messagesRef, {
            text:newMessage || null , 
            createdAt: serverTimestamp()  ,
            user: auth.currentUser.displayName || null ,
            room:room || null ,
        })
        setNewMessage("")
        
    }
    return (<div className="chat-app">
    <div className="header">
      <h1>Welcome to: {room.toUpperCase()}</h1>
    </div>
    <div className="messages">
      {messages.map((message) => (
        <div key={message.id} className="message">
          <span className="user">{message.user}:</span> {message.text}
        </div>
      ))}
    </div>
    <form onSubmit={handleSubmit} className="new-message-form">
      <input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        className="new-message-input"
        placeholder="Type your message here..."
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  </div>
);
};
