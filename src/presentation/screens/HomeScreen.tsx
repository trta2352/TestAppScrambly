import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, LayoutAnimation, TouchableOpacity } from 'react-native';
import { BACKEND_BASE_URL } from 'react-native-dotenv';
import { useDataContext } from '../../core/contexts/useDataContext';
import { Colors } from '../../assets/styles/colors';

const HomeScreen: React.FC = () => {
  const { posts } = useDataContext();

  const [openPostId, setOpenPostId] = useState<number | null>(null);

  const togglePost = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenPostId(openPostId === id ? null : id);
  };

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        const isOpen = openPostId === item.id;
        return (
          <View style={styles.postContainer}>
            <TouchableOpacity
              onPress={() => togglePost(item.id)}
              style={styles.header}>
              <Text style={styles.title}>
                #{item.id} - {item.title}
              </Text>
              <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {isOpen && <Text style={styles.body}>{item.body}</Text>}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 16,
  },
  postContainer: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  arrow: {
    fontSize: 16,
    alignSelf: 'center',
  },
  body: {
    marginTop: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default HomeScreen;
