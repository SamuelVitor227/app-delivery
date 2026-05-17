import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <MaterialIcons name="search" size={48} color="#deff9a" />
          </View>
          <Text style={styles.title}>Buscar</Text>
          <Text style={styles.subtitle}>Em breve</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  safeArea: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 8,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 14, color: '#6b7280' },
});
