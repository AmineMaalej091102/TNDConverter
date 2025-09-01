import React, { useState } from "react"
import { View,  Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    // Placeholder conversion (1TND = 0.3 USD)
    const usd = (parseFloat(amount) * 0.32).toFixed(2);
    setResult(`${amount} TND = ${usd} USD`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💱 TND Converter</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount in TND"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title ="Convert to USD" onPress={convert} />
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {borderWidth: 1, padding: 10, width: "80%", marginBottom: 20, borderRadius: 8 },
  result: { fontSize: 18, marginTop: 20, fontWeight: "bold" },
});