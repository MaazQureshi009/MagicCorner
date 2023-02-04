import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';

import NavBar from './navbar';
import SideBar from './SideBar';
import './chat.css';

function Chat(){
    const Location = useLocation();
    const [ Message , setMessage ] = useState("");
    const [ Conversations , setConversations ] = useState([]);

    const AddQuery = () => {
        Axios.put("http://localhost:3001/addQuery" , { question : Message , user : Location.state.id }).then(()=>{
            Axios.put("http://localhost:3001/getQuery" , { id : Location.state.id }).then((response)=>{
                setConversations(response.data);
                setMessage("");
            })
        })
    }

    useEffect(()=>{
        Axios.put("http://localhost:3001/getQuery" , { id : Location.state.id }).then((response)=>{
            setConversations(response.data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    return(
        <>
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <div className='container py-0 space'>
                <div className='chat-space'>
                    {
                        Conversations.map( (value)=>{
                            return (
                                <>
                                    <p className='sent-message'>{value.question}</p>
                                    {
                                        (value.answer === "" || value.answer === undefined || value.answer === null)?<></>
                                        :<p className='received-message'>{value.answer}</p>
                                    }
                                </>
                            );
                        } )
                    }
                    <div className='clear'></div>
                </div>
                <div className='container default-space'>
                    <div className='default-chats row'>
                        <div className='default-chat-sub-space'>
                            <button className='default-chat' onClick={()=>{setMessage("Where can I track my order?")}}>
                                Where can I track my order?
                            </button>
                        </div>
                        <div className='default-chat-sub-space'>
                            <button className='default-chat' onClick={()=>{setMessage("Is Debit Card accepted at cash on delivery?")}}>
                                Is Debit Card accepted at cash on delivery?
                            </button>
                        </div>
                        <div className='default-chat-sub-space'>
                            <button className='default-chat' onClick={()=>{setMessage(" Is Credit Card accepted at cash on delivery?")}}>
                                Is Credit Card accepted at cash on delivery?
                            </button>
                        </div>
                        <div className='default-chat-sub-space'>
                            <button className='default-chat' onClick={()=>{setMessage("Is UPI accepted at cash on delivery?")}}>
                                Is UPI accepted at cash on delivery?
                            </button>
                        </div>
                        <div className='default-chat-sub-space'>
                            <button className='default-chat' onClick={()=>{setMessage("Is the product returnable?")}}>
                                Is the product returnable?
                            </button>
                        </div>
                        <div className='default-chat-sub-space'>
                            <button className='default-chat' onClick={()=>{setMessage("What happens when i'm not able to take the delivery?")}}>
                                What happens when i'm not able to take the delivery?
                            </button>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className='container type-space'>
                    <input type="text" className='message-type-input' onChange={(e)=>{setMessage(e.target.value)}} placeholder='Message...' defaultValue={Message} />
                    <button className='send-button' onClick={()=>{AddQuery();setMessage("")}}><i class="fa-solid fa-paper-plane"></i></button>
                </div>
                <div className='clear'></div>
            </div>
        </>
    );
}

export default Chat;