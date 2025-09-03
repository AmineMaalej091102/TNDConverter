import React, { useState } from "react"
import { View,  Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const convert = async () => {
    try {
      const res = await fetch(
        "https://api.apilayer.com/exchangerates_data/latest?base=TND&symbols=USD",
        {
          method: "GET",
          headers: {
            apikey: "uEyWsCc6SGauNOZYvMO097uVYHXKua4Y",
          },
        }
      );

      const data = await res.json();

      // Debugging
      console.log(data);

      if (data && data.rates) {
        const usdRate = data.rates.USD;

        const usd = (parseFloat(amount) * usdRate).toFixed(2);

        setResult(`${amount} TND = ${usd} USD`);
      } else {
        setResult("No rates found, check API response");
      }
    } catch (error) {
      console.error(error);
      setResult("Error fetching exchange rates");
    }
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