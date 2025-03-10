import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { getProfile, logout } from "../../utils/storage";

export default function ProfileScreen({ navigation }: any) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile();
      setProfile(data);
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>Welcome, {profile?.username}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
