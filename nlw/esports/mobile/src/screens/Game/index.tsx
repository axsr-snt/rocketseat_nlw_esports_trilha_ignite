import { useEffect, useState} from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'

import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';

import logoImg from '../../assets/logo-nlw-esports.png';
import { THEME } from '../../theme';
import { styles } from './styles';

import { Background } from '../../componentes/Background';
import { Heading } from '../../componentes/Heading';
import { DuoCard, DuoCardPropos } from '../../componentes/DuoCard';
import { DuoMatch } from '../../componentes/DuoMatch';
/*
Navegação in stack: quando as telas vão sendo empilhadas uma sobre a outra conforme são abertas para evitar o carregamento da anterior novamente quando a atual for aberta.
*/


export function Game () {
    const [duos, setDuos] = useState<DuoCardPropos[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;
    console.log(game);
    
    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscordUser(adsId: string){
        fetch(`http://192.168.18.3:3333/ads/${adsId}/discord`)
        .then(response => response.json())
        .then(data => setDiscordDuoSelected(data.discord));
    }

    useEffect(() => {
        fetch(`http://192.168.18.3:3333/games/${game.id}/ads`)
        .then(response => response.json())
        .then(data => setDuos(data));
      }, []);

    return(
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                    <Entypo
                        name="chevron-thin-left"
                        color={THEME.COLORS.CAPTION_400}
                        size={20} 
                    />
                    </TouchableOpacity>
                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />
                    <View style={styles.right}></View> 
                    {/* view utilizada para centralizar o logo, ela possui as mesmas dimensões do icone voltar.*/}
                    

                </View>
                
                <Image 
                    source={{ uri: game.bannerUrl}}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading 
                    title={game.title}
                    subtitle='Conecte-se e comece a jogar!'
                />
                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard 
                        data={item} 
                        onConnect={() => getDiscordUser(item.id)}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[duos.length > 0 ? styles.contentList :  styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios para esse jogo.
                        </Text>
                    )}
                />
                <DuoMatch 
                    visible={discordDuoSelected.length > 0} 
                    discord={discordDuoSelected}
                    onClose={() => setDiscordDuoSelected('')}
                />
            </SafeAreaView>    
        </Background>
    )
}