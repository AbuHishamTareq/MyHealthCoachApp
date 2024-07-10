import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from './contexts/AuthContext';
import { loadUser } from './services/AuthService';
import { useState, useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContainer } from './containers/AppContainer';
import TabNavigation from './app/Navigations/TabNavigation';



export default function App() {
  const [user, setUser] = useState();
  const [onboarded, setOnboarded] = useState();

  useEffect(() => {
    async function getStorage() {
      const onboarded:any = await AsyncStorage.getItem('ONBOARD');
      setOnboarded(JSON.parse(onboarded));
    }
     
    getStorage();
  }, []);

  useEffect(()=> {
    async function runEffect() {
      try {
        const user = await loadUser();
        setUser(user);
      } catch(e) {} 
    }

    runEffect();
  }, []);

  return (
    <RootSiblingParent>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? (
            <> 
              <TabNavigation />
            </>
          ) : (
            <> 
              <AppContainer onboarded={onboarded} />
            </>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </RootSiblingParent>
  );
}
