import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const INITIAL_CART = [
  {
    id: 1,
    name: 'Hambúrguer Artesanal',
    price: 35.50,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    price: 45.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  },
  {
    id: 3,
    name: 'Batata Frita',
    price: 15.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  },
];

const fmt = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`;

export default function CartScreen() {
  const [items, setItems] = useState(INITIAL_CART);

  const updateQty = (id: number, delta: number) =>
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));

  const remove = (id: number) => setItems(items.filter(item => item.id !== id));

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = items.length > 0 ? 8.50 : 0;
  const total = subtotal + delivery;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.inner}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <MaterialIcons name="chevron-left" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Meu Carrinho</Text>
            <TouchableOpacity onPress={() => setItems([])}>
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Item List */}
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            {items.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
              </View>
            ) : (
              items.map(item => (
                <View key={item.id} style={styles.itemCard}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{fmt(item.price)}</Text>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => remove(item.id)} style={styles.trashBtn}>
                      <MaterialIcons name="delete-outline" size={18} color="#6b7280" />
                    </TouchableOpacity>
                    <View style={styles.qtyControl}>
                      <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
                        <MaterialIcons name="remove" size={14} color="#deff9a" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
                        <MaterialIcons name="add" size={14} color="#deff9a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          {/* Bottom Summary */}
          <View style={styles.bottom}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{fmt(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxa de Entrega</Text>
              <Text style={styles.summaryValue}>{fmt(delivery)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{fmt(total)}</Text>
            </View>
            <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/checkout')}>
              <Text style={styles.ctaBtnText}>Ir para o Pagamento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  safeArea: { flex: 1 },
  inner: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backBtn: { padding: 8, marginLeft: -8 },
  title: { fontSize: 20, fontWeight: '700', color: '#fff' },
  clearAll: { color: '#deff9a', fontSize: 13, fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, gap: 12, paddingBottom: 24 },
  emptyState: { alignItems: 'center', justifyContent: 'center', height: 192 },
  emptyText: { color: '#6b7280' },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    gap: 12,
  },
  itemImage: { width: 80, height: 80, borderRadius: 12 },
  itemInfo: { flex: 1, justifyContent: 'center', gap: 4 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#fff' },
  itemPrice: { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
  itemActions: { alignItems: 'flex-end', justifyContent: 'space-between', paddingVertical: 4 },
  trashBtn: { padding: 4 },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  qtyBtn: { padding: 6 },
  qtyText: { width: 24, textAlign: 'center', fontSize: 13, fontWeight: '700', color: '#fff' },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    gap: 12,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 15, color: '#9ca3af', fontWeight: '500' },
  summaryValue: { fontSize: 15, color: '#fff', fontWeight: '600' },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: { fontSize: 17, fontWeight: '700', color: '#fff' },
  totalValue: { fontSize: 20, fontWeight: '700', color: '#deff9a' },
  ctaBtn: {
    backgroundColor: '#deff9a',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaBtnText: { color: '#121212', fontWeight: '700', fontSize: 17 },
});
