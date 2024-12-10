import React, { useRef, useState, useEffect } from 'react'
import ChatbotIcon from '../components/ChatbotIcon'
import ChatForm from '../components/ChatForm'
import ChatMessage from '../components/ChatMessage';
import { MdKeyboardArrowDown } from "react-icons/md";
import { companyInfo } from '../CompanyInfo';
import { Link } from 'react-router-dom';

function Chatbot() {
  
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo
    }
  ]);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {

    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role : "model", text}])
    }

    history = history.map(({role, text}) => ({role, parts: [{ text }] }));

    const requestOption = {
      method : "POST",
      headers : { "Content-Type" : "application/json"},
      body : JSON.stringify({ contents : history }),
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOption);
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }
      
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      
      updateHistory(apiResponseText);

    } catch (error) {
      console.log(error.message);
      alert("Nous utilisons une API externe. Si l'envoie de réponse devient un peu plus long, sachez que nous avons déjà atteint notre limite d'utilisation gratuite du service externe. Il s'agit juste d'un test. Merci pour votre fidélité 👏");
    }
  }

  useEffect(() => {
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"})
  },[chatHistory])

  return (
    
    <div className='container'>
        <div className="chat-popup">
          <div className="chat-header">
            <div className='header-info'>
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>
            <Link to="/" className='button'><MdKeyboardArrowDown /></Link>
          </div>

          <div ref={chatBodyRef} className="chatbot-body">

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chatbot-footer">
           <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
    </div>
  )
}

export default Chatbot