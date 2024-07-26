import React, { useState } from "react";
import { useCreateRestaurantMutation } from "../../store";
import { cuisineSelectOptions, customStyles } from "./CuisineOptions";
import Select from "react-select";
import RC from "./RestaurantCreate.module.scss";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";

const RestaurantCreate: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [opening, setOpening] = useState<string>("");
  const [closing, setClosing] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cuisineType, setCuisineType] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const [createRestaurant, { isLoading, error, data }] =
    useCreateRestaurantMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleCuisineChange = (selectedOptions: any) => {
    const selectedCuisines = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setCuisineType(selectedCuisines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      console.log("Image is required!");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("location", location);
    form.append("opening", opening);
    form.append("closing", closing);
    cuisineType.forEach((cuisine) => form.append("cuisineType", cuisine));
    form.append("imageUrl", image); // Field name should match the backend configuration

    try {
      await createRestaurant(form).unwrap();
      console.log("Restaurant Created Successfully!!");
    } catch (err) {
      console.log("Failed to create restaurant", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={RC.mainContainer}>
      <div className={RC.formGroup}>
        <h1 className={RC.title}>Get Started</h1>
        <Link to={"/login"} className={RC.link}>
          Already have an account?
        </Link>
        <label className={RC.text}>Store Address</label>
        <input
          className={RC.input}
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g 34 Egglesfield Green"
          required
        />
      </div>
      <div className={RC.formGroup}>
        <label className={RC.text}>Store Name</label>
        <input
          className={RC.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Nandos"
          required
        />
      </div>
      <div className={RC.formGroup}>
        <div className={RC.time}>
          <div className={RC.labinp}>
            <label className={RC.text}>Opening Time</label>
            <input
              className={RC.timeInput}
              type="time"
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              step="900" // 15-minute increments
              required
            />
          </div>
          <div className={RC.labinp}>
            <label className={RC.text}>Closing Time</label>
            <input
              className={RC.timeInput}
              type="time"
              value={closing}
              onChange={(e) => setClosing(e.target.value)}
              step="900"
              placeholder="e.g. 22:00"
              required
            />
          </div>
        </div>
      </div>

      <div className={RC.formGroup}>
        <label className={RC.text}>Cuisine Types:</label>
        <Select
          isMulti
          options={cuisineSelectOptions}
          onChange={handleCuisineChange}
          styles={customStyles}
          className={RC.select}
          classNamePrefix="select"
        />
      </div>
      <div className={RC.fileInput}>
        <input type="file" onChange={handleImageChange} required />
      </div>
      <Button type="submit" disabled={isLoading} primary className={RC.button}>
        Create Restaurant
      </Button>
    </form>
  );
};

export default RestaurantCreate;
