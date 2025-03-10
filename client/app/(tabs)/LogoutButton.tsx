import React, { useContext } from "react";
import { Button } from "react-native";
import { AuthContext } from "../(context)/AuthContext";

const LogoutButton = () => {
  const auth = useContext(AuthContext);

  return <Button title="Logout" onPress={auth?.logout} />;
};

export default LogoutButton;
