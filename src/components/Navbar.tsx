import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShoppingBag, User, MessageSquare, Mail } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Mock unread count - in real app this would come from state/context
  const unreadMessages = 3;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-full bg-primary p-2 transition-transform group-hover:scale-110">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Leijigeilam
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/chat" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/chat") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              AI Chat
            </Link>
            <Link 
              to="/image-search" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/image-search") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Image Search
            </Link>
            <Link 
              to="/messages" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/messages") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Mail className="h-4 w-4" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {unreadMessages}
                  </Badge>
                )}
              </div>
              Messages
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/messages" className="md:hidden relative">
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="relative">
                  <Mail className="h-4 w-4" />
                  {unreadMessages > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                      {unreadMessages}
                    </Badge>
                  )}
                </div>
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gap-2">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
