import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication - bypass for development
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email, password) => {
    // Mock successful login
    const mockUser = { id: "user-123-456-789", email };
    const mockProfile = {
      id: "user-123-456-789",
      username: "john_investor",
      full_name: "John Anderson",
      avatar_url: "https://i.pravatar.cc/150?img=12",
    };

    setUser(mockUser);
    setProfile(mockProfile);
    return { data: { user: mockUser }, error: null };
  };

  const signUp = async (email, password, username) => {
    // Mock successful registration
    const mockUser = { id: "user-123-456-789", email };
    const mockProfile = {
      id: "user-123-456-789",
      username: username,
      full_name: "",
      avatar_url: null,
    };

    setUser(mockUser);
    setProfile(mockProfile);
    return {
      data: {
        user: mockUser,
        message: "Account created successfully!",
      },
      error: null,
    };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  const resetPassword = async (email) => {
    // Mock password reset
    return { data: null, error: null };
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
