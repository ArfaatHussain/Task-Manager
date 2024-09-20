import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/redux/store';
import { StatusBar } from 'react-native'
export default function App() {
  return (
    <Provider store={store} >
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <AppNavigation />
      </SafeAreaProvider>
     </Provider>
  );
}

