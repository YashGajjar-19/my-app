import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, Phone, Video, Info, Smile, Paperclip, ArrowLeft, Users, X } from 'lucide-react';

const ChatInterface = ({ currentUser, members, onBack }) => {
    // State
    const [activeChat, setActiveChat] = useState('group'); // 'group' or member.id
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to Bakchodi Intl. HQ!", senderId: 'system', receiverId: 'group', timestamp: new Date(Date.now() - 1000000).toISOString() },
        { id: 2, text: "Remember rule #1: Bakchodi is mandatory.", senderId: 1, receiverId: 'group', timestamp: new Date(Date.now() - 500000).toISOString() },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Scroll to bottom on new message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeChat]);

    // Derived Data
    const contactList = members.filter(m => m.id !== currentUser.id);
    const activeMember = activeChat === 'group' ? null : members.find(m => m.id === activeChat);
    
    const currentMessages = messages.filter(msg => {
        if (activeChat === 'group') {
            return msg.receiverId === 'group';
        } else {
            return (msg.senderId === currentUser.id && msg.receiverId === activeChat) || 
                   (msg.senderId === activeChat && msg.receiverId === currentUser.id);
        }
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            text: newMessage,
            senderId: currentUser.id,
            receiverId: activeChat,
            timestamp: new Date().toISOString()
        };

        setMessages([...messages, msg]);
        setNewMessage("");
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-50 flex flex-col md:flex-row h-screen font-sans">
            {/* Sidebar (Contacts) */}
            <div className={`w-full md:w-80 bg-white border-r border-slate-200 flex flex-col ${activeChat && 'hidden md:flex'}`}>
                {/* Sidebar Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full md:hidden">
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-xl font-bold font-display text-slate-900">Messages</h2>
                    </div>
                    
                    {/* Desktop Close Button */}
                    <button onClick={onBack} className="hidden md:flex p-2 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors" title="Close Chat">
                        <X size={18} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 py-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search crew..." 
                            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
                    {/* Group Chat Item */}
                    <div 
                        onClick={() => setActiveChat('group')}
                        className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${activeChat === 'group' ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm shrink-0">
                            HQ
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h3 className={`font-bold text-sm truncate ${activeChat === 'group' ? 'text-indigo-900' : 'text-slate-900'}`}>General</h3>
                                <span className="text-[10px] text-slate-400 font-medium">9:41 AM</span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                                Yash: Remember rule #1...
                            </p>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 my-2 mx-4"></div>

                    {/* Direct Messages */}
                    {contactList.map(member => (
                        <div 
                            key={member.id}
                            onClick={() => setActiveChat(member.id)}
                            className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${activeChat === member.id ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
                        >
                            <div className="relative shrink-0">
                                <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className={`font-bold text-sm truncate ${activeChat === member.id ? 'text-indigo-900' : 'text-slate-900'}`}>{member.name}</h3>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-slate-50/50 relative overflow-hidden ${!activeChat && 'hidden md:flex'}`}>
                {!activeChat ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Users size={32} />
                        </div>
                        <p className="font-medium">Select a conversation to start chatting</p>
                    </div>
                ) : (
                    <>
                         {/* Chat Header */}
                        <div className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setActiveChat(null)} className="md:hidden p-2 -ml-2 text-slate-500">
                                    <ArrowLeft size={20} />
                                </button>
                                {activeChat === 'group' ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                                            HQ
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">General Channel</h3>
                                            <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                {members.length} online
                                            </p>
                                        </div>
                                    </div>
                                ) : activeMember && (
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={activeMember.image} alt={activeMember.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{activeMember.name}</h3>
                                            <p className="text-xs text-slate-500 font-medium">{activeMember.role}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-1 text-slate-400">
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Phone size={18} /></button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Video size={18} /></button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Info size={18} /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {currentMessages.map((msg) => {
                                const isMe = msg.senderId === currentUser.id;
                                const sender = members.find(m => m.id === msg.senderId);
                                const isSystem = msg.senderId === 'system';

                                if (isSystem) {
                                    return (
                                        <div key={msg.id} className="flex justify-center my-6">
                                            <span className="bg-slate-200/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                                {msg.text}
                                            </span>
                                        </div>
                                    );
                                }

                                return (
                                    <motion.div 
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {!isMe && (
                                            <img src={sender?.image} alt={sender?.name} className="w-8 h-8 rounded-full object-cover shadow-sm self-end mb-1" />
                                        )}
                                        <div className={`max-w-[70%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'}`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-slate-300 font-medium px-1">
                                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0 z-20">
                            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center gap-2">
                                <button type="button" className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                                    <Paperclip size={20} />
                                </button>
                                <div className="flex-1 relative">
                                    <input 
                                        type="text" 
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..." 
                                        className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white border border-transparent focus:border-indigo-100 transition-all font-medium text-sm"
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-500">
                                        <Smile size={18} />
                                    </button>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={!newMessage.trim()}
                                    className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all flex items-center justify-center transform"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatInterface;
