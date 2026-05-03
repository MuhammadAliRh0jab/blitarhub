import React, { useState, useEffect, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import axios from 'axios';

export default function ChatWidget() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [unreadTotal, setUnreadTotal] = useState(0);
    const [activeTab, setActiveTab] = useState('focused'); // 'focused', 'other'
    const [searchQuery, setSearchQuery] = useState('');
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (auth?.user) {
            fetchConversations();
        }
    }, [auth?.user]);

    useEffect(() => {
        if (isOpen && auth?.user) {
            fetchConversations();
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation.id);
            markAsRead(selectedConversation.id);
        }
    }, [selectedConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Real-time listener
    useEffect(() => {
        if (auth?.user) {
            const channel = window.Echo.private(`App.Models.User.${auth.user.id}`);
            channel.listen('.MessageSent', (e) => {
                // Update conversations list globally to reflect unread count
                fetchConversations();
                
                setSelectedConversation(currentSelected => {
                    // If the message belongs to current open chat
                    if (currentSelected && e.message.conversation_id === currentSelected.id) {
                        setMessages(prev => [...prev, e.message]);
                        markAsRead(currentSelected.id);
                    }
                    return currentSelected;
                });
            });

            return () => {
                window.Echo.leave(`App.Models.User.${auth.user.id}`);
            };
        }
    }, [auth?.user]);

    // Handle external open-chat events
    useEffect(() => {
        const handleOpenChat = (e) => {
            const conversation = e.detail;
            setIsOpen(true);
            setSelectedConversation(conversation);
        };

        window.addEventListener('open-chat', handleOpenChat);
        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    const fetchConversations = async () => {
        try {
            const res = await axios.get('/api/conversations');
            setConversations(res.data);
            const total = res.data.reduce((acc, conv) => acc + (conv.unread_count || 0), 0);
            setUnreadTotal(total);
        } catch (err) {
            console.error('Failed to fetch conversations', err);
        }
    };

    const fetchMessages = async (id) => {
        try {
            const res = await axios.get(`/api/conversations/${id}/messages`);
            setMessages(res.data);
        } catch (err) {
            console.error('Failed to fetch messages', err);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.post(`/api/conversations/${id}/read`);
            fetchConversations();
        } catch (err) {
            console.error('Failed to mark as read', err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        try {
            const res = await axios.post(`/api/conversations/${selectedConversation.id}/messages`, {
                body: newMessage
            });
            setMessages(prev => [...prev, res.data]);
            setNewMessage('');
            fetchConversations();
        } catch (err) {
            console.error('Failed to send message', err);
        }
    };

    const filteredConversations = conversations.filter(conv => {
        const hasMessages = conv.messages && conv.messages.length > 0;
        const isCurrentlySelected = selectedConversation && selectedConversation.id === conv.id;
        
        // Show if it has messages OR if it's the one we just opened via "Mulai Chat"
        if (!hasMessages && !isCurrentlySelected) return false;
        
        const otherUser = conv.users?.find(u => u.id !== auth.user?.id);
        if (!otherUser) return false;
        return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="fixed bottom-0 right-8 z-50 flex flex-col items-end pointer-events-none">
            
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[340px] h-[520px] bg-white border border-gray-200 rounded-t-xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-bottom duration-300">
                    
                    {/* Header */}
                    <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <img src={auth.user?.avatar_url || `https://ui-avatars.com/api/?name=${auth.user?.name}`} className="w-8 h-8 rounded-full border border-gray-100" />
                            </div>
                            <span className="font-bold text-[15px] text-gray-800">Messaging</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500">
                            <button onClick={() => setIsOpen(false)} className="hover:bg-gray-100 p-1 rounded-full transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                            </button>
                        </div>
                    </div>

                    {selectedConversation ? (
                        /* Individual Chat View */
                        <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
                            <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                                <button onClick={() => setSelectedConversation(null)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <span className="font-bold text-sm text-gray-800">
                                    {selectedConversation.users?.find(u => u.id !== auth.user?.id)?.name || 'User'}
                                </span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, i) => (
                                    <div key={msg.id} className={`flex ${msg.user_id === auth.user?.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                                            msg.user_id === auth.user?.id 
                                            ? 'bg-orange-600 text-white rounded-tr-none' 
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                        }`}>
                                            <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.body}</p>
                                            <div className={`text-[10px] mt-1 opacity-70 ${msg.user_id === auth.user?.id ? 'text-white text-right' : 'text-gray-400'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100">
                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-2xl border border-gray-200 focus-within:border-orange-300 transition">
                                    <input 
                                        type="text" 
                                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-1"
                                        placeholder="Tulis pesan..."
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                    />
                                    <button type="submit" className="text-orange-600 hover:scale-110 transition disabled:opacity-50" disabled={!newMessage.trim()}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* Conversation List View */
                        <div className="flex-1 flex flex-col min-h-0">
                            
                            {/* Search Bar */}
                            <div className="p-3">
                                <div className="flex items-center gap-2 bg-[#EEF3F8] px-3 py-1.5 rounded-md border border-transparent focus-within:bg-white focus-within:border-gray-300 transition">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search messages" 
                                        className="bg-transparent border-none focus:ring-0 text-[13px] w-full p-0 h-6"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Conversations List */}
                            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                                {filteredConversations.length > 0 ? filteredConversations.map(conv => {
                                    const otherUser = conv.users?.find(u => u.id !== auth.user?.id);
                                    if (!otherUser) return null;
                                    const lastMsg = conv.messages && conv.messages.length > 0 ? conv.messages[0] : null;
                                    
                                    return (
                                        <button 
                                            key={conv.id}
                                            onClick={() => setSelectedConversation(conv)}
                                            className="w-full px-3 py-3 flex items-start gap-3 hover:bg-[#F3F6F8] transition text-left group"
                                        >
                                            <div className="relative shrink-0">
                                                <img src={otherUser.avatar_url || `https://ui-avatars.com/api/?name=${otherUser.name}`} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <h4 className="font-bold text-[14px] text-gray-900 truncate group-hover:text-orange-700">{otherUser.name}</h4>
                                                    <span className="text-[11px] text-gray-500 whitespace-nowrap ml-2">
                                                        {lastMsg ? new Date(lastMsg.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : ''}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center gap-2">
                                                    <p className={`text-[13px] truncate ${conv.unread_count > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                                        {lastMsg ? lastMsg.body : 'Mulai chat baru...'}
                                                    </p>
                                                    {conv.unread_count > 0 && (
                                                        <div className="w-5 h-5 bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shrink-0">
                                                            {conv.unread_count}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                }) : (
                                    <div className="p-8 text-center text-gray-400">
                                        <p className="text-sm">Tidak ada obrolan.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Bottom Floating Bar */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-[340px] px-3 py-2 bg-white border border-gray-200 rounded-t-xl shadow-lg flex items-center justify-between hover:bg-gray-50 transition pointer-events-auto"
            >
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <img src={auth.user?.avatar_url || `https://ui-avatars.com/api/?name=${auth.user?.name}`} className="w-8 h-8 rounded-full border border-gray-100" />
                    </div>
                    <span className="font-bold text-[14px] text-gray-800">Messaging</span>
                </div>
                <div className="flex items-center gap-2">
                    {unreadTotal > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                            {unreadTotal}
                        </span>
                    )}
                    <div className="flex items-center gap-2 text-gray-500">
                        <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </button>
        </div>
    );
}
