
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface VehicleProps {
  id: number;
  title: string;
  type: string; // Changed from "car" | "motorcycle" to string to match the actual data
  price: number;
  image: string;
  seats?: number;
  transmission?: string;
  year: number;
  description?: string;
  features?: string[];
  panoramaImages?: string[];
  featured?: boolean;
}

const VehicleCard = ({
  id,
  title,
  type,
  price,
  image,
  seats,
  transmission,
  year,
  featured,
}: VehicleProps) => {
  return (
    <Link to={`/vehicle/${id}`} className="block group">
      <Card className="listing-card h-full">
        <div className="relative listing-image">
          {featured && (
            <Badge className="absolute top-2 left-2 bg-martil-blue hover:bg-martil-blue text-white">
              Featured
            </Badge>
          )}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Badge
              variant={type.toLowerCase() === "car" ? "default" : "outline"}
              className={`text-xs ${type.toLowerCase() === "car" ? "bg-martil-blue hover:bg-martil-blue" : ""}`}
            >
              {type}
            </Badge>
            <span className="text-xs text-muted-foreground">{year}</span>
          </div>
          <h3 className="mt-2 font-medium text-lg leading-tight text-martil-navy group-hover:text-martil-blue transition-colors">
            {title}
          </h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {seats && (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                {seats} seats
              </span>
            )}
            {transmission && (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path fillRule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {transmission}
              </span>
            )}
          </div>
          <div className="mt-3 font-medium">
            ${price} <span className="text-muted-foreground font-normal">/day</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default VehicleCard;
