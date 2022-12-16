import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async (login) => {
    try {
      const response = await axios(
        `${rootUrl}/users/${login}/repos?per_page=100`
      );
      setRepos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollowers = async (followers_url) => {
    try {
      const response = await axios(`${followers_url}?per_page=100`);
      setFollowers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchUser = async (user) => {
    toggleError();
    setLoading(true);
    try {
      const response = await axios(`${rootUrl}/users/${user}`);
      if (response) {
        setGithubUser(response.data);
        const { login, followers_url } = response.data;
        fetchRepos(login);
        fetchFollowers(followers_url);
      }
    } catch (error) {
      toggleError(true, `There is no user match this user name, ${user}`);
      console.error(error);
    } finally {
      checkRequests();
      setLoading(false);
    }
  };
  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          // throw errors
          toggleError(true, "Sorry you are out of requests");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // error
  const [error, setError] = useState({
    show: false,
    msg: "",
  });
  const toggleError = (show = false, message = "") => {
    setError({ show, msg: message });
  };
  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  const customContext = useContext(GithubContext);
  return customContext;
};

export { GithubProvider, GithubContext };
