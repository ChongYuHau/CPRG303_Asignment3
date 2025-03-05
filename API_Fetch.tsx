import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';

const NumbersFactScreen: React.FC = () => {
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = '4f9cfa0c32mshddaf6a7d2e742acp1e4932jsn4b0803ad3851';

    useEffect(() => {
        const monthNum = parseInt(month);
        const dayNum = parseInt(day);

        if (monthNum >= 1 && monthNum <= 12 && dayNum > 0 && isValidDate(monthNum, dayNum)) {
            fetchFact(monthNum, dayNum);
        }
    }, [month, day]);

    const isValidDate = (month: number, day: number): boolean => {
        const daysInMonth = new Date(2024, month, 0).getDate();
        return day > 0 && day <= daysInMonth;
    };

    const fetchFact = async (month: number, day: number) => {
        setLoading(true);
        try {
            const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, {
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
                }
            });
            const data = await response.text();
            setFact(data);
        } catch (error) {
            setFact('Failed to fetch fact. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter a Date for a Fun Fact!</Text>

            {/* Month Input */}
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter Month (1-12)"
                value={month}
                onChangeText={setMonth}
            />

            {/* Day Input */}
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter Day (1-31)"
                value={day}
                onChangeText={setDay}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                fact && <Text style={styles.fact}>{fact}</Text>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 20,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    fact: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
});

export default NumbersFactScreen;
