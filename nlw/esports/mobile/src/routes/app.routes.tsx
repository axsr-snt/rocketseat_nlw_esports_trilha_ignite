import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home';
import { Game } from '../screens/Game';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes(){
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" //nome da rota.
            component={Home}    //componente da rota.
            //options={{ headerShown: false }} //Configuração dos componentes.
            />

            <Screen name="game" //nome da rota.
            component={Game}  //componente da rota.
            />
        </Navigator>
    )
}
