import {
  FaUserCircle,
  FaBookmark,
  FaHeart,
  FaWallet,
  FaUtensils,
  FaQuestionCircle,
  FaTag,
  FaTrophy,
  FaGift,
} from "react-icons/fa";

export const menuItems = [
  { icon: <FaUserCircle />, label: "Manage account", link: "/account" },
  { icon: <FaBookmark />, label: "Orders", link: "/orders" },
  { icon: <FaHeart />, label: "Favourites", link: "/favourites" },
  { icon: <FaWallet />, label: "Wallet", link: "/wallet" },
  { icon: <FaUtensils />, label: "Meal plan", link: "/meal-plan" },
  { icon: <FaQuestionCircle />, label: "Help", link: "/help" },
  { icon: <FaTag />, label: "Promotions", link: "/promotions" },
  {
    icon: <FaTrophy />,
    label: "Premium Heat",
    link: "/uber-one",
    subtext: "Try free for 3 months",
  },
  {
    icon: <FaGift />,
    label: "Invite friends",
    link: "/invite-friends",
    subtext: "You get £3 off",
  },
];
