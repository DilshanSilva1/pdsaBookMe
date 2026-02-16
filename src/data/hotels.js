export const HOTELS = [
  { id: 1, name: "Grand Plaza Hotel", adminUsername: "admin-grandplaza", location: "Downtown Manhattan, New York", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", price: 250, maxGuests: 2, rating: 4.8, features: ["WiFi", "Pool", "Spa"], benefits: ["Breakfast", "Shuttle"] },
  { id: 2, name: "Sunset Beach Resort", adminUsername: "admin-sunset", location: "Miami Beach, Florida", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", price: 320, maxGuests: 4, rating: 4.9, features: ["Ocean View", "Beach", "Pool"], benefits: ["All-Inclusive", "Parking"] },
  { id: 3, name: "Mountain View Lodge", adminUsername: "admin-mountain", location: "Aspen, Colorado", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", price: 180, maxGuests: 3, rating: 4.6, features: ["Fireplace", "Ski-in", "Hot Tub"], benefits: ["Ski Rental", "Pet Friendly"] },
  { id: 4, name: "City Lights Boutique", adminUsername: "admin-citylights", location: "San Francisco, California", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800", price: 210, maxGuests: 2, rating: 4.7, features: ["City View", "Rooftop Bar", "WiFi"], benefits: ["Late Checkout", "Drinks"] },
  { id: 5, name: "Lakeside Serenity Inn", adminUsername: "admin-lakeside", location: "Lake Tahoe, California", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", price: 190, maxGuests: 4, rating: 4.5, features: ["Lake View", "Kayaking", "Fishing"], benefits: ["Kayak Rentals", "Bonfire"] },
  { id: 6, name: "Royal Palace Hotel", adminUsername: "admin-royal", location: "Las Vegas, Nevada", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", price: 280, maxGuests: 3, rating: 4.9, features: ["Casino", "Pool", "Spa"], benefits: ["Show Tickets", "Credits"] },
  { id: 7, name: "Cozy Corner B&B", adminUsername: "admin-cozy", location: "Savannah, Georgia", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800", price: 120, maxGuests: 2, rating: 4.8, features: ["Garden", "Historic", "WiFi"], benefits: ["Homemade Breakfast", "Tea"] },
  { id: 8, name: "Harbor View Suites", adminUsername: "admin-harbor", location: "Seattle, Washington", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800", price: 240, maxGuests: 4, rating: 4.7, features: ["Harbor View", "Kitchen", "Parking"], benefits: ["Full Kitchen", "Pet Friendly"] }
];

export const USERS = {
  user: { password: "user123", role: "user", hotel: null },
  admin: { password: "admin123", role: "admin", hotel: null },
  "admin-grandplaza": { password: "grand123", role: "admin", hotel: "Grand Plaza Hotel" },
  "admin-sunset": { password: "sunset123", role: "admin", hotel: "Sunset Beach Resort" },
  "admin-mountain": { password: "mountain123", role: "admin", hotel: "Mountain View Lodge" },
  "admin-citylights": { password: "city123", role: "admin", hotel: "City Lights Boutique" },
  "admin-lakeside": { password: "lakeside123", role: "admin", hotel: "Lakeside Serenity Inn" },
  "admin-royal": { password: "royal123", role: "admin", hotel: "Royal Palace Hotel" },
  "admin-cozy": { password: "cozy123", role: "admin", hotel: "Cozy Corner B&B" },
  "admin-harbor": { password: "harbor123", role: "admin", hotel: "Harbor View Suites" }
};
