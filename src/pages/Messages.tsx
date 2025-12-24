import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft, Search, Store, MoreVertical, Phone, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import { 
  mockContacts, 
  mockConversations, 
  getLastMessage, 
  formatMessageTime,
  type ChatContact,
  type ChatMessage 
} from "@/data/mockMessages";

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState(mockConversations);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getConversation = (contactId: string) => {
    return conversations.find(c => c.contactId === contactId);
  };

  const getUnreadCount = (contactId: string) => {
    const conversation = getConversation(contactId);
    if (!conversation) return 0;
    return conversation.messages.filter(msg => 
      msg.senderId !== "current-user" && !msg.isRead
    ).length;
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      content: messageInput,
      timestamp: new Date().toISOString(),
      isRead: true,
      type: "text"
    };

    setConversations(prev => {
      const existingConv = prev.find(c => c.contactId === selectedContact.id);
      if (existingConv) {
        return prev.map(c => 
          c.contactId === selectedContact.id 
            ? { ...c, messages: [...c.messages, newMessage] }
            : c
        );
      } else {
        return [...prev, { contactId: selectedContact.id, messages: [newMessage] }];
      }
    });

    setMessageInput("");
  };

  const handleSelectContact = (contact: ChatContact) => {
    setSelectedContact(contact);
    // Mark messages as read
    setConversations(prev => 
      prev.map(c => 
        c.contactId === contact.id 
          ? { ...c, messages: c.messages.map(msg => ({ ...msg, isRead: true })) }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Card className="h-[calc(100vh-140px)] flex overflow-hidden">
          {/* Contacts Sidebar */}
          <div className={`w-full md:w-80 border-r flex flex-col ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
            {/* Sidebar Header */}
            <div className="p-4 border-b space-y-3">
              <h2 className="text-xl font-bold">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Contacts List */}
            <ScrollArea className="flex-1">
              {filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations found
                </div>
              ) : (
                filteredContacts.map((contact) => {
                  const lastMessage = getLastMessage(contact.id);
                  const unreadCount = getUnreadCount(contact.id);
                  
                  return (
                    <div
                      key={contact.id}
                      onClick={() => handleSelectContact(contact)}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedContact?.id === contact.id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold truncate">{contact.name}</span>
                              {contact.isSeller && (
                                <Store className="h-3 w-3 text-primary" />
                              )}
                            </div>
                            {lastMessage && (
                              <span className="text-xs text-muted-foreground">
                                {formatMessageTime(lastMessage.timestamp)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                              {lastMessage 
                                ? (lastMessage.senderId === "current-user" ? "You: " : "") + lastMessage.content
                                : "No messages yet"
                              }
                            </p>
                            {unreadCount > 0 && (
                              <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedContact ? 'hidden md:flex' : 'flex'}`}>
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="md:hidden"
                      onClick={() => setSelectedContact(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                        <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedContact.isOnline && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{selectedContact.name}</h3>
                        {selectedContact.isSeller && (
                          <Badge variant="secondary" className="text-xs">
                            <Store className="h-3 w-3 mr-1" />
                            Seller
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedContact.isOnline ? "Online" : `Last seen ${selectedContact.lastSeen}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {getConversation(selectedContact.id)?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                            message.senderId === "current-user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-[10px] mt-1 ${
                            message.senderId === "current-user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          }`}>
                            {formatMessageTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon"
                      disabled={!messageInput.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Send className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Your Messages</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Select a conversation to start chatting with buyers and sellers
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Messages;
