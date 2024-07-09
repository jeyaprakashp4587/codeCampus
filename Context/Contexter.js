import { createContext, useContext, useState } from "react";

const Contexter = createContext();
export const ContextProvider = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedTechnology, setselectedTechnology] = useState();
  const [selectedChallengeTopic, setselectedChallengeTopic] = useState();
  return (
    <Contexter.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        selectedTechnology,
        setselectedTechnology,
        selectedChallengeTopic,
        setselectedChallengeTopic,
      }}
    >
      {children}
    </Contexter.Provider>
  );
};
export const useData = () => {
  return useContext(Contexter);
};
