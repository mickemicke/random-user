import React, { useState } from "react";
import "./App.css";
import {
  Button,
  Container,
  CircularProgress,
  Paper,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import callApi from "./callApi";
import UserCard from "./UserCard";
import { UserInterface } from "./UserInterface";

const apiUrl = "https://randomuser.me/api/";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// hade inte provat denna syntax/hook förut, väldigt cool!
// antar att man inte använder css filen så mycket då?
// eller har man kvar den för sina custom divar som inte är material-ui components
const useStyles = makeStyles({
  app: {
    minHeight: "800px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  userContainer: {
    minHeight: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserInterface>();
  const [open, setOpen] = React.useState(false);
  const [{ error, message }, setError] = useState({
    error: false,
    message: "",
  });
  const classes = useStyles();

  const getUser = async () => {
    setLoading(true);
    const response = await callApi<{ results: UserInterface[] }>(apiUrl);
    console.log("response :>> ", response);
    if (response instanceof Error) {
      setLoading(false);
      setOpen(true);
      return setError({ error: true, message: response.message });
    }
    // detta känns lite som antipattern att ha många setState i rad för jag har jobbat mer med actions och dispatch än hooks state
    // men tror react batchar dom så det inte blir för många rerenders? Så detta borde vara okej ändå
    setUser(response.results[0]);
    setError({ error: false, message: "" });
    setOpen(false);
    setLoading(false);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container className={classes.app}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Could not get another user. Please try again. Error: {message}
        </Alert>
      </Snackbar>

      <Paper elevation={0} className={classes.userContainer}>
        {loading && <CircularProgress size="4em" />}
        {(user && !loading) && (
          <UserCard
            className={classes.userContainer}
            name={`${user.name.first} ${user.name.last}`}
            email={user.email}
            phone={user.phone}
            picture={user.picture.thumbnail}
            address={{
              city: user.location.city,
              country: user.location.country,
              street: {
                streetNumber: user.location.street.number,
                name: user.location.street.name,
              },
            }}
          />
        )}
      </Paper>
      <Paper elevation={0} className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={() => getUser()}>
          Get User
        </Button>
      </Paper>
    </Container>
  );
}

export default App;
