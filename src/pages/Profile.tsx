import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Package, 
  Heart, 
  Store, 
  Calendar, 
  Star, 
  ShoppingBag,
  Plus,
  Edit,
  TrendingUp,
  CheckCircle,
  Truck,
  Clock,
  Sparkles
} from "lucide-react";
import { mockUser, MockUser } from "@/data/mockUser";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState<MockUser>(mockUser);

  const handleStartSelling = () => {
    toast.success("Store creation wizard coming soon!");
  };

  const getStatusBadge = (status: "delivered" | "shipped" | "processing") => {
    const styles = {
      delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    };
    const icons = {
      delivered: CheckCircle,
      shipped: Truck,
      processing: Clock
    };
    const Icon = icons[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive" className="text-xs">Out of Stock</Badge>;
    }
    if (stock < 10) {
      return <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Low Stock: {stock}</Badge>;
    }
    return <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">In Stock: {stock}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="p-6 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.username}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
              />
              {user.isSeller && (
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md">
                  <Store className="h-3 w-3" />
                  Seller
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">@{user.username}</h1>
                {user.isSeller && user.store && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{user.store.rating}</span>
                    <span className="text-muted-foreground text-sm">({user.store.totalSales} sales)</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mb-3">{user.bio}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {user.joinDate}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {user.orders.length} Orders
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {user.savedItems.length} Saved
                </span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="store" className="gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">My Store</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Order History</h2>
              <span className="text-sm text-muted-foreground">{user.orders.length} orders</span>
            </div>
            
            {user.orders.length === 0 ? (
              <Card className="p-12 text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">Start shopping to see your orders here!</p>
                <Button>Browse Products</Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {user.orders.map((order) => (
                  <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <img 
                        src={order.productImage} 
                        alt={order.productName}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{order.productName}</h3>
                        <p className="text-sm text-muted-foreground">Qty: {order.quantity}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="font-semibold">${order.price}</span>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Saved Items Tab */}
          <TabsContent value="saved" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Saved Items</h2>
              <span className="text-sm text-muted-foreground">{user.savedItems.length} items</span>
            </div>
            
            {user.savedItems.length === 0 ? (
              <Card className="p-12 text-center">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No saved items</h3>
                <p className="text-muted-foreground mb-4">Save items you love to find them easily later!</p>
                <Button>Browse Products</Button>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {user.savedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all">
                    <div className="relative aspect-square">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full text-rose-500 hover:bg-background transition-colors">
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-primary">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">${item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Store Tab */}
          <TabsContent value="store" className="space-y-6 animate-fade-in">
            {user.isSeller && user.store ? (
              <>
                {/* Store Header */}
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={user.store.banner} 
                    alt="Store banner"
                    className="w-full h-32 md:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
                    <img 
                      src={user.store.logo} 
                      alt="Store logo"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-4 border-background object-cover shadow-lg"
                    />
                    <div className="flex-1 text-white">
                      <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                        {user.store.name}
                        <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {user.store.rating}
                        </Badge>
                      </h2>
                      <p className="text-sm text-white/80">{user.store.totalSales} sales</p>
                    </div>
                    <Button size="sm" variant="secondary" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Store
                    </Button>
                  </div>
                </div>

                {/* Store Description */}
                <Card className="p-4">
                  <h3 className="font-medium mb-2">About This Store</h3>
                  <p className="text-muted-foreground text-sm">{user.store.description}</p>
                </Card>

                {/* Store Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <ShoppingBag className="h-6 w-6 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">{user.store.products.length}</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <TrendingUp className="h-6 w-6 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">{user.store.totalSales}</div>
                    <div className="text-xs text-muted-foreground">Total Sales</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <Star className="h-6 w-6 mx-auto text-amber-500 mb-2" />
                    <div className="text-2xl font-bold">{user.store.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </Card>
                </div>

                {/* Store Products */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Your Products</h3>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {user.store.products.map((product) => (
                      <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all">
                        <div className="relative aspect-square">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            {getStockBadge(product.stock)}
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm truncate">{product.name}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-primary">${product.price}</span>
                            <span className="text-xs text-muted-foreground">{product.sold} sold</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Start Selling CTA */
              <Card className="p-12 text-center bg-[image:var(--gradient-card)]">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Start Your Store Today</h2>
                  <p className="text-muted-foreground mb-6">
                    Turn your passion into profit! Create your own store and start selling to millions of buyers. 
                    It's free to get started.
                  </p>
                  <ul className="text-left text-sm space-y-2 mb-6 max-w-xs mx-auto">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Free to set up your store
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Reach millions of buyers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Easy product management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Secure payments
                    </li>
                  </ul>
                  <Button size="lg" className="gap-2" onClick={handleStartSelling}>
                    <Store className="h-5 w-5" />
                    Start Selling
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
