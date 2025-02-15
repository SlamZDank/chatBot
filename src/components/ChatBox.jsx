import React, { useEffect, useState } from 'react'
import Bullet from './Bullet';
import chatGPTApi from '../utils/Chat';
import Plane from '/paper-plane-solid.svg'
import '../styles/chatbox.css'
import Loader from './Loader';

const ChatBox = () => {
  const [input, setInput] = useState('')
  const [title, setTitle] = useState("Nouri's ChatBot");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([{ role: "bot", content: "Hello, how can I assist you today?" }])
  }, []) // this use effect runs when the component is mounted, being inserted into the DOM for the first time 

  useEffect(() => {
    document.title = title // change the title of the document
  }, [title]) // runs when the component is first mounted, and also when there is a change in the state of title

  useEffect(() => {
    const chatDomItem = document.querySelector('.chat-box');
    chatDomItem.scrollTop = chatDomItem.scrollHeight;
  }, [messages]) // set the scroll bar to be at the bottom when a message has been sent 


  const handleMessage = async () => {
    setLoading(true);
    setTitle(input);
    setMessages(prev => {
      return [...prev, { role: "user", content: input }]
    })
    let response = await chatGPTApi(input);
    setInput('');
    setMessages(prev => {
      return ([...prev, { role: "bot", content: response.result ?? response.message }])
    })
    setLoading(false);
  }

  return (
    <>
      <div className='container'>
        <h1>ChatBot</h1>
        <div className='chat-box'>
          {
            messages.map((message, index) => {
              return <Bullet key={index} role={message.role} content={message.content} />
            })
          }
          {loading && <Loader /> /* this is the shortcut syntax that cuts off if loading is false because why try setting up the loader when the loading is already false!? */}
        </div>
        <div className='input'>
          <input
            type='text'
            placeholder='Type here...'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button onClick={handleMessage} disabled={loading} className='btn'>
            {!loading && <div className='btn-icon'>
              <img src={Plane} height={22} />
            </div>}
            <p>{loading ? " Wait..." : " Send"}</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatBox
