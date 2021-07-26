import React, { useEffect } from "react";
import { Authors } from "../components/Authors";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../Store/actions";
import { Helmet } from "react-helmet";

const AuthorsView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
    return () => {
      console.log("AuthorsView is being unmounted");
    };
  }, [dispatch]);

  const renderHelmet = () => {
    return (
      <Helmet>
        <title>{`Authors | Home Library`}</title>
        <meta name="description" content={`List of authors in the library`} />
      </Helmet>
    );
  };

  return (
    <>
      {renderHelmet()}
      <Authors />
    </>
  );
};

export default AuthorsView;
