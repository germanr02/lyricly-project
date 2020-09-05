import React, { useContext, useEffect, useReducer } from "react";

import Navbar from "./components/navbar/navbar.component";
import SideDrawer from "./components/side-drawer/side-drawer.component";

import Context from "./contexts/context";
import Reducer from "./reducers/reducer";

// Styles
import "./App.scss";

// Components
import ContentDisplay from "./components/content-display/content-display.component";
import axios from "axios";

const App = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    console.log("APP useEffect");
    axios
      .all([axios.get("/getAccounts"), axios.get("/authUrls")])
      .then(
        axios.spread((accountRes, authRes) => {
          // do something with both responses
          dispatch({
            type: "UPDATE_CONTEXT",
            payload: {
              ...state,
              youtube_username: accountRes.data.youtube,
              // genius_username: accountRes.data.genius,
              authUrls: {
                youtube: authRes.data.youtube,
                genius: authRes.data.genius,
              },
            },
          });
        })
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="App mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Navbar title="Lyricly" />
        <SideDrawer />
        <main className="mdl-layout__content">
          <ContentDisplay />
        </main>
      </div>
    </Context.Provider>
  );
};

export default App;
