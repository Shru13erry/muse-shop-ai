export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  isSeller?: boolean;
  storeName?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: "text" | "image" | "product";
  productInfo?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface Conversation {
  contactId: string;
  messages: ChatMessage[];
}

export const mockContacts: ChatContact[] = [
  {
    id: "seller-1",
    name: "John's Electronics",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    isOnline: true,
    isSeller: true,
    storeName: "John's Electronics Store"
  },
  {
    id: "seller-2",
    name: "Sarah's Fashion",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    isOnline: false,
    lastSeen: "2 hours ago",
    isSeller: true,
    storeName: "Sarah's Fashion Boutique"
  },
  {
    id: "buyer-1",
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    isOnline: true,
    isSeller: false
  },
  {
    id: "seller-3",
    name: "Home Decor Plus",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    isOnline: false,
    lastSeen: "1 day ago",
    isSeller: true,
    storeName: "Home Decor Plus"
  },
  {
    id: "buyer-2",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    isOnline: true,
    isSeller: false
  }
];

export const mockConversations: Conversation[] = [
  {
    contactId: "seller-1",
    messages: [
      {
        id: "msg-1",
        senderId: "seller-1",
        content: "Hi! Thanks for reaching out. How can I help you today?",
        timestamp: "2025-01-10T10:00:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-2",
        senderId: "current-user",
        content: "Hi! I'm interested in the wireless headphones. Are they still available?",
        timestamp: "2025-01-10T10:02:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-3",
        senderId: "seller-1",
        content: "Yes, they're in stock! We have them in black and white. Which color would you prefer?",
        timestamp: "2025-01-10T10:05:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-4",
        senderId: "current-user",
        content: "I'd like the black ones. What's the battery life like?",
        timestamp: "2025-01-10T10:10:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-5",
        senderId: "seller-1",
        content: "The battery lasts up to 30 hours on a single charge! And they come with a quick charge feature - 10 minutes gives you 3 hours of playback.",
        timestamp: "2025-01-10T10:12:00",
        isRead: false,
        type: "text"
      }
    ]
  },
  {
    contactId: "seller-2",
    messages: [
      {
        id: "msg-6",
        senderId: "current-user",
        content: "Hello! Do you ship internationally?",
        timestamp: "2025-01-09T14:00:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-7",
        senderId: "seller-2",
        content: "Hi there! Yes, we ship to most countries. Shipping usually takes 7-14 business days for international orders.",
        timestamp: "2025-01-09T14:30:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-8",
        senderId: "seller-2",
        content: "Would you like me to check the shipping cost to your location?",
        timestamp: "2025-01-09T14:31:00",
        isRead: false,
        type: "text"
      }
    ]
  },
  {
    contactId: "buyer-1",
    messages: [
      {
        id: "msg-9",
        senderId: "buyer-1",
        content: "Hi, I saw your listing for the vintage camera. Is it still available?",
        timestamp: "2025-01-08T09:00:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-10",
        senderId: "current-user",
        content: "Yes, it's still available! It's in great condition.",
        timestamp: "2025-01-08T09:15:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-11",
        senderId: "buyer-1",
        content: "Great! Can you send me more photos?",
        timestamp: "2025-01-08T09:20:00",
        isRead: false,
        type: "text"
      }
    ]
  },
  {
    contactId: "seller-3",
    messages: [
      {
        id: "msg-12",
        senderId: "current-user",
        content: "Hi! I received my order but one item was damaged. Can you help?",
        timestamp: "2025-01-05T16:00:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-13",
        senderId: "seller-3",
        content: "I'm so sorry to hear that! Please send me a photo of the damage and your order number, and I'll arrange a replacement right away.",
        timestamp: "2025-01-05T16:30:00",
        isRead: true,
        type: "text"
      }
    ]
  },
  {
    contactId: "buyer-2",
    messages: [
      {
        id: "msg-14",
        senderId: "buyer-2",
        content: "Thanks for the quick shipping! The item looks perfect 😊",
        timestamp: "2025-01-07T11:00:00",
        isRead: true,
        type: "text"
      },
      {
        id: "msg-15",
        senderId: "current-user",
        content: "You're welcome! Thank you for your purchase. Don't forget to leave a review!",
        timestamp: "2025-01-07T11:30:00",
        isRead: true,
        type: "text"
      }
    ]
  }
];

export const getUnreadCount = (): number => {
  return mockConversations.reduce((count, conv) => {
    return count + conv.messages.filter(msg => 
      msg.senderId !== "current-user" && !msg.isRead
    ).length;
  }, 0);
};

export const getLastMessage = (contactId: string): ChatMessage | undefined => {
  const conversation = mockConversations.find(c => c.contactId === contactId);
  if (!conversation || conversation.messages.length === 0) return undefined;
  return conversation.messages[conversation.messages.length - 1];
};

export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};
