import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <View>
      <Button title={`Dark Mode (${isDarkMode ? '☀️' : '🌙'})`} onPress={toggleDarkMode} />
    </View>
  );
};

export default DarkModeToggle;
