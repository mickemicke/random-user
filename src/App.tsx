import React, { useState } from "react";
import "./App.css";
import {
  Button,
  List,
  ListItem,
  Container,
  CircularProgress,
  Paper,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import UserContainer, { User } from "./UserContainer";
import callApi from "./callApi";

const apiUrl = "https://randomuser.me/api/";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// hade inte provat denna syntax/hook förut, väldigt cool!
// antar att man inte använder css filen så mycket då?
// eller har man kvar den för sina custom divar som inte är material-ui components
const useStyles = makeStyles({
  paperRoot: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = React.useState(false);
  const [{ error, message }, setError] = useState({
    error: false,
    message: "",
  });
  const classes = useStyles();

  const getUser = async () => {
    setLoading(true);
    const response = await callApi<{ results: [] }>(apiUrl);
    console.log("response :>> ", response);
    if (response instanceof Error) {
      setLoading(false);
      setOpen(true);
      return setError({ error: true, message: response.message });
    }
    // detta känns lite som antipattern att ha många setState i rad för jag har jobbat mer med actions och dispatch än hooks state
    // men tror react batchar dom så det inte blir för många rerenders? Så detta borde vara okej ändå
    setUsers([...users, ...response.results]);
    setError({ error: false, message: "" });
    setLoading(false);
  };
  const removeUser = (id: string) =>
    setUsers(users.filter((user) => user.cell !== id));

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container className="App">
      <Paper elevation={0} className={classes.paperRoot}>
        <Button variant="contained" color="primary" onClick={() => getUser()}>
          Get User
        </Button>
        {loading && <CircularProgress size="2em" />}
      </Paper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Could not get another user. Please try again. Error: {message}
        </Alert>
      </Snackbar>

      <List
        children={
          users.length > 0 &&
          users.map((user) => {
            return (
              <ListItem disableGutters alignItems="center" key={user.cell}>
                <UserContainer
                  user={user}
                  removeUser={removeUser}
                />
              </ListItem>
            );
          })
        }
      />
    </Container>
  );
}

export default App;
