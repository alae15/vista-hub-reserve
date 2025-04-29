
// Mock data for the application

export const properties = [
  {
    id: 1,
    title: "Luxury Beach Villa with Ocean View",
    location: "Martil Beach Front",
    price: 250,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    type: "Villa",
    beds: 4,
    baths: 3,
    guests: 8,
    amenities: ["Beach Access", "Pool", "WiFi", "Air Conditioning", "Kitchen", "Free Parking"],
    description: "Stunning villa right on Martil's beachfront with panoramic views of the Mediterranean. Perfect for family vacations or groups of friends.",
    featured: true
  },
  {
    id: 2,
    title: "Modern Apartment near Martil Center",
    location: "Downtown Martil",
    price: 120,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.7,
    type: "Apartment",
    beds: 2,
    baths: 1,
    guests: 4,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "City View"],
    description: "Newly renovated apartment in the heart of Martil. Walking distance to restaurants, shops, and just 5 minutes from the beach.",
    featured: false
  },
  {
    id: 3,
    title: "Traditional Moroccan House",
    location: "Old Town, Martil",
    price: 180,
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.8,
    type: "House",
    beds: 3,
    baths: 2,
    guests: 6,
    amenities: ["Courtyard", "Rooftop Terrace", "WiFi", "Traditional Decor"],
    description: "Experience authentic Moroccan living in this beautiful traditional house with a private courtyard and rooftop terrace with views of the mountains.",
    featured: true
  },
  {
    id: 4,
    title: "Seafront Studio with Balcony",
    location: "Martil Corniche",
    price: 90,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.5,
    type: "Studio",
    beds: 1,
    baths: 1,
    guests: 2,
    amenities: ["Sea View", "Balcony", "WiFi", "Air Conditioning"],
    description: "Cozy studio apartment with a stunning sea view. Perfect for couples looking for a romantic getaway in beautiful Martil.",
    featured: false
  },
  {
    id: 5,
    title: "Family Beach House with Garden",
    location: "Martil Beach Area",
    price: 210,
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.7,
    type: "House",
    beds: 3,
    baths: 2,
    guests: 7,
    amenities: ["Garden", "BBQ Area", "Beach Access", "WiFi", "Family-Friendly"],
    description: "Spacious family house with a beautiful garden, just 2 minutes walk from the beach. Ideal for families with children.",
    featured: false
  },
  {
    id: 6,
    title: "Luxury Penthouse with Sea Views",
    location: "Martil Marina",
    price: 300,
    image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    rating: 4.9,
    type: "Penthouse",
    beds: 3,
    baths: 2,
    guests: 6,
    amenities: ["Panoramic Views", "Luxury Furnishings", "Private Terrace", "Jacuzzi", "Concierge Service"],
    description: "Stunning penthouse overlooking Martil's marina with luxurious amenities and breathtaking views of the Mediterranean Sea and mountains.",
    featured: true
  }
];

export const vehicles = [
  {
    id: 1,
    title: "Toyota RAV4 SUV",
    type: "car",
    price: 70,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549275301-c9d60945be6b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603811478698-7530d2954304?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    seats: 5,
    transmission: "Automatic",
    year: 2023,
    features: ["Air Conditioning", "Bluetooth", "Backup Camera", "GPS Navigation", "USB Port"],
    description: "Perfect SUV for exploring Martil and the surrounding areas. Comfortable, fuel-efficient and spacious for family trips.",
    featured: true
  },
  {
    id: 2,
    title: "Honda CB500 Motorcycle",
    type: "motorcycle",
    price: 45,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
      "https://images.unsplash.com/photo-1623009070533-dc0f150bbd23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1567156344647-3899399574b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    transmission: "Manual",
    year: 2022,
    features: ["Helmet Included", "Storage Box", "Phone Mount", "Low Fuel Consumption"],
    description: "Agile and reliable motorcycle, perfect for zipping around Martil and exploring coastal roads with freedom.",
    featured: true
  },
  {
    id: 3,
    title: "Mercedes-Benz C-Class",
    type: "car",
    price: 120,
    image: "https://images.unsplash.com/photo-1549275301-c9d60945be6b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1549275301-c9d60945be6b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603811478698-7530d2954304?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    seats: 5,
    transmission: "Automatic",
    year: 2023,
    features: ["Leather Seats", "Premium Sound System", "Panoramic Sunroof", "WiFi Hotspot", "Advanced Safety Features"],
    description: "Luxury sedan offering comfort, style and performance. Make your Martil experience truly special with this premium car.",
    featured: false
  },
  {
    id: 4,
    title: "Yamaha MT-07 Motorcycle",
    type: "motorcycle",
    price: 55,
    image: "https://images.unsplash.com/photo-1567156344647-3899399574b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1567156344647-3899399574b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1623009070533-dc0f150bbd23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    transmission: "Manual",
    year: 2021,
    features: ["Helmet Included", "Powerful Engine", "Lightweight", "Digital Display"],
    description: "Powerful and fun motorcycle with great handling. Perfect for experienced riders who want to enjoy the coastal roads.",
    featured: false
  },
  {
    id: 5,
    title: "Fiat 500 Convertible",
    type: "car",
    price: 60,
    image: "https://images.unsplash.com/photo-1603811478698-7530d2954304?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1603811478698-7530d2954304?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603811878726-8ee01f38ad8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    seats: 4,
    transmission: "Automatic",
    year: 2022,
    features: ["Convertible Roof", "Compact Size", "Fuel Efficient", "Easy Parking", "Bluetooth"],
    description: "Cute and fun convertible, perfect for couples and enjoying the Martil sunshine. Easy to park and great for city drives.",
    featured: true
  },
  {
    id: 6,
    title: "Vespa Primavera Scooter",
    type: "motorcycle",
    price: 30,
    image: "https://images.unsplash.com/photo-1623009070533-dc0f150bbd23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    panoramaImages: [
      "https://images.unsplash.com/photo-1623009070533-dc0f150bbd23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
      "https://images.unsplash.com/photo-1567156344647-3899399574b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    transmission: "Automatic",
    year: 2022,
    features: ["Helmet Included", "Storage Space", "Easy to Ride", "Stylish Design"],
    description: "Iconic Italian scooter, perfect for stylishly cruising around Martil. Easy to ride even for beginners.",
    featured: false
  }
];

export const restaurants = [
  {
    id: 1,
    name: "Oceanview Seafood",
    image: "https://images.unsplash.com/photo-1600891963935-9e9522cc9756?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "Seafood",
    rating: 4.8,
    priceRange: "$$$",
    location: "Martil Beach Front",
    description: "Premium seafood restaurant with stunning views of the Mediterranean. Specializing in fresh, locally caught fish and traditional Moroccan seafood recipes.",
    popularDishes: ["Grilled Sea Bass", "Seafood Tajine", "Lobster Paella"],
    openingHours: "12:00 PM - 11:00 PM",
    contact: "+212 539 123456",
    features: ["Ocean View", "Outdoor Seating", "Reservations Recommended"]
  },
  {
    id: 2,
    name: "Casa Moroccan",
    image: "https://images.unsplash.com/photo-1530523381133-5566b3c3a6f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "Moroccan",
    rating: 4.7,
    priceRange: "$$",
    location: "Old Town, Martil",
    description: "Authentic Moroccan restaurant serving traditional dishes in a cozy, ornate setting with traditional live music on weekends.",
    popularDishes: ["Lamb Tajine", "Couscous Royale", "Pastilla"],
    openingHours: "11:30 AM - 10:30 PM",
    contact: "+212 539 234567",
    features: ["Traditional Decor", "Live Music", "Family-Friendly"]
  },
  {
    id: 3,
    name: "Mediterranean Bistro",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "Mediterranean",
    rating: 4.6,
    priceRange: "$$",
    location: "Martil Marina",
    description: "Elegant bistro offering Mediterranean fusion cuisine combining Spanish, Italian, and Moroccan influences.",
    popularDishes: ["Paella", "Fresh Pasta", "Mezze Platter"],
    openingHours: "5:00 PM - 11:30 PM",
    contact: "+212 539 345678",
    features: ["Marina View", "Wine Selection", "Romantic Setting"]
  },
  {
    id: 4,
    name: "Beach Cafe",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "International",
    rating: 4.4,
    priceRange: "$",
    location: "Martil Beach",
    description: "Casual beachfront cafe serving international comfort food, sandwiches, salads, and refreshing drinks right on the beach.",
    popularDishes: ["Club Sandwich", "Greek Salad", "Fresh Fruit Smoothies"],
    openingHours: "8:00 AM - 9:00 PM",
    contact: "+212 539 456789",
    features: ["Beach Access", "Casual Dining", "Breakfast Service"]
  },
  {
    id: 5,
    name: "Tajine House",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be338a7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "Moroccan",
    rating: 4.9,
    priceRange: "$$",
    location: "Downtown Martil",
    description: "Family-run restaurant specializing in traditional Moroccan tajines cooked in clay pots over charcoal for authentic flavor.",
    popularDishes: ["Chicken Tajine with Preserved Lemon", "Kefta Tajine", "Vegetable Tajine"],
    openingHours: "12:00 PM - 10:00 PM",
    contact: "+212 539 567890",
    features: ["Traditional Cooking Methods", "Family Recipes", "Cozy Atmosphere"]
  },
  {
    id: 6,
    name: "Sunset Lounge",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "Fusion",
    rating: 4.7,
    priceRange: "$$$",
    location: "Martil Corniche",
    description: "Upscale restaurant and lounge with panoramic sunset views, offering a fusion of Moroccan and international cuisine.",
    popularDishes: ["Seafood Platters", "Moroccan-Spiced Steak", "Craft Cocktails"],
    openingHours: "4:00 PM - 12:00 AM",
    contact: "+212 539 678901",
    features: ["Sunset Views", "Cocktail Bar", "Evening Ambiance"]
  }
];
