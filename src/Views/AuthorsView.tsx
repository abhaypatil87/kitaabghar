import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Authors } from "../components/Authors";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../Store/actions";

const AuthorsView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
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
