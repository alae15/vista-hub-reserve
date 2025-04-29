
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

interface PanoramaViewerProps {
  images: string[];
  title: string;
}

const PanoramaViewer = ({ images, title }: PanoramaViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real implementation, you would use the Fullscreen API
  };

  return (
    <div className={`relative rounded-xl overflow-hidden border ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* 360 Panorama Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-sm">360° View {currentIndex + 1} of {images.length}</p>
        </div>
        
        <img 
          src={images[currentIndex]} 
          alt={`360-degree view ${currentIndex + 1}`} 
          className="w-full h-full object-cover"
        />
        
        {/* Controls */}
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>
        
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white ml-4"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white mr-4"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Dots navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View 360-degree image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanoramaViewer;
