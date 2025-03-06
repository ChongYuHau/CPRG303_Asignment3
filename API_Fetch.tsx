import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Image source={require("./assets/funfactlogo.png")} style={styles.logo}/>

            <Text style={styles.title}>Enter a Date for a Fun Fact</Text>

            {/* Month Input */}
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter Month (1-12)"
                value={month}
                onChangeText={setMonth}
                placeholderTextColor="#444"
            />

            {/* Day Input */}
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter Day (1-31)"
                value={day}
                onChangeText={setDay}
                placeholderTextColor="#444"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#ff4e50" />
            ) : (
                fact && (
                    <View style={styles.factContainer}>
                        <Text style={styles.factText}>{fact}</Text>
                    </View>
                )
            )}
        </View>
        </TouchableWithoutFeedback>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#87CEFA', // Sky blue background
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2d3436',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 3, // Increased border thickness for better visibility
        borderColor: '#00008B', // Dark Blue Border
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 18,
        marginBottom: 15,
        backgroundColor: '#fff',
        textAlign: 'center',
        color: '#2d3436', // Dark gray text
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    factContainer: {
        marginTop: 20,   
        marginLeft: 30,  
        marginRight: 30, 
        backgroundColor: '#00cec9', // Bright cyan
        padding: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#0984e3', // Dark blue border
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    factText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default NumbersFactScreen;
