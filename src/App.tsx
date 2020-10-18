import React, { useState } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import UserContainer, { User } from "./UserContainer";
import callApi from "./callApi";

const apiUrl = "https://randomuser.me/api/";

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [{ error, message }, setError] = useState({
    error: false,
    message: "",
  });
  const getUser = async () => {
    setLoading(true);
    const response = await callApi<{ results: [] }>(apiUrl);
    console.log("response :>> ", response);
    if (response instanceof Error) {
      setLoading(false);
      return setError({ error: true, message: response.message });
    }
    // detta känns lite som antipattern att ha många setState i rad för jag har jobbat mer med actions och dispatch än hooks state
    // men tror react batchar dom så det inte blir för många rerenders? Så detta borde vara okej ändå
    setUsers(response.results);
    setError({ error: false, message: "" });
    setLoading(false);
  };

  return (
    <div className="App">
      <Button onClick={() => getUser()}>GetUser</Button>
      {loading && <div>loading</div>}
      {error && <div>{message}</div>}
      {users.length > 0 &&
        users.map((user) => {
          return <UserContainer key={user.id.value} user={user} />;
        })}
    </div>
  );
}

export default App;
