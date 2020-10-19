export interface User {
  name: {
    [key: string]: string;
  };
  email: string;
  phone: string;
  picture: {
    [key: string]: string;
  };
  location: {
    [key: string]: any; // string | number funkade inte, lite oklart hur man får flera typer i ett object?
  };
};
