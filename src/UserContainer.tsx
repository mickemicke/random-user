import React from "react";
import UserCard from "./UserCard";

// denna interfacen kanske borde vara i en type definitions fil nånstans?
// lite dålig koll på typescript :D
// men inte så nice att ha den rakt i samma fil iallafall
// blir en väldigt svårläst komponent
export interface User {
  gender: string;
  name: {
    [key: string]: string;
  };
  location: {
    [key: string]: any; // string | number funkade inte, lite oklart hur man får flera typer i ett object?
  };
  email: string;
  login: {
    [key: string]: string;
  };
  dob: {
    [key: string]: any; // string | number funkade inte, lite oklart hur man får flera typer i ett object?
  };
  registered: {
    [key: string]: string;
  };
  phone: string;
  cell: string;
  id: {
    [key: string]: any; // string | number funkade inte, lite oklart hur man får flera typer i ett object?
  };
  picture: {
    [key: string]: string;
  };
  nat: string;
}

type Props = {
  user: User;
  removeUser: (id: string) => void;
};

function UserContainer({ user, removeUser }: Props) {
  const { name, phone, picture, email, location, cell } = user;
  return (
    <UserCard
      className="user-container"
      name={`${name.first} ${name.last}`}
      email={email}
      phone={phone}
      picture={picture.thumbnail}
      address={{
        city: location.city,
        country: location.country,
        street: {
          streetNumber: location.street.number,
          name: location.street.name,
        },
      }}
      /*
        här är en liten fuling, använde id: { value } som id förut, men ibland får man användare med value: null.
        Chansar bara på att "cell" är genomgående unik, men beror väl på hur många användare man tar fram kanske
      */
      id={cell}
      removeUser={removeUser}
    />
  );
}

export default UserContainer;
