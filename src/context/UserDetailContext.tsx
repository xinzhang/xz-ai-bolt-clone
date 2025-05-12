import React from 'react'

export interface UserDetail {
  email?: string;
  name?: string;
  picture?: string;
}

export const UserDetailContext = React.createContext<UserDetail>({} as UserDetail);
