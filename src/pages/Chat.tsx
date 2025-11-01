import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Image as ImageIcon, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI shopping assistant. Describe what you're looking for, and I'll help you find the perfect match. You can also upload an image of something you like!"
    }
  ]);
  const [input, setInput] = useState("");
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I found several great options for you! Based on your description, here are some products that might interest you. Would you like to see more details or compare prices?"
      }]);
    }, 1000);
  };
  
  const suggestions = [
    "Show me minimalist home decor",
    "I need a gift for a tech enthusiast",
    "Find eco-friendly kitchen items",
    "Compare wireless headphones"
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              AI Chat Search
            </h1>
            <p className="text-muted-foreground">
              Describe what you're looking for in natural language
            </p>
          </div>
          
          {/* Chat Messages */}
          <Card className="p-6 min-h-[500px] max-h-[600px] overflow-y-auto space-y-4 bg-[image:var(--gradient-card)]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-primary">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </Card>
          
          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="space-y-3 animate-fade-in-up">
              <p className="text-sm text-muted-foreground text-center">Try asking:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto py-3 hover:border-primary"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Area */}
          <Card className="p-4">
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="shrink-0">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Describe what you're looking for..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" size="sm" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Show Similar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              Compare Prices
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              Save to Wishlist
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
