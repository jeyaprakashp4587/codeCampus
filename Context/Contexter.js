import { createContext, useContext, useState } from "react";

const Contexter = createContext();
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedTechnology, setselectedTechnology] = useState();
  const [selectedChallengeTopic, setselectedChallengeTopic] = useState();
  const [selectedChallenge, setSelectedChallenge] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [selectedPost, setselectedPost] = useState();
  return (
    <Contexter.Provider
      value={{
        selectedPost,
        setselectedPost,
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
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </Contexter.Provider>
  );
};
export const useData = () => {
  return useContext(Contexter);
};
