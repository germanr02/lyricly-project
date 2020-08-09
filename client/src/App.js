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
          <div className="about">
            <h3 className="about-title">About</h3>
            <hr className="about-divider" />
            <div className="about-message">
              I originally started Lyricly.net as a cool learning project to
              watch music videos and read lyrics. Along the way, I quickly
              discovered that there's so much more being left on the table when
              it comes to enjoying music. There's music art, remixes, samples,
              merch, non-commercial music and connections to other artists and
              producers that we rarely get to see or hear about. My goal is to
              create a platform where this information easily digestible and
              accessible in a fun, interactive and intuitive way - to create a
              new digital crate-digging experience!
              <br /> <br />
              There are many more features on the way in Lyricly 2.0!
              <br />
              For now, hope you enjoy the concept of Lyricly!
            </div>
          </div>
        </main>
      </div>
    </Context.Provider>
  );
};

export default App;
