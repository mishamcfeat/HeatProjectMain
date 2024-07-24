import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import header from "./Header.module.scss";

const SearchBar: React.FC = () => {
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?term=${term}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`${header.searchbar} ${isFocused ? header.focused : ""}`}
        ref={ref}
      >
        <div className={header.icon}>
          <VscSearch />
        </div>
        <input
          className={header.input}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Foods"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
