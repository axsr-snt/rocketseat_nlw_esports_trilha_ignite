import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Background } from './src/componentes/Background';
import { Routes } from './src/routes';
import { Loading } from './src/componentes/Loading';

import './src/services/notificationConfig'; // dessa forma o conteudo do importe faz parte desse arquivo.
import { getPushNotificationsToken } from './src/services/getPushNotificationToken'
import { Subscription } from  'expo-modules-core'
import * as Notifications from 'expo-notifications';




export default function App() {
  const [fontsLoaded] =useFonts({
    Inter_400Regular,
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_900Black
  });

  const getPushNotificationsListener = useRef<Subscription>();
  const responsePushNotificationsListener = useRef<Subscription>();
  
  useEffect(() => {
    getPushNotificationsToken();
  });

  useEffect(() => {
    getPushNotificationsListener.current = Notifications.addNotificationResponseReceivedListener( notifications => {
      console.log(notifications);
    });
    
    responsePushNotificationsListener.current = Notifications.addNotificationResponseReceivedListener( response => {
      console.log(response);

    return () => {
      if(getPushNotificationsListener.current && responsePushNotificationsListener.current) {
        Notifications.removeNotificationSubscription(getPushNotificationsListener.current);
        Notifications.removeNotificationSubscription(responsePushNotificationsListener.current);
      }
    }
    });

  }, []);

  return(
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
};