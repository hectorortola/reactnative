import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './DarkModeToggle';


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
    const { isDarkMode } = useTheme();

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
    
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            padding: 16,
            backgroundColor: isDarkMode ? 'black' : '#fff',
        },
        titleContainer: {
            alignItems: "center",
            marginTop: 20,
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            color: isDarkMode ? '#fff' : '#000',
        },
        flatlist: {
            backgroundColor: isDarkMode ? '#000' : '#fff',
        },
        rowContainer: {
            marginBottom: 16,
            padding: 16,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: isDarkMode ? '#fff' : '#ddd',
            backgroundColor: isDarkMode ? '#ddd' : '#fff',
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
        imageContainer: {
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
        label: {
            fontSize: 15,
            color: '#888',
            marginBottom: 4,
        },
        value: {
            fontSize: 16,
        },
        noWinesText: {
            fontSize: 16,
            textAlign: 'center',
            marginTop: 50,
            color: '#666',
        },
    });

    return (
        <ScrollView style={styles.container}>
            <DarkModeToggle />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Red Wine List</Text>
            </View>
            {data.length > 0 ? (
                <FlatList
                    style={styles.flatlist}
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

export default List;
