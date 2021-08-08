import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, LinearProgress } from "@material-ui/core";
import { Authors } from "../components/Authors";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../Store/actions";
import { RootState } from "../Store/store";

const AuthorsView: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const notification = useSelector(
    (state: RootState) => state.notifications.notification
  );

  useEffect(() => {
    if (notification !== null) {
      if (notification.lastOp === "GET_AUTHORS") {
        setLoading(false);
      }
    }
  }, [notification]);

  useEffect(() => {
    setLoading(true);
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
      {loading ? <LinearProgress /> : <Authors />}
    </Container>
  );
};

export default AuthorsView;
