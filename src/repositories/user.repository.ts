import { User } from "../models/user";
import AsyncStorage from "@react-native-community/async-storage";

export async function saveUser(user: User) {
  return AsyncStorage.setItem('user', JSON.stringify(user));
}

export async function getUser() {
  const user = await AsyncStorage.getItem('user');
  // @ts-ignore
  return JSON.parse(user);
}

// For debugging use only
async function deleteUser() {
  return AsyncStorage.removeItem('user');
}
