import { useState, useRef, useEffect} from 'react'
import { Chatbot } from 'supersimpledev';
import './App.css'
import Image from './assets/solo.png';


function ChatInput({chatMessages,setChatMessages}) {
  const [inputText,setInputText] = useState('');
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {  
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender:'user',
        id : crypto.randomUUID()
      }
    ]

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender:'robot',
        id : crypto.randomUUID()
      }
    ]);

    setInputText('')
  }

  return (
    <div className="chat-input-container">
      <input className="chat-input"
        placeholder="Send a message to Chat Bot" 
        size="30" 
        onChange={saveInputText}
        value={inputText} />
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
}

 
function ChatMessage({message,sender}) {
  return (
    <div className={sender ==='user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === 'robot' && <img src={Image} className="chat-message-profile" />}
      <div className="chat-message-text">
        {message}
      </div>
      
      {sender === 'user' && <img src={Image} className="chat-message-profile" />}
    </div>
  );
}


function ChatMessages({chatMessages}) {
  const chatMessagesRef = useRef(null);
   
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  },[chatMessages]);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
      return (
        <ChatMessage
          message = {chatMessage.message}
          sender = {chatMessage.sender}
          key={chatMessage.id}
            />
          )
        })}
    </div>
  )
}


function App() {
  const [chatMessages , setChatMessages] = useState([{
    message:"Hello chatbot" ,
    sender:'user',
    id:'id1'
    },
    {
      message:'Hello! How can i help you?',
      sender:'robot',
      id:'id2'
    },
    {
      message:'Can you get me todays date? ',
      sender:'user',
      id:'id3'
    },
    {
      message:'Today is November 3',
      sender:'robot',
      id:'id4'
  }]);
  return (
    <div className="app-container">
    
    <ChatMessages
      chatMessages={chatMessages}
    />
    <ChatInput
      chatMessages = {chatMessages}
      setChatMessages = {setChatMessages}
    />
    </div>
  );
}

export default App
