'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../shared';
import { useSession } from '../hooks/use-session';

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  isAuthenticated?: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionUser, setSessionUser] = useSession<User | null>('user');
  const [user, setUser] = useState<User | null>(sessionUser);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!sessionUser);


  useEffect(() => {
    if (sessionUser !== null) {
      setUser(sessionUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [sessionUser]);

  const handleSetUser = (user: User | null) => {
    setUser(user);
    setSessionUser(user);
    setIsAuthenticated(!!user);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, loading, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
