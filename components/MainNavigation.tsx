import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListScreen from '../screens/ListScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const Stack = createStackNavigator();

const MainNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={ListScreen} />
                <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;
