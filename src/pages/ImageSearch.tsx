import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, Sparkles, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";

const ImageSearch = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(false);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(true);
    }, 2000);
  };
  
  const mockProducts = [
    { id: 1, name: "Modern Ceramic Vase", price: "$45", seller: "HomeDecor Co." },
    { id: 2, name: "Minimalist Table Lamp", price: "$68", seller: "Light Studio" },
    { id: 3, name: "Designer Wall Art", price: "$120", seller: "Art Gallery" },
    { id: 4, name: "Organic Cotton Throw", price: "$55", seller: "Textile House" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Camera className="h-8 w-8 text-primary" />
              Image Search
            </h1>
            <p className="text-muted-foreground">
              Upload or take a photo to find similar products
            </p>
          </div>
          
          {/* Upload Area */}
          {!results && (
            <Card
              className={`p-12 border-2 border-dashed transition-all animate-fade-in-up ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="text-center space-y-6">
                {isAnalyzing ? (
                  <>
                    <div className="animate-pulse">
                      <Sparkles className="h-16 w-16 text-primary mx-auto" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Analyzing your image...</h3>
                      <p className="text-muted-foreground">
                        Our AI is finding the best matches for you
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        Drag and drop your image here
                      </h3>
                      <p className="text-muted-foreground">
                        or click to browse your files
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Choose File
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Camera className="h-4 w-4" />
                        Take Photo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supports: JPG, PNG, WEBP (Max 10MB)
                    </p>
                  </>
                )}
              </div>
            </Card>
          )}
          
          {/* Results */}
          {results && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Similar Products Found</h2>
                  <p className="text-muted-foreground">
                    AI matched {mockProducts.length} items based on your image
                  </p>
                </div>
                <Button variant="outline" onClick={() => setResults(false)}>
                  Search Again
                </Button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {mockProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="p-6 space-y-4 hover:shadow-[var(--shadow-hover)] transition-all animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primary">{product.price}</p>
                        <p className="text-sm text-muted-foreground">{product.seller}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">View Details</Button>
                      <Button variant="outline" size="icon">
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" size="sm">Show More Results</Button>
                <Button variant="outline" size="sm">Filter by Price</Button>
                <Button variant="outline" size="sm">Sort by Relevance</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageSearch;
