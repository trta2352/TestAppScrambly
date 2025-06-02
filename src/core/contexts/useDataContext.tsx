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
  appError: string | null;
  setAppError: (error: string) => void;
  loadPosts: (override: boolean) => void;
};

const DataContext = createContext<DataContextType>({
  isLoading: false,
  posts: [],
  savePosts: () => {},
  appError: null,
  setAppError: () => {},
  loadPosts: () => {},
});

export const useDataContext = (): DataContextType => useContext(DataContext);

const DataProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appError, setAppError] = useState<string | null>(null);

  const savePosts = async (newPosts: Post[]) => {
    try {
      await AsyncStorage.setItem(DB_POSTS, JSON.stringify(newPosts));
    } catch (error) {
      console.error('Failed to save posts:', error);
    }
  };

  const loadPosts = async (override: boolean) => {
    try {
      setIsLoading(true);
      const postsString = await AsyncStorage.getItem(DB_POSTS);

      if (override || !postsString) {
        const posts = await NetworkService.shared.getPosts();
        setPosts(posts);
        savePosts(posts);
      } else {
        setPosts(JSON.parse(postsString));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setIsLoading(false);
      if (override) {
        setAppError('Failed to load posts');
      }
    }
  };

  useEffect(() => {
    loadPosts(false);
  }, []);

  return (
    <DataContext.Provider
      value={{
        posts,
        savePosts: savePosts,
        isLoading,
        appError,
        setAppError,
        loadPosts,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
