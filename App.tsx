import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const API_KEY = '4f9cfa0c32mshddaf6a7d2e742acp1e4932jsn4b0803ad3851';

export default function App() {
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [fact, setFact] = useState<string>('');

  useEffect(() => {
    if (month && day) {
      fetchFact();
    }
  }, [month, day]);

  const fetchFact = async () => {
    try {
      const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
      });

      const text = await response.text();
      setFact(text);
    } catch (error) {
      setFact('Error fetching data. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a Month and Day</Text>

      <TextInput
        style={styles.input}
        placeholder="Month (1-12)"
        keyboardType="numeric"
        maxLength={2}
        value={month}
        onChangeText={setMonth}
      />

      <TextInput
        style={styles.input}
        placeholder="Day (1-31)"
        keyboardType="numeric"
        maxLength={2}
        value={day}
        onChangeText={setDay}
      />

      {fact ? <Text style={styles.fact}>{fact}</Text> : <Text style={styles.placeholder}>Your fact will appear here.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center'
  },
  fact: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#ffeb3b',
    borderRadius: 8
  },
  placeholder: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888'
  }
});
