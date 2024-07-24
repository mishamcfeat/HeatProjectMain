import SearchBar from "./SearchBar";
import header from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={header.header}>
      <div className={header.main}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
