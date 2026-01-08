import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Image as ImageIcon, ShoppingBag, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockProducts } from "@/data/mockProducts";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
  products?: typeof mockProducts;
}

const aiResponses = [
  {
    keywords: ["minimalist", "minimal", "simple", "clean"],
    response: "I found some beautiful minimalist pieces for you! These items feature clean lines and simple designs that would complement any modern space.",
    showProducts: true,
    productFilter: (p: typeof mockProducts[0]) => p.category === "Home" || p.category === "Electronics"
  },
  {
    keywords: ["gift", "present", "birthday", "tech", "gadget"],
    response: "Great choice! Here are some popular tech gifts that are sure to impress. These items are highly rated and perfect for tech enthusiasts.",
    showProducts: true,
    productFilter: (p: typeof mockProducts[0]) => p.category === "Electronics"
  },
  {
    keywords: ["eco", "sustainable", "green", "environment", "kitchen"],
    response: "I love that you're thinking sustainably! Here are some eco-friendly kitchen items that are both functional and environmentally conscious.",
    showProducts: true,
    productFilter: (p: typeof mockProducts[0]) => p.category === "Home"
  },
  {
    keywords: ["headphone", "audio", "music", "wireless", "compare"],
    response: "I've compared the top wireless headphones for you. Here are the best options based on sound quality, comfort, and value for money.",
    showProducts: true,
    productFilter: (p: typeof mockProducts[0]) => p.category === "Electronics"
  },
  {
    keywords: ["fashion", "clothes", "wear", "style", "outfit"],
    response: "Here are some trendy fashion items that match your style! These pieces are versatile and can be dressed up or down.",
    showProducts: true,
    productFilter: (p: typeof mockProducts[0]) => p.category === "Fashion"
  },
  {
    keywords: ["cheap", "budget", "affordable", "discount", "sale"],
    response: "I found some great deals for you! These items offer excellent value without compromising on quality.",
    showProducts: true,
    productFilter: (p: typeof mockProducts[0]) => p.price < 100
  }
];

const defaultResponse = {
  response: "I found several great options for you! Based on your description, here are some products that might interest you. Would you like to see more details or compare prices?",
  showProducts: true
};

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Leijigeilam AI shopping assistant. Describe what you're looking for, and I'll help you find the perfect match. You can also upload an image of something you like!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const getAIResponse = (userMessage: string): { response: string; products?: typeof mockProducts } => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const aiResponse of aiResponses) {
      if (aiResponse.keywords.some(keyword => lowerMessage.includes(keyword))) {
        const filteredProducts = mockProducts.filter(aiResponse.productFilter).slice(0, 4);
        return {
          response: aiResponse.response,
          products: filteredProducts.length > 0 ? filteredProducts : mockProducts.slice(0, 4)
        };
      }
    }
    
    return {
      response: defaultResponse.response,
      products: mockProducts.slice(0, 4)
    };
  };
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const { response, products } = getAIResponse(userMessage);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response,
        products
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      
      setMessages(prev => [...prev, { 
        role: "user", 
        content: "I'm looking for products similar to this image:",
        image: imageUrl
      }]);
      setIsTyping(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "I've analyzed your image and found some similar products! Here are items that match the style, color, and design you're looking for.",
          products: mockProducts.slice(0, 4)
        }]);
        setIsTyping(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
                  
                  {/* Show uploaded image */}
                  {message.image && (
                    <div className="mt-3">
                      <img 
                        src={message.image} 
                        alt="Uploaded" 
                        className="rounded-lg max-w-full max-h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Show product recommendations */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {message.products.map((product) => (
                        <div 
                          key={product.id}
                          className="bg-background rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow hover:ring-2 hover:ring-primary/50"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-20 object-cover rounded-md mb-2"
                          />
                          <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs text-primary font-bold">${product.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Describe what you're looking for..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSend} size="icon" className="shrink-0" disabled={isTyping || !input.trim()}>
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
