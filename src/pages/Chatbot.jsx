import React, { useRef, useState, useEffect } from 'react';
import ChatbotIcon from '../components/ChatbotIcon';
import ChatForm from '../components/ChatForm';
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
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
    };

    history = history.map(({ role, text }) => ({
      role: role === "model" ? "assistant" : "user",
      content: text,
    }));
  
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_API_URL}`,
      },
      body: JSON.stringify({
        model: "ministral-3b-latest",
        messages: history,
        max_tokens: 150,
      }),
    };
  
    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", requestOption);
      if (!response.ok) {
        throw new Error("Erreur dans la réponse de l'API Mistral");
      }
      const data = await response.json();
      const apiResponseText = data.choices[0].message.content.trim();
  
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error.message);
    }
  };  

  useEffect(() => {
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory]);

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
  );
}

export default Chatbot;