import {
  House,
  Grid2x2,
  ShoppingCart,
  ClipboardList,
  User,
} from "lucide-react";

export const navigation = [
  {
    title: "Home",
    path: "/",
    icon: House,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: Grid2x2,
  },
  {
    title: "Cart",
    path: "/cart",
    icon: ShoppingCart,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];