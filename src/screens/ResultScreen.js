import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  // Safely extract params
  const imageUri = route?.params?.imageUri || null;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Simulate AI analysis delay
    const timer = setTimeout(() => {
      // Fake analysis result (to be replaced with LFM2-VL inference)
      const fakeResult = {
        disease: "Possible Eczema",
        confidence: "85%",
        advice: "Keep skin moisturized. Avoid harsh soaps. Seek dermatologist if it worsens."
      };
      setResult(fakeResult);
      setLoading(false);
    }, 2000);

    // Cleanup timer if screen unmounts early
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis Result</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={{ marginTop: 10, color: 'gray' }}>No image provided</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 20 }} />
      ) : (
        result && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Condition: {result.disease}</Text>
            <Text style={styles.resultText}>Confidence: {result.confidence}</Text>
            <Text style={styles.adviceText}>Advice: {result.advice}</Text>
          </View>
        )
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  image: { width: 250, height: 350, borderRadius: 10, marginVertical: 20 },
  resultBox: { marginTop: 20, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10 },
  resultText: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  adviceText: { fontSize: 14, fontStyle: 'italic', marginTop: 5 },
});
