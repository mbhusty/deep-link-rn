import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await resp.json();
    setData(data);
  };

  //on first fetch data.
  useEffect(() => {
    getData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>List items</ThemedText>
      {data && (
        <View>
          {data.map((item) => (
            <Link
              href={{
                pathname: '/details/[id]',
                params: { id: item.id },
              }}
              key={item.id}
            >
              <View
                style={{
                  borderColor: '#000',
                  borderWidth: 2,
                  margin: 5,
                  padding: 5,
                }}
              >
                <Text>{item.id}</Text>
                <Text>Name: {item.name}</Text>
                <Text>Email: {item.email}</Text>
              </View>
            </Link>
          ))}
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
