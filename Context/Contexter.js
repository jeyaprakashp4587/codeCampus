import { createContext, useContext, useState } from "react";

const Contexter = createContext();
export const ContextProvider = ({ children }) => {
  const [first, setFirst] = useState("jeya");
  const [selectedCourse, setSelectedCourse] = useState("");
  return (
    <Contexter.Provider
      value={{ first, setFirst, selectedCourse, setSelectedCourse }}
    >
      {children}
    </Contexter.Provider>
  );
};
export const useData = () => {
  return useContext(Contexter);
};
