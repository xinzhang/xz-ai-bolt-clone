'use client'

import { HelpCircleIcon, LogOutIcon, MailIcon, SettingsIcon, WalletIcon } from "lucide-react";
import { Button } from "./ui/button";
import { googleLogout } from "@react-oauth/google";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "next/navigation";
import { useSidebar } from "./ui/sidebar";
const Footer = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const options = [
    {
      name: 'Settings',
      icon: SettingsIcon,
    },
    {
      name: 'Help center',
      icon: HelpCircleIcon,
    },
    {
      name: 'Subscription',
      icon: WalletIcon,
    },
    {
      name: "Sign out",
      icon: LogOutIcon,
    },
  ];

  const signOut = () => {
    googleLogout();
    setUserDetail(null);
    toggleSidebar();
    localStorage.removeItem("user");
    router.push("/");
  }

  return <div className="flex flex-col gap-3 mb-4 p-4 justify-start items-start">
    {options.map(item => {
      return (
        <Button variant="ghost" 
        onClick={() => {
          if (item.name === "Sign out") {
            signOut();
          }
          if (item.name === "Subscription") {
            router.push("/pricing");
          }
        }}
          className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white" key={item.name}>
          <item.icon className="w-4 h-4" />
          <span>{item.name}</span>
        </Button>
      )
    })}
  </div>;
};

export default Footer;