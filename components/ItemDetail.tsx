import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const ItemDetail = ({ itemId  }) => {
    const [wine, setWine] = useState();
    const [winery, setWinery] = useState();
    const [location, setLocation] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        getData();
    }, [itemId]);

    const getData = async () => {
        await fetch(`https://api.sampleapis.com/wines/reds/${itemId}`)
            .then((res) => res.json())
            .then((response) => {
                setWine(response.wine);
                setWinery(response.winery);
                setLocation(response.location);
                setImage(response.image);
            });
    }

    if (!itemId) {
        return (
          <View style={styles.container}>
            <Text>Item not found</Text>
          </View>
        );
      }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item Detail</Text>

            <Text style={styles.label}>ID</Text>
            <Text style={styles.value}>{itemId}</Text>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{wine}</Text>

            <Text style={styles.label}>Winery</Text>
            <Text style={styles.value}>{winery}</Text>

            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{location}</Text>

            <Image source={{ uri: image }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#888',
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12
    },
    image: {
        marginTop: 10,
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
});

export default ItemDetail;
