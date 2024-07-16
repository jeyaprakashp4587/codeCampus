import { createContext, useContext, useState } from "react";

const Contexter = createContext();
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedTechnology, setselectedTechnology] = useState();
  const [selectedChallengeTopic, setselectedChallengeTopic] = useState();
  const [selectedChallenge, setSelectedChallenge] = useState();
  return (
    <Contexter.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        selectedTechnology,
        setselectedTechnology,
        selectedChallengeTopic,
        setselectedChallengeTopic,
        selectedChallenge,
        setSelectedChallenge,
        user,
        setUser,
      }}
    >
      {children}
    </Contexter.Provider>
  );
};
export const useData = () => {
  return useContext(Contexter);
};
