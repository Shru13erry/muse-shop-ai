import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Image, ShoppingBag, Sparkles, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-shopping.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-50" />
        <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                AI-Powered Shopping
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Shop Smarter with{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Discover anything you imagine. Use natural language or images to find exactly what you're looking for.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-shadow">
                    <MessageSquare className="h-5 w-5" />
                    Start Chat
                  </Button>
                </Link>
                <Link to="/image-search">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                    <Image className="h-5 w-5" />
                    Upload Image
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <img 
                src={heroImage} 
                alt="AI Shopping Experience" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three powerful ways to find exactly what you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 border-2 hover:border-primary transition-all hover:shadow-[var(--shadow-hover)] animate-fade-in">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">AI Chat Search</h3>
              <p className="text-muted-foreground">
                Describe what you're looking for in natural language. Our AI understands context and finds the perfect match.
              </p>
              <Link to="/chat">
                <Button variant="link" className="p-0">
                  Try Chat Search →
                </Button>
              </Link>
            </Card>
            
            <Card className="p-8 space-y-4 border-2 hover:border-primary transition-all hover:shadow-[var(--shadow-hover)] animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-full bg-accent/50 w-14 h-14 flex items-center justify-center">
                <Image className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Image Recognition</h3>
              <p className="text-muted-foreground">
                Upload or take a photo of any item. Our AI instantly finds similar products from trusted sellers.
              </p>
              <Link to="/image-search">
                <Button variant="link" className="p-0">
                  Try Image Search →
                </Button>
              </Link>
            </Card>
            
            <Card className="p-8 space-y-4 border-2 hover:border-primary transition-all hover:shadow-[var(--shadow-hover)] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-full bg-secondary/50 w-14 h-14 flex items-center justify-center">
                <ShoppingBag className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                Get personalized suggestions based on your preferences, budget, and style. Shop with confidence.
              </p>
              <Link to="/chat">
                <Button variant="link" className="p-0">
                  Get Started →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Verified Sellers</h3>
              <p className="text-muted-foreground">
                All sellers are verified by our AI safety system
              </p>
            </div>
            
            <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-full bg-accent/50 w-16 h-16 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                AI-powered search delivers results in milliseconds
              </p>
            </div>
            
            <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-full bg-secondary/50 w-16 h-16 flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">Smart Matching</h3>
              <p className="text-muted-foreground">
                Advanced AI ensures you find exactly what you need
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Ready to Experience the Future of Shopping?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of smart shoppers who've discovered a better way to find what they love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-bold">ShopAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ShopAI. Powered by AI. Built with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
