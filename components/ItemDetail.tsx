import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ItemDetail = ({ itemId }) => {
    const { isDarkMode } = useTheme();

    const [wine, setWine] = useState(null);
    const [winery, setWinery] = useState(null);
    const [location, setLocation] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        getData();
    }, [itemId]);

    const getData = async () => {
        try {
            const response = await fetch(`https://api.sampleapis.com/wines/reds/${itemId}`);
            const data = await response.json();

            setWine(data.wine);
            setWinery(data.winery);
            setLocation(data.location);
            setImage(data.image);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!itemId) {
        return (
            <View style={styles.container}>
                <Text>Item not found</Text>
            </View>
        );
    }

    const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
    const textStyle = isDarkMode ? styles.darkText : styles.lightText;
    const titleStyle = isDarkMode ? styles.darkTitle : styles.lightTitle;

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.title, titleStyle]}>Item Detail</Text>
            {renderDetail('ID', itemId, textStyle)}
            {renderDetail('Name', wine, textStyle)}
            {renderDetail('Winery', winery, textStyle)}
            {renderDetail('Location', location, textStyle)}
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
};

const renderDetail = (label: any, value: any, textStyle: any) => (
    <>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.text, textStyle]}>{value}</Text>
    </>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    darkTitle: {
        color: '#fff',
    },
    lightTitle: {
        color: '#000',
    },
    label: {
        fontSize: 16,
        color: '#888',
        marginBottom: 4,
    },
    text: {
        fontSize: 16,
    },
    image: {
        marginTop: 10,
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    lightContainer: {
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
    lightText: {
        color: '#000',
    },
    darkText: {
        color: '#fff',
    },
});

export default ItemDetail;
