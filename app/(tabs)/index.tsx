import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const categories = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Desserts', icon: '🍰' },
];

const restaurants = [
  {
    id: 1,
    name: "Luigi's Pizzeria",
    rating: '4.8',
    time: '30-45 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 2,
    name: 'Smash Burger Joint',
    rating: '4.6',
    time: '15-25 min',
    image: 'https://images.unsplash.com/photo-1633424234673-c8cd0f4df77b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 3,
    name: 'Tokyo Sushi Bar',
    rating: '4.9',
    time: '40-55 min',
    image: 'https://images.unsplash.com/photo-1730049952532-54cf58af3235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <MaterialIcons name="location-on" size={18} color="#deff9a" />
            </View>
            <View>
              <Text style={styles.deliveryLabel}>Delivery to</Text>
              <Text style={styles.locationText}>Belo Horizonte</Text>
            </View>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80' }}
            style={styles.avatar}
          />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Search */}
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              placeholder="Search for food or restaurants"
              placeholderTextColor="#6b7280"
              style={styles.searchInput}
            />
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Explore Categories</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((cat, i) => (
                <View key={i} style={styles.categoryItem}>
                  <TouchableOpacity style={styles.categoryBox}>
                    <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                  </TouchableOpacity>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Popular Restaurants */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            {restaurants.map((r) => (
              <View key={r.id} style={styles.restaurantCard}>
                <Image source={{ uri: r.image }} style={styles.restaurantImage} />
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={12} color="#deff9a" />
                  <Text style={styles.ratingText}>{r.rating}</Text>
                </View>
                <View style={styles.restaurantInfo}>
                  <View>
                    <Text style={styles.restaurantName}>{r.name}</Text>
                    <View style={styles.timeRow}>
                      <MaterialIcons name="access-time" size={14} color="#9ca3af" />
                      <Text style={styles.timeText}>{r.time}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/cart')}>
                    <Text style={styles.addBtnText}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryLabel: { fontSize: 11, color: '#9ca3af', fontWeight: '500' },
  locationText: { fontSize: 13, color: '#fff', fontWeight: '600' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24, gap: 32 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', fontSize: 14 },
  section: { gap: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  seeAll: { fontSize: 13, color: '#deff9a', fontWeight: '600' },
  categoriesScroll: { gap: 16, paddingRight: 4 },
  categoryItem: { alignItems: 'center', gap: 8 },
  categoryBox: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  categoryEmoji: { fontSize: 36 },
  categoryName: { fontSize: 13, color: '#d1d5db', fontWeight: '500' },
  restaurantCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 4,
  },
  restaurantImage: { width: '100%', height: 192 },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  restaurantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  restaurantName: { fontSize: 17, fontWeight: '700', color: '#fff', marginBottom: 4 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 13, color: '#9ca3af' },
  addBtn: {
    backgroundColor: '#deff9a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  addBtnText: { color: '#121212', fontWeight: '700', fontSize: 13 },
});
