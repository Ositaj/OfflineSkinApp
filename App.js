import React, { useState, useEffect } from "react";
import { Button, View, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      // Request camera permission
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      // Request media library permission
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || galleryStatus !== "granted") {
        alert("Camera and gallery permissions are required!");
      }
    })();
  }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="📷 Take Photo" onPress={openCamera} />
      <Button title="🖼️ Pick from Gallery" onPress={openGallery} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
