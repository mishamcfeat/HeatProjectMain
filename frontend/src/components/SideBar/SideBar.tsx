import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import { menuItems } from "./menuItems";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { PiUserFocus } from "react-icons/pi";
import { RootState } from "../../store";
import styles from "./SideBar.module.scss";
import { clearUser } from "../../store/slices/authSlice";

const UserComponent: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={styles.sidebar} ref={ref}>
      <div className={`${styles.top} ${isOpen ? styles.butopen : ""}`}>
        {isOpen ? (
          <BsLayoutSidebarInsetReverse onClick={() => setIsOpen(false)} />
        ) : (
          <BsLayoutSidebarInset onClick={() => setIsOpen(true)} />
        )}
      </div>
      <div className={`${styles.mainContainer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.user}>
          <div className={styles.leftSide}>
            {user ? <PiUserFocus className="text-5xl" /> : <></>}
          </div>
          <div>
            {user ? (
              <div className={styles.rightSide}>
                <p className="font-semibold text-xl">{user.name}</p>
                <Link className="font-normal text-red-300 " to="/dashboard">
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <Button primary>Log in</Button>
                </Link>
                <Link to="/login">
                  <Button secondary>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {user ? (
          <div className={styles.menu}>
            {menuItems.map((item, index) => (
              <div key={index}>
                <Link to={item.link} className={styles.menuItem}>
                  <div className={styles.menuIcon}>{item.icon}</div>
                  <div className={styles.menuLabels}>
                    <div className={styles.menuLabel}>{item.label}</div>
                    {item.subtext && (
                      <div className={styles.menuSubtext}>{item.subtext}</div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
            <Link to="/">
              <Button primary onClick={() => dispatch(clearUser())}>
                Sign Out
              </Button>
            </Link>
          </div>
        ) : (
          <div className={styles.menuAccounts}>
            <Link to="/createbusiness">Create a business account</Link>
            <Link to="/addrestaurant">Add your restaurant</Link>
            <Link to="/signuptodeliver">Sign up to deliver</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComponent;
