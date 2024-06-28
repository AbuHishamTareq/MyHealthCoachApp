import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
import AuthContext from './contexts/AuthContext';
import { loadUser } from './services/AuthService';
import { useState, useEffect } from 'react';
import Login from './app/screen/Login';
import ForgetPassword from './app/screen/ForgetPassword';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  const [user, setUser] = useState();
  const [status, setState] = useState('Loading');

  useEffect(()=> {
    async function runEffect() {
      try {
        const user = await loadUser();
        setUser(user);
      } catch(e) {
        console.log('Failed to load user', e);
      } 

      setState('Idle');
    }

    runEffect();
  }, []);

  if(status === 'loading') {
    return console.log('Loading....');
  }

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
              <Login />
            </>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </RootSiblingParent>
  );
}
