import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, Sparkles, ShoppingBag, X, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockProducts } from "@/data/mockProducts";

const ImageSearch = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [results, setResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setUploadedImage(imageUrl);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setResults(true);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processImage(file);
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };
  
  const handleReset = () => {
    setUploadedImage(null);
    setResults(false);
    setIsAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };
  
  // Get random products for results (simulating AI matching)
  const matchedProducts = mockProducts.slice(0, 6);
  
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
          
          {/* Hidden file inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
          />
          
          {/* Upload Area */}
          {!results && !isAnalyzing && (
            <Card
              className={`p-12 border-2 border-dashed transition-all animate-fade-in-up cursor-pointer ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center space-y-6">
                <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    Drag and drop your image here
                  </h3>
                  <p className="text-muted-foreground">
                    or click to browse your files
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center" onClick={(e) => e.stopPropagation()}>
                  <Button className="gap-2" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4" />
                    Choose File
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => cameraInputRef.current?.click()}>
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports: JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
            </Card>
          )}
          
          {/* Analyzing State */}
          {isAnalyzing && uploadedImage && (
            <Card className="p-12 animate-fade-in">
              <div className="text-center space-y-6">
                <div className="relative w-48 h-48 mx-auto">
                  <img 
                    src={uploadedImage} 
                    alt="Analyzing" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Analyzing your image...</h3>
                  <p className="text-muted-foreground">
                    Our AI is finding the best matches for you
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Results */}
          {results && uploadedImage && (
            <div className="space-y-6 animate-fade-in">
              {/* Uploaded Image Preview */}
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded" 
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button 
                      onClick={handleReset}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Your uploaded image</h3>
                    <p className="text-sm text-muted-foreground">
                      AI found {matchedProducts.length} similar products
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleReset}>
                    Search New Image
                  </Button>
                </div>
              </Card>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Similar Products Found</h2>
                  <p className="text-muted-foreground">
                    AI matched {matchedProducts.length} items based on your image
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                        {Math.floor(Math.random() * 30 + 70)}% Match
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                        <span className="text-xs text-muted-foreground">{product.seller}</span>
                      </div>
                      <Button className="w-full gap-2" size="sm" onClick={(e) => e.stopPropagation()}>
                        <ShoppingBag className="h-4 w-4" />
                        View Product
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center gap-3">
                <Button variant="outline">Load More Results</Button>
                <Button variant="outline">Refine Search</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageSearch;
