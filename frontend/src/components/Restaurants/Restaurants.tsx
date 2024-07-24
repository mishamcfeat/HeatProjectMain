import React, { useState, useEffect, useRef } from "react";
import { useCreateRestaurantMutation } from "../../store";

const cuisineOptions = [
  "Grocery",
  "Thai",
  "Fast Food",
  "Breakfast",
  "Halal",
  "Pizza",
  "Healthy",
  "Bubble Tea",
  "Coffee",
  "Korean",
  "Sushi",
  "Burgers",
  "Chinese",
  "Comfort Food",
  "Vietnamese",
  "Indian",
  "Mexican",
  "Desserts",
  "Sandwich",
  "Wings",
  "Italian",
  "American",
  "Greek",
  "BBQ",
  "Japanese",
  "Bakery",
  "Ice Cream",
  "Caribbean",
  "Asian",
  "Street Food",
  "Vegan",
  "Salads",
  "Seafood",
  "Soup",
  "Smoothies",
  "Soul Food",
  "Alcohol",
];

const Restaurant: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [opening, setOpening] = useState<string>("");
  const [closing, setClosing] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cuisineType, setCuisineType] = useState<string[]>([]);
  const [image, SetImage] = useState<File | null>(null);

  const [createRestaurant, { isLoading, error, data }] =
    useCreateRestaurantMutation();

  const handleCuisineChange = (cuisine: string) => {
    setCuisineType((prev) => {
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      console.log("Image is required!");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("opening", opening);
    form.append("closing", closing);
    form.append("location", location);
    cuisineType.forEach((cuisine) => form.append("cuisineType", cuisine));
    form.append("imageUrl", image);

    try {
      await createRestaurant(form).unwrap();
      console.log("Restaurant Created Successfully!!");
    } catch (err) {
      console.log("failed to create restaurant", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={opening}
        onChange={(e) => setOpening(e.target.value)}
        placeholder="Opening Time"
        required
      />
      <input
        type="text"
        value={closing}
        onChange={(e) => setClosing(e.target.value)}
        placeholder="Closing Time"
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
    </form>
  );
};

export default Restaurant;
