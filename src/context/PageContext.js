import React, { useReducer, useMemo, useCallback, useContext, useEffect, useState } from "react";
import { useAuthenticator } from "./AuthContext";
import { UpdatePage, GetUserPages, DeletePage } from "../api/ApiClient";
const PageContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "set-entries":
      return { ...state, pageEntries: action.data };
    case "clear-entries":
      return { ...state, pageEntries: null };

    default:
      throw new Error(`Unhandled action ${action.type}!`);
  }
};

export const PageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    pageEntries: null,
  });
  const [refresher, setRefresher] = useState(1);
  const { pageEntries } = state;
  const { authToken, loggedIn } = useAuthenticator();

  useEffect(() => {
    if (!loggedIn || !authToken) return;
    const getPageEntries = async () => {
      try {
        GetUserPages(authToken)
          .then((response) => {
            if (response.data.success) {
              dispatch({ type: "set-entries", data: response.data.pages });
            } else {
              console.log(" Failed: ", response.data);
            }
          })
          .catch((error) => {
            console.log(error.response.data.message, " caught Error while retrieving page Entries  ");
            return;
          });
      } catch (error) {
        console.log(error.message, " Caught Error");
      }
    };
    getPageEntries();
  }, [authToken, loggedIn, refresher]);

  const updatePageEntries = useCallback(() => {
    if (!loggedIn || !authToken) return;
    try {
      GetUserPages(authToken)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: "set-entries", data: response.data.pages });
            setRefresher(Math.random());
          } else {
            console.log(" Failed: ", response.data);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message, " caught Error while retrieving page Entries  ");
          return;
        });
    } catch (error) {
      console.log(error.message, " Caught Error");
    }
  }, [authToken, loggedIn]);

  const updatePageEntry = useCallback(
    (pageID, title, body) => {
      if (!loggedIn || !authToken) return;
      try {
        UpdatePage(authToken, pageID, title, body)
          .then((response) => {
            if (response.data.success) {
              setRefresher(Math.random());
              // The useEffect used will automatically update the page entries..
              // so no need to handle it in this promise.
              console.log(response.data, " Successfuly updated");
            } else {
              console.log(response.data.message, " in error pageUpdate");
            }
          })
          .catch((error) => {
            console.log(error.response.data.message, " Caught error");
            return;
          });
        return true;
      } catch (error) {
        console.log(error.message, " here");
        return false;
      }
    },
    [authToken, loggedIn]
  );

  const removePageEntries = useCallback(
    (pageID) => {
      if (!loggedIn || !authToken) return;
      try {
        DeletePage(pageID, authToken)
          .then((response) => {
            if (response.data.success) {
              setRefresher(Math.random());
            }
          })
          .catch((error) => {
            console.log(error.response.data.message, " deleted failed  ");
            return;
          });
      } catch (error) {
        console.log(error.message, " what");
        return false;
      }
    },
    [loggedIn, authToken]
  );

  const value = useMemo(() => {
    return {
      pageEntries,
      removePageEntries,
      updatePageEntry,
      updatePageEntries,
    };
  }, [pageEntries, removePageEntries, updatePageEntry, updatePageEntries]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) throw new Error("usePage must be used within a PageProvider");
  return context;
};