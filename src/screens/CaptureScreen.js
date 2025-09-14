import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CaptureScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('📸 Captured image:', photo.uri);
      navigation.navigate('Result', { imageUri: photo.uri });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={cameraRef} />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureText}>📷 Capture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 50,
  },
  captureText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
