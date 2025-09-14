import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { getHistory } from '../utils/db';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory((data) => {
      setHistory(data || []); // safeguard in case null/undefined
    });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={{ color: '#888', fontSize: 12 }}>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.disease}>
          {item.disease} {item.confidence ? `(${item.confidence})` : ''}
        </Text>
        <Text style={styles.advice}>{item.advice}</Text>
        <Text style={styles.date}>
          {item.date ? new Date(item.date).toLocaleString() : 'Unknown date'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnosis History</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>No history yet. Run a diagnosis to see results here.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  empty: { textAlign: 'center', color: '#666', marginTop: 20, fontSize: 16 },
  card: { flexDirection: 'row', marginBottom: 15, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  placeholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' },
  textContainer: { flex: 1 },
  disease: { fontSize: 16, fontWeight: 'bold' },
  advice: { fontSize: 14, color: '#333' },
  date: { fontSize: 12, color: 'gray', marginTop: 4 },
});
