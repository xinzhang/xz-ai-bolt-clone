"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Message, MessagesContext } from "@/context/MessagesContext";
import { UserDetail } from "@/context/UserDetailContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";


export function Provider({ children } : { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [userDetail, setUserDetail] = React.useState<UserDetail | null>(null);
  const convex = useConvex();

  useEffect( () => {
    isAuthenticated();
  }, [])

  const isAuthenticated = async () => {
    if (typeof window !== undefined) {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const userObject = JSON.parse(userJson);
        
        const result = await convex.query(api.users.GetUser, {
          email: userObject.email,
        })

        setUserDetail(result as UserDetail);
      } else {
        setUserDetail(null);
      }
    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Provider;
