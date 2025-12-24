import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Image, ShoppingBag, Sparkles, Shield, Zap, TrendingUp, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-shopping.jpg";
import ProductCard from "@/components/ProductCard";
import { mockProducts, categories } from "@/data/mockProducts";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Shopping
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Shop Smarter with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover anything you imagine. Use natural language or images to find exactly what you're looking for.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Search className="h-5 w-5" />
                  Search with AI
                </Button>
              </Link>
              <Link to="/image-search">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <Image className="h-5 w-5" />
                  Search by Image
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-4">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <TrendingUp className="h-7 w-7 text-primary" />
                Trending Now
              </h2>
              <p className="text-muted-foreground">Discover what's popular this week</p>
            </div>
            <Button variant="link">View All →</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl font-bold">Why Shop with AI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Smart shopping made simple
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 border-2 hover:border-primary transition-all hover:shadow-lg animate-fade-in">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Chat Search</h3>
              <p className="text-muted-foreground text-sm">
                Describe what you're looking for in natural language and get instant results.
              </p>
            </Card>
            
            <Card className="p-6 space-y-3 border-2 hover:border-primary transition-all hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-full bg-accent/50 w-12 h-12 flex items-center justify-center">
                <Image className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">Image Recognition</h3>
              <p className="text-muted-foreground text-sm">
                Upload any photo and find similar products instantly.
              </p>
            </Card>
            
            <Card className="p-6 space-y-3 border-2 hover:border-primary transition-all hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-full bg-secondary/50 w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">Verified Sellers</h3>
              <p className="text-muted-foreground text-sm">
                All sellers verified by our AI safety system for peace of mind.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Start Shopping Smarter Today
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands discovering a better way to shop
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Sparkles className="h-5 w-5" />
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Products
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
              <span className="font-bold">Leijigeilam</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Leijigeilam. Powered by AI. Built with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
