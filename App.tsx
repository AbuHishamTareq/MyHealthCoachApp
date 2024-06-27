import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
import Login from './app/screen/Login';
import StackNavigation from './app/Navigations/StackNavigation';

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigation />
        {/*<TabNavigation />*/}
      </NavigationContainer>
  );
}
