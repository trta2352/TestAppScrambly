import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  SafeAreaView,
} from 'react-native';
import { useDataContext } from '../../core/contexts/useDataContext';
import { Colors } from '../../assets/styles/colors';
import PostList from '../components/lists/PostList';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen: React.FC = () => {
  const { setAppError, posts, isLoading, loadPosts } = useDataContext();
  const [openPostID, setOpenPostID] = useState<number | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.red,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 24,
            alignSelf: 'flex-end',
            marginRight: 16,
            marginBottom: 8,
          }}
          onPress={() => {
            setAppError('This is a test error for the overlay.');
          }}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
            Test Error Overlay
          </Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Latest Posts</Text>
        <PostList
          posts={posts}
          isLoading={isLoading}
          onRefresh={() => loadPosts(true)}
          openPostId={openPostID}
          setOpenPostId={setOpenPostID}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
});

export default HomeScreen;
