import React, { createContext, useContext, useState, useCallback } from "react";
import { MOCK_USER, MOCK_WORKSHOPS } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [workshops, setWorkshops] = useState(MOCK_WORKSHOPS);
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const login = useCallback(
    (username, password) => {
      if (!username.trim() || !password.trim()) {
        toast("Please enter a username and password.", "error");
        return false;
      }

      // Build display name from whatever was typed
      // If user typed a full name with space (e.g. "John Doe"), split it
      // Otherwise use the username as-is for the first name
      const parts = username.trim().split(" ");
      const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
      const first_name = capitalize(parts[0]);
      const last_name = parts.length > 1 ? capitalize(parts.slice(1).join(" ")) : "";

      const loggedInUser = {
        ...MOCK_USER,
        first_name,
        last_name,
        username: username.trim(),
        // If they typed an email address, use it as-is; otherwise construct one
        email: username.includes("@")
          ? username.trim()
          : username.trim().toLowerCase() + "@example.com",
      };

      setUser(loggedInUser);
      toast("Welcome back, " + first_name + "!", "success");
      return true;
    },
    [toast]
  );

  const logout = useCallback(() => {
    setUser(null);
    toast("Logged out successfully.", "info");
  }, [toast]);

  const register = useCallback(
    (data) => {
      // Use exactly the data the user filled in during registration
      const newUser = {
        ...MOCK_USER,
        first_name:        data.first_name   || "",
        last_name:         data.last_name    || "",
        username:          data.username     || "",
        email:             data.email        || "",
        title:             data.title        || "",
        phone_number:      data.phone_number || "",
        institute:         data.institute    || "",
        department:        data.department   || "",
        position:          data.position     || "coordinator",
        location:          data.location     || "",
        state:             data.state        || "IN-MH",
        how_did_you_hear:  data.how_did_you_hear || "",
        is_email_verified: false,
      };
      setUser(newUser);
      toast("Account created! Welcome, " + newUser.first_name + "!", "success");
      return true;
    },
    [toast]
  );

  const proposeWorkshop = useCallback(
    (workshopTypeId, date, workshopTypeName) => {
      const newW = {
        id: Date.now(),
        workshop_type_id: workshopTypeId,
        workshop_type_name: workshopTypeName,
        date,
        status: 0,
        instructor_name: null,
        coordinator_name: (user ? user.first_name + " " + user.last_name : ""),
        tnc_accepted: true,
        comments: [],
      };
      setWorkshops((prev) => [newW, ...prev]);
      toast("Workshop proposed successfully!", "success");
      return true;
    },
    [user, toast]
  );

  return (
    <AppContext.Provider
      value={{ user, workshops, toasts, login, logout, register, proposeWorkshop, toast }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
