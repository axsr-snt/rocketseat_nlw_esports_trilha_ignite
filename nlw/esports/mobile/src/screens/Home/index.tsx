import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Heading } from '../../componentes/Heading';
import { Background } from '../../componentes/Background';
import { GameCard, GameCardProps } from '../../componentes/GameCard';


import { styles } from "./styles";

export function Home() {

  const [games, setGames] =useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl});
  }

  useEffect(() => {
    fetch('http://192.168.18.3:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <Heading
            title="Encotre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />

          <FlatList 
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <GameCard 
                data={item}
                onPress= {() => handleOpenGame(item)} // arrow function é necessária quando a função chamada tem parametros. Caso não tenha parametro onPress={handleOpenGame()}
              />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.ContentList}
          />
      </SafeAreaView>
    </Background>
);
}