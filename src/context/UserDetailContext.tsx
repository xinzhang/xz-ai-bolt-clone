'use client'

import React from 'react'
import { Id } from "../../convex/_generated/dataModel"; 

export interface UserDetail {
  _id: Id<"users">; 
  email?: string;
  name?: string;
  picture?: string;
  uid?: string;
}

interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail | null>>;
}

export const UserDetailContext = React.createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
});
