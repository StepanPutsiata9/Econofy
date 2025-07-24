import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,

} from 'react-native';

import {styles} from "./MoneyInput.ts"
type IMoneyInputProps={
    amount:string,
    setAmount:(num:string|any)=>void
}
const MoneyInput = ({amount,setAmount}:IMoneyInputProps) => {

const handleChange = (value: string) => {

  if (/^\d*[,.]?\d{0,2}$/.test(value) || value === "") {
    const normalizedValue = value.replace(',', '.');
    setAmount(normalizedValue);
  }
};


  const increment = () => {
    setAmount((prev: any) => String(Number(prev) + 50));
  };

  const decrement = () => {
    if (Number(amount) > 0) {
      setAmount((prev: any) => String(Number(prev) - 50));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите сумму:</Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={'white'}
        />
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.currency}>BYN</Text>
    </View>
  );
};



export default MoneyInput;
