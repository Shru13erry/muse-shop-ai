export interface OrderItem {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  status: "delivered" | "shipped" | "processing";
  date: string;
}

export interface SavedItem {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
}

export interface StoreProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  sold: number;
}

export interface UserStore {
  name: string;
  description: string;
  banner: string;
  logo: string;
  rating: number;
  totalSales: number;
  products: StoreProduct[];
}

export interface MockUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: string;
  isSeller: boolean;
  orders: OrderItem[];
  savedItems: SavedItem[];
  store?: UserStore;
}

export const mockUser: MockUser = {
  id: "user-1",
  username: "alex_chen",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  bio: "Tech enthusiast & sustainable fashion lover. Always on the lookout for unique finds! 🛍️",
  joinDate: "March 2023",
  isSeller: true,
  orders: [
    {
      id: 1,
      productName: "Wireless Noise-Cancelling Headphones",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      price: 199,
      quantity: 1,
      status: "delivered",
      date: "Dec 15, 2024"
    },
    {
      id: 2,
      productName: "Minimalist Running Sneakers",
      productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
      price: 129,
      quantity: 1,
      status: "shipped",
      date: "Dec 20, 2024"
    },
    {
      id: 3,
      productName: "Modern Ceramic Vase Set",
      productImage: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=200&fit=crop",
      price: 45,
      quantity: 2,
      status: "processing",
      date: "Dec 22, 2024"
    }
  ],
  savedItems: [
    {
      id: 1,
      name: "Premium Leather Crossbody Bag",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop",
      price: 89
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      price: 249,
      originalPrice: 349
    },
    {
      id: 3,
      name: "Professional DSLR Camera Kit",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop",
      price: 899,
      originalPrice: 1199
    },
    {
      id: 4,
      name: "Bamboo Kitchen Utensil Set",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
      price: 35
    }
  ],
  store: {
    name: "Alex's Tech Corner",
    description: "Curated selection of premium tech accessories and gadgets. Quality products, fast shipping, and excellent customer service. All items are inspected and tested before shipping.",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=300&fit=crop",
    logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4.9,
    totalSales: 1247,
    products: [
      {
        id: 101,
        name: "USB-C Charging Hub 7-in-1",
        image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e8?w=300&h=300&fit=crop",
        price: 49,
        stock: 23,
        sold: 156
      },
      {
        id: 102,
        name: "Mechanical Keyboard RGB",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=300&fit=crop",
        price: 129,
        stock: 8,
        sold: 89
      },
      {
        id: 103,
        name: "Wireless Mouse Ergonomic",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
        price: 39,
        stock: 45,
        sold: 234
      },
      {
        id: 104,
        name: "Laptop Stand Aluminum",
        image: "https://images.unsplash.com/photo-1527443060795-0402a18106c2?w=300&h=300&fit=crop",
        price: 59,
        stock: 0,
        sold: 312
      },
      {
        id: 105,
        name: "Webcam 4K Ultra HD",
        image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=300&fit=crop",
        price: 89,
        stock: 15,
        sold: 78
      },
      {
        id: 106,
        name: "Desk Cable Organizer",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
        price: 19,
        stock: 67,
        sold: 445
      }
    ]
  }
};

// Non-seller user for testing
export const mockBuyerOnlyUser: MockUser = {
  id: "user-2",
  username: "sarah_j",
  email: "sarah@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  bio: "Coffee lover and bookworm. Shopping is my cardio! ☕📚",
  joinDate: "June 2024",
  isSeller: false,
  orders: [
    {
      id: 1,
      productName: "Organic Cotton Hoodie",
      productImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop",
      price: 65,
      quantity: 1,
      status: "delivered",
      date: "Dec 10, 2024"
    }
  ],
  savedItems: [
    {
      id: 1,
      name: "Classic Denim Jacket",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
      price: 79
    }
  ]
};
