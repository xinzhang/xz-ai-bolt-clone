"use client";

import React from "react";

// Define the shape of a message
export interface Message {
  role: string;
  content: string;
}

// Define the shape of the context
export interface MessagesContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const MessagesContext = React.createContext<MessagesContextType>({
  messages: [],
  setMessages: () => {},
});
