import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Post } from '../models/Post';
import { DB_POSTS } from '../../utils/constants/DBConstants';
import NetworkService from '../services/NetworkService';

type DataContextType = {
  isLoading: boolean;
  posts: Post[];
  savePosts: (posts: Post[]) => void;
};

const DataContext = createContext<DataContextType>({
  isLoading: false,
  posts: [],
  savePosts: () => {},
});

export const useDataContext = (): DataContextType => useContext(DataContext);

const DataProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const savePosts = async (newPosts: Post[]) => {
    try {
      await AsyncStorage.setItem(DB_POSTS, JSON.stringify(newPosts));
    } catch (error) {
      console.error('Failed to save posts:', error);
    }
  };

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const postsString = await AsyncStorage.getItem(DB_POSTS);
      if (postsString) {
        setPosts(JSON.parse(postsString));
      } else {
        const posts = await NetworkService.shared.getPosts();
        setPosts(posts);
        savePosts(posts);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        posts,
        savePosts: savePosts,
        isLoading,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
