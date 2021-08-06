import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container } from "@material-ui/core";
import { Authors } from "../components/Authors";
import { useDispatch } from "react-redux";
import { fetchAuthors } from "../Store/actions";

const AuthorsView: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const renderHelmet = () => {
    return (
      <Helmet>
        <title>{`Authors | Kitaabghar`}</title>
        <meta name="description" content={`List of authors in the library`} />
      </Helmet>
    );
  };

  return (
    <Container maxWidth="lg">
      {renderHelmet()}
      <Authors />
    </Container>
  );
};

export default AuthorsView;
