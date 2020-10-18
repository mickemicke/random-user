import React from "react";

export interface User {
  gender: string;
  name: {
    [key: string]: string;
  };
  location: {
    [key: string]: string;
  };
  email: string;
  login: {
    [key: string]: string;
  };
  dob: {
    [key: string]: string;
  };
  registered: {
    [key: string]: string;
  };
  phone: string;
  cell: string;
  id: {
    [key: string]: string;
  };
  picture: {
    [key: string]: string;
  };
  nat: string;
}

type Props = {
  user: User;
};

function UserContainer({ user }: Props) {
  console.log("props :>> ", user);
  return <div>{user.email}</div>;
}

export default UserContainer;
