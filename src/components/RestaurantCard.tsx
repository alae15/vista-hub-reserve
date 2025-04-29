
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface RestaurantProps {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  location: string;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisine,
  rating,
  priceRange,
  location,
}: RestaurantProps) => {
  return (
    <Link to={`/restaurant/${id}`} className="block group">
      <Card className="listing-card h-full">
        <div className="listing-image">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {cuisine}
            </Badge>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-500 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <h3 className="mt-2 font-medium text-lg leading-tight text-martil-navy group-hover:text-martil-blue transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{location}</p>
          <div className="mt-3 font-normal text-sm">
            <span className="text-muted-foreground">{priceRange}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
