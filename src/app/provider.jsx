"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Provider({ children }) {
  const [message, setMessage] = React.useState({ role: "", content: "" });
  const [userDetail, setUserDetail] = React.useState({});

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ message, setMessage }}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Provider;
