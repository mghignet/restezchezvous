import { Button, View } from "react-native";
import { generateForm } from "./form-service";
import React from "react";

export interface UserInfo {
  firstName: String;
  lastName: String;
}

export default function Form() {
  const userInfo: UserInfo = {
    firstName: "Jean",
    lastName: "Valjean"
  };

  return (
    <View>
      <Button onPress={() => { alert(generateForm(userInfo)); }} title="Générer mon attestation" />
    </View>
  );
}
