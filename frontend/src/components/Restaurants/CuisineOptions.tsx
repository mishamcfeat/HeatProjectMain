const cuisineOptions = [
  "Grocery",
  "Fast Food",
  "Breakfast",
  "Halal",
  "Healthy",
  "Coffee",
  "Sushi",
  "Burgers",
  "Chinese",
  "Indian",
  "Wings",
  "Italian",
  "Bakery",
  "Ice Cream",
  "Asian",
  "Vegetarian",
  "Salads",
  "Seafood",
  "Soup",
  "Smoothies",
  "Alcohol",
];

// Transform cuisineOptions into the format expected by react-select
const cuisineSelectOptions = cuisineOptions.map((cuisine) => ({
  value: cuisine,
  label: cuisine,
}));

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "white" : "#E6E6FA",
    width: "100%",
    minHeight: "40px",
    borderRadius: "0.3em",
    padding: "0 4px",
    boxShadow: state.isFocused ? "0 0 0 1px #ccc" : provided.boxShadow,
    "&:hover": {
      borderColor: "#ccc",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 2,
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#D3D3E0",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#333",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#666",
    ":hover": {
      backgroundColor: "#B0B0C0",
      color: "white",
    },
  }),
};

export { cuisineSelectOptions, customStyles };
