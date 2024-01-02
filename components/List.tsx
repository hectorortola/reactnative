import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';

type RootStackParamList = {
    Home: undefined;
    ItemDetail: { itemId: number };
};

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface ListProps {
    navigation: ListScreenNavigationProp;
}

const List: React.FC<ListProps> = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await fetch('https://api.sampleapis.com/wines/reds')
            .then((res) => res.json())
            .then((response) => {
                setData(response);
            });
    }

    const handleItemClick = (itemId: number) => {
        navigation.navigate('ItemDetail', { itemId });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Red Wine List</Text>
            </View>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleItemClick(item.id)} style={styles.rowContainer}>
                            <View style={styles.row}>
                                <View style={styles.imageColumn}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </View>
                                </View>
                                <View style={styles.infoColumn}>
                                    <Text style={styles.label}>ID</Text>
                                    <Text style={styles.value}>{item.id}</Text>
                                    <Text style={styles.label}>Wine</Text>
                                    <Text style={styles.value}>{item.wine}</Text>
                                    <Text style={styles.label}>Winery</Text>
                                    <Text style={styles.value}>{item.winery}</Text>
                                    <Text style={styles.label}>Location</Text>
                                    <Text style={styles.value}>{item.location}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
            ) : (
                <Text style={styles.noWinesText}>No wines found! Maybe I'm drunk... 🥴</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    titleContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    },
    cell: {
        flex: 1,
        marginRight: 8,
    },
    label: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noWinesText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    }, imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    rowContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageColumn: {
        marginRight: 16,
    },
    infoColumn: {
        flex: 1,
    },
});

export default List;
