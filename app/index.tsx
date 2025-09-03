import React, { useState } from "react"
import { View,  Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [amount, setAmount] = useState("");
  const [base, setBase] = useState("TND") // base currency
  const [currency, setCurrency] = useState("USD"); // target Currency
  const [result, setResult] = useState<string | null>(null);

  const convert = async () => {
    try {
      const res = await fetch(
        `https://api.apilayer.com/exchangerates_data/latest?base=TND&symbols=${currency}`,
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
        const rate = data.rates[currency];
        const converted = (parseFloat(amount)*rate).toFixed(2);

        setResult(`${amount} ${base} = ${converted} ${currency}`);
      } else {
        setResult("No rates found, check API response");
      }
    } catch (error) {
      console.error(error);
      setResult("Error fetching exchange rates");
    }
  };
  
  const swapCurrencies = () => {
    setBase(currency);
    setCurrency(base);
    setResult(null) // reset result after swap 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💱 TND Converter</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder={`Enter amount in ${base}`}
        value={amount}
        onChangeText={setAmount}
      />
      <Picker
      selectedValue={currency}
      style={styles.picker}
      onValueChange={(itemValue) => setCurrency(itemValue)}>
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="GBP" value="GBP" />
        <Picker.Item label="CAD" value="CAD" />
        <Picker.Item label="JPY" value="JPY" />
        <Picker.Item label="TND" value="TND" />
      </Picker>
      <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
        <Text style={styles.swapText}>🔄 Swap</Text>
      </TouchableOpacity>
      <Button title ="Convert" onPress={convert} />
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20 
  },
  input: {
    borderWidth: 1, 
    padding: 10, 
    width: "80%", 
    marginBottom: 20, 
    borderRadius: 8 
  },
  result: { 
    fontSize: 18, 
    marginTop: 20, 
    fontWeight: "bold" 
  },
  picker: {
    height: 50, 
    width: 200, 
    marginBottom: 20, 
  },
  swapButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  swapText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});