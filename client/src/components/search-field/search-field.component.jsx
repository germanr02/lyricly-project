import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import InputField from "../input-field/input-field.compoent";
import CustomButton from "../custom-button/custom-button.component";

import Context from "../../contexts/context";
import "./search-field.styles.scss";

const SearchField = () => {
  const { dispatch, state } = useContext(Context);
  const { search_field } = state;
  const [innerWidth, setinnerWidth] = useState(window.innerWidth);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [search_field]);

  const handleResize = (event) => {
    setinnerWidth(event.target.innerWidth);
  };

  const search = async (query) => {
    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        geniusResultsLoading: true,
      },
    });

    await axios
      .get(`/genius/search/${query}`)
      .then((genius) => {
        dispatch({
          type: "UPDATE_CONTEXT",
          payload: {
            ...state,
            last_search: query,
            genius_search_results: genius.data,
            geniusResultsLoading: false,
            music_data_active_tab: "results-tab",
          },
        });
      })
      .catch((err) => console.log(err));

    if (innerWidth <= 768) {
      document.getElementById("music-data-wrapper").scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    } else if (innerWidth <= 963) {
      document.getElementById("music-data-wrapper").scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var query = search_field;
    // execute search only if query has characters other than spaces
    if (/\S/.test(query)) {
      query = query.trim();
      search(query);
    } else {
      await dispatch({
        type: "UPDATE_CONTEXT",
        payload: {
          ...state,
          search_field: "",
        },
      });
    }

    document.getElementById("search-input").blur();
  };

  const handleChange = async (event) => {
    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        search_field: event.target.value,
      },
    });
  };

  const handleFocus = () => {
    setHasFocus(true);
    const site_identity = document.getElementById("site-identity");
    const search_form = document.getElementById("search-form");
    const navbar = document.getElementById("navbar-content");

    if (innerWidth <= 300) {
      site_identity.style.display = "none";
      search_form.style.maxWidth = "75%";
      search_form.style.minWidth = "75%";
      navbar.style.justifyContent = "flex-end";
    }
    else if (innerWidth <= 345) {
      site_identity.style.display = "none";
      search_form.style.maxWidth = "80%";
      search_form.style.minWidth = "80%";
      navbar.style.justifyContent = "flex-end";
    }
    else if (innerWidth <= 414) {
      site_identity.style.display = "none";
      search_form.style.maxWidth = "85%";
      search_form.style.minWidth = "85%";
      navbar.style.justifyContent = "flex-end";
    } else if (innerWidth <= 620) {
      site_identity.style.display = "none";
      search_form.style.maxWidth = "90%";
      search_form.style.minWidth = "90%";
      navbar.style.justifyContent = "flex-end";
    }
  };

  const handleBlur = () => {
    setHasFocus(false);
    const site_identity = document.getElementById("site-identity");
    const search_form = document.getElementById("search-form");
    const navbar = document.getElementById("navbar-content");

    site_identity.style.display = "flex";
    navbar.style.justifyContent = "space-between";

    if (innerWidth <= 305) {
      search_form.style.minWidth = "30%";
      search_form.style.maxWidth = "30%";
    } else if (innerWidth <= 351) {
      search_form.style.minWidth = "40%";
      search_form.style.maxWidth = "40%";
    } else if (innerWidth <= 415) {
      search_form.style.minWidth = "50%";
      search_form.style.maxWidth = "50%";
    } else if (innerWidth <= 768) {
      search_form.style.minWidth = "45%";
      search_form.style.maxWidth = "45%";
    } else if (innerWidth <= 963) {
      search_form.style.minWidth = "40%";
      search_form.style.maxWidth = "40%";
    } else {
      search_form.style.minWidth = "28%";
      search_form.style.maxWidth = "28%";
    }
  };

  const clearSearchField = async () => {
    await dispatch({
      type: "UPDATE_CONTEXT",
      payload: {
        ...state,
        search_field: "",
      },
    });
    document.getElementById("search-input").focus();
    setHasFocus(true);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} id="search-form">
      <div className="search-field">
        <InputField
          type="text"
          label="Search"
          id="search-input"
          name="search-input"
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={search_field}
        />
        {!hasFocus ? null : (
          <span
            id="clear-search-field"
            className="material-icons clear-field-icon"
            onMouseDown={handleMouseDown}
            onClick={clearSearchField}
          >
            close
          </span>
        )}
      </div>
      <CustomButton
        type="submit"
        onClick={handleSubmit}
        id="search-button"
        name="submit"
        icon="search"
      />
    </form>
  );
};

export default SearchField;
