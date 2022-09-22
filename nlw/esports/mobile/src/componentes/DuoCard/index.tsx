import { TouchableOpacity, View, Text } from 'react-native';
import { GameController } from 'phosphor-react-native'

import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';
import { THEME } from '../../theme';

export interface DuoCardPropos {
  
    id: string;
    name: string;
    yearsPlaying: number;
    weekDay: string;
    hourEnd: string;
    hourStart: string;
    useVoice: Boolean;
} 

interface Props {
    data: DuoCardPropos;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo 
                label="Nickname:"
                value={data.name}            
            />
            <DuoInfo 
                label="Joga a:"
                value={`${data.yearsPlaying} ano(s)`}           
            />
            <DuoInfo 
                label="Disponibilidade:"
                value={`${data.weekDay.length} dias(s) por semana \u2022 Das ${data.hourStart} às ${data.hourEnd}`}     
            />
            <DuoInfo 
                label="Chamada de áudio"
                value={data.useVoice ? "Sim" : "Não"} 
                colorValue={data.useVoice ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}           
            />

            <TouchableOpacity
                style={styles.button}
                onPress={onConnect}
            >
                <GameController
                color={THEME.COLORS.TEXT}
                size={20}
                />
                <Text style={styles.buttonTitle}>Conectar</Text>
            </TouchableOpacity>
        </View>
    );
}