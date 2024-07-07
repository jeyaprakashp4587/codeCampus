import { createContext, useContext, useState } from "react";

const Contexter = createContext();
export const ContextProvider = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedTechnologie, setselectedTechnologie] = useState();

  return (
    <Contexter.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        selectedTechnologie,
        setselectedTechnologie,
      }}
    >
      {children}
    </Contexter.Provider>
  );
};
export const useData = () => {
  return useContext(Contexter);
};
