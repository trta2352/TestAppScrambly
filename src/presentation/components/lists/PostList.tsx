import React, { memo } from 'react';
import {
  View,
  Text,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Colors } from '../../../assets/styles/colors';

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostListProps = {
  posts: Post[];
  isLoading: boolean;
  onRefresh: () => void;
  openPostId: number | null;
  setOpenPostId: (id: number | null) => void;
};

const PostListComponent: React.FC<PostListProps> = ({
  posts,
  isLoading,
  onRefresh,
  openPostId,
  setOpenPostId,
}) => {
  const togglePost = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenPostId(openPostId === id ? null : id);
  };

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={posts}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts found</Text>
        </View>
      }
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
  );
};

const styles = StyleSheet.create({
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
    color: Colors.darkBlue,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.darkBlue,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});

const PostList = memo(PostListComponent);

export default PostList;
