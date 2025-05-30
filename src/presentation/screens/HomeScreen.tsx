import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import { useDataContext } from '../../core/contexts/useDataContext';
import { Colors } from '../../assets/styles/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen: React.FC = () => {
  const { posts } = useDataContext();
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  const togglePost = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenPostId(openPostId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Latest Posts</Text>
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
                style={styles.header}
                activeOpacity={0.7}>
                <Text style={styles.title}>
                  #{item.id} - {item.title}
                </Text>
                <Text style={styles.arrow}>{isOpen ? '−' : '+'}</Text>
              </TouchableOpacity>
              {isOpen && <Text style={styles.body}>{item.body}</Text>}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || '#FAFAFA',
    paddingTop: 24,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 8,
    color: '#222',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  arrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#888',
  },
  body: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default HomeScreen;
