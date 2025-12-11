// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, Paperclip, Search, MoreVertical, Users, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

const conversations = [
  { id: 1, name: "Kouassi Amara", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara", lastMessage: "Parfait, je commence demain !", time: "10:30", unread: 0, online: true },
  { id: 2, name: "Adjoua Koffi", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adjoua", lastMessage: "Pouvez-vous m'envoyer les maquettes ?", time: "09:15", unread: 2, online: true },
  { id: 3, name: "Yao Christophe", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yao", lastMessage: "D'accord, je vous envoie le devis", time: "Hier", unread: 0, online: false },
];

export function ClientMessagingView({ onNavigate }) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "other", text: "Bonjour ! J'ai vu votre mission, elle m'intéresse beaucoup.", time: "10:00" },
    { id: 2, sender: "me", text: "Super ! Pouvez-vous me parler de votre expérience ?", time: "10:15" },
    { id: 3, sender: "other", text: "Bien sûr ! J'ai 5 ans d'expérience en développement React et Node.js.", time: "10:25" },
    { id: 4, sender: "me", text: "Parfait ! Je vous envoie les détails complémentaires.", time: "10:28" },
    { id: 5, sender: "other", text: "Excellent, j'attends vos informations avec impatience !", time: "10:30" },
  ]);

  const [showContacts, setShowContacts] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConversation]);

  const handleSend = () => {
    if (message.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "me",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setMessage("");
    }
  };

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    setShowContacts(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header principal - FIXE */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => onNavigate("catalog")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour</span>
            </Button>
            <h1 className="text-lg font-semibold ml-2">Messagerie</h1>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setShowContacts(!showContacts)}
          >
            {showContacts ? <X className="w-5 h-5" /> : <Users className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Container principal avec hauteur fixe */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Overlay pour mobile */}
        {showContacts && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowContacts(false)}
          />
        )}

        {/* Liste des conversations */}
        <div className={`
          w-full md:w-96 bg-white border-r border-gray-200 flex flex-col
          fixed md:relative z-50 h-full transition-transform duration-300
          ${showContacts ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Barre de recherche - FIXE */}
          <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Rechercher une conversation..." 
                className="pl-9 rounded-lg bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-green-500"
              />
            </div>
          </div>

          {/* Liste des conversations - SCROLLABLE SEULEMENT */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex flex-col">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`p-3 cursor-pointer transition-all duration-200 border-b border-gray-100 ${
                      selectedConversation.id === conv.id
                        ? "bg-green-50 border-l-4 border-l-green-500"
                        : "hover:bg-gray-50 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conv.photo} alt={conv.name} />
                          <AvatarFallback className="bg-gray-200">
                            {conv.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold truncate text-gray-900">{conv.name}</h4>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <div className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center ml-2 font-medium">
                              {conv.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Zone de discussion principale */}
        <div className="flex-1 flex flex-col bg-gray-100 min-w-0">
          {selectedConversation ? (
            <>
              {/* Header du chat - FIXE */}
              <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedConversation.photo} alt={selectedConversation.name} />
                      <AvatarFallback className="bg-gray-200">
                        {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.online ? "En ligne" : "Hors ligne"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages - SCROLLABLE SEULEMENT */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-3">
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 8 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.2 }} 
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="max-w-[70%]">
                          <div className={`rounded-2xl px-4 py-2 text-sm ${
                            msg.sender === "me" 
                              ? "bg-green-500 text-white rounded-br-none" 
                              : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
                          }`}>
                            {msg.text}
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-2">
                            {msg.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Barre d'envoi - FIXE */}
              <div className="p-4 border-t border-gray-200 bg-white sticky top-0 bottom-0 left-0 right-0">
                <div className="flex gap-2 items-center max-w-4xl mx-auto">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full hover:bg-gray-100 border-gray-300 text-gray-600 flex-shrink-0"
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input 
                    placeholder="Tapez votre message..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyDown={(e) => e.key === "Enter" && handleSend()} 
                    className="rounded-full bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-green-500 flex-1 min-w-0"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSend} 
                    disabled={!message.trim()}
                    className="rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Sélectionnez une conversation</p>
                <p className="text-sm">Choisissez une conversation pour commencer à discuter</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}