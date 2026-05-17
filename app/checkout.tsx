import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

type PaymentId = 'credit' | 'pix' | 'cash';

const PAYMENT_OPTIONS: { id: PaymentId; label: string; icon: React.ComponentProps<typeof MaterialIcons>['name'] }[] = [
  { id: 'credit', label: 'Cartão de Crédito', icon: 'credit-card' },
  { id: 'pix', label: 'PIX (Rápido)', icon: 'flash-on' },
  { id: 'cash', label: 'Dinheiro', icon: 'payments' },
];

function PaymentOption({
  title,
  icon,
  selected,
  onPress,
}: {
  title: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
    >
      <View style={[styles.paymentIconWrap, selected && styles.paymentIconSelected]}>
        <MaterialIcons name={icon} size={20} color={selected ? '#deff9a' : '#9ca3af'} />
      </View>
      <Text style={[styles.paymentLabel, selected && styles.paymentLabelSelected]}>{title}</Text>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
  );
}

export default function CheckoutScreen() {
  const [payment, setPayment] = useState<PaymentId>('pix');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Finalizar Pedido</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {/* Delivery Address */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ENDEREÇO DE ENTREGA</Text>
            <View style={styles.addressCard}>
              <View style={styles.addressIcon}>
                <MaterialIcons name="location-on" size={22} color="#deff9a" />
              </View>
              <View style={styles.addressInfo}>
                <Text style={styles.addressStreet}>Rua A, 123</Text>
                <Text style={styles.addressCity}>Glória, BH</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.editBtn}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>MÉTODO DE PAGAMENTO</Text>
            <View style={styles.paymentList}>
              {PAYMENT_OPTIONS.map(opt => (
                <PaymentOption
                  key={opt.id}
                  title={opt.label}
                  icon={opt.icon}
                  selected={payment === opt.id}
                  onPress={() => setPayment(opt.id)}
                />
              ))}
            </View>
          </View>

          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>RESUMO DA COMPRA</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel2}>Subtotal</Text>
                <Text style={styles.summaryValue}>R$ 71,00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel2}>Entrega</Text>
                <Text style={styles.freeText}>Grátis</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>R$ 71,00</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* CTA fixo no rodapé */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity style={styles.ctaBtn}>
            <Text style={styles.ctaBtnText}>Confirmar e Pagar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 20, fontWeight: '600', color: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, gap: 32, paddingTop: 8 },
  section: { gap: 12 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: 1.5,
    paddingLeft: 4,
  },
  addressCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addressIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(222,255,154,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(222,255,154,0.2)',
  },
  addressInfo: { flex: 1 },
  addressStreet: { fontSize: 15, fontWeight: '600', color: '#fff' },
  addressCity: { fontSize: 13, color: '#9ca3af', marginTop: 2 },
  editBtn: { color: '#deff9a', fontSize: 13, fontWeight: '700' },
  paymentList: { gap: 12 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  paymentOptionSelected: {
    borderColor: '#deff9a',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  paymentIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconSelected: {
    backgroundColor: 'rgba(222,255,154,0.2)',
  },
  paymentLabel: { flex: 1, fontSize: 15, color: '#d1d5db', fontWeight: '500' },
  paymentLabelSelected: { color: '#fff' },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: '#deff9a' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#deff9a' },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 24,
    gap: 16,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel2: { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
  summaryValue: { fontSize: 14, color: '#fff', fontWeight: '500' },
  freeText: { fontSize: 14, color: '#deff9a', fontWeight: '500' },
  divider: { height: 1, backgroundColor: 'rgba(222,255,154,0.2)' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  totalLabel: { fontSize: 16, fontWeight: '600', color: '#e5e7eb' },
  totalValue: { fontSize: 30, fontWeight: '900', color: '#deff9a' },
  ctaContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  ctaBtn: {
    backgroundColor: '#deff9a',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaBtnText: { color: '#121212', fontWeight: '800', fontSize: 17, letterSpacing: 0.5 },
});
