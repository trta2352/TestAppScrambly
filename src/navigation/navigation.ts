import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';

export const useStackNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
