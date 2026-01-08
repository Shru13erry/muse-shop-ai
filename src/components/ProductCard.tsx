import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const ProductCard = ({ id, name, price, originalPrice, image, rating, reviews, badge }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart logic here
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all hover:-translate-y-1 duration-300 cursor-pointer select-none"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {badge && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            {badge}
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-base line-clamp-2 min-h-[48px]">{name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-primary">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{rating}</span>
          </div>
          <span className="text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>
          <Button size="sm" variant="secondary" className="gap-2" onClick={handleCartClick}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
