import React, { useEffect } from "react";
import { Authors } from "../components/Authors";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../Store/actions";

const AuthorsView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
    return () => {
      console.log("AuthorsView is being unmounted");
    };
  }, [dispatch]);

  return <Authors />;
};

export default AuthorsView;
