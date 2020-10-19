import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = {
  picture: string;
  name: string;
  phone: string;
  email: string;
  address: {
    city: string;
    country: string;
    street: {
      streetNumber: number;
      name: string;
    };
  };
  className: string;
};

export function formatAddress(
  city: string,
  country: string,
  street: { streetNumber: number; name: string }
): string {
  return `${street.name} ${street.streetNumber}, ${city}, ${country}`;
}

function UserCard({
  picture,
  name,
  phone,
  email,
  address,
  className,
}: Props) {
  const formattedAddress = formatAddress(
    address.city,
    address.country,
    address.street
  );
  return (
    <Card className={className}>
      <CardHeader
        avatar={<Avatar alt={name} src={picture} />}
        title={name}
      />
      <CardContent>
        <List dense>
          <ListItem key="phone">
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={phone} />
          </ListItem>
          <ListItem key="email">
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={email} />
          </ListItem>
          <ListItem key="address">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={formattedAddress} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default UserCard;
