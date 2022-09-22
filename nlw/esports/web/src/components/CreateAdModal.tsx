import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios'; // axios é uma biblioteca alternativa ao fetch para requisições html.

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from  '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Check, GameController } from 'phosphor-react';

import { Input } from './Form/input';


interface Game {
    id: string;
    title: string;
}

export function CreateAdModal () {  
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoice, setUseVoice] = useState(false);
       
    useEffect(() => {
          axios('http://localhost:3333/games')
          .then(response => {setGames(response.data)})
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()
        
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

            //VALIDAÇÃO 
            if(!data.name) {
                return;
        }

        try { 
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDay: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoice: useVoice,
        })
            alert('Anúncio criado com sucesso!')
        
        } catch (err) {
            console.log(err)
            alert('Erro ao criar o anúncio')
        }
        }
    return (
         /*Portal é utilizado para implementar componentes sobrepondo toda a interface onde está o seu Trigger*/      
         <Dialog.Portal>

            {/*Overlay implementa o escurecimento da interface sobreposta.*/}
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
            
                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-xl shadow-black/60'>
                    <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

                    <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                            <select 
                            id='game'
                            name='game'
                            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                            defaultValue=''
                            >
                                <option disabled value="">Selecione o game que deseja</option>
                                {games.map(game => {
                                    return (
                                        <option key={game.id} value={game.id}>{game.title}</option>
                                    )
                                })}
                            </select>
                        </div>                
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='name'>Nickname</label>
                            <Input name='name' id='name' type='text' placeholder='Qual é o seu nickname no game?'/>
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='yearsPlaying'>Você joga a quantos anos?</label>
                                <Input 
                                    name='yearsPlaying' 
                                    id='yearsPlaying' 
                                    type='number' 
                                    placeholder='Tudo bem ser Zero'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='discord'>Qual é o seu usuário do discord?</label>
                                <Input 
                                    name='discord' 
                                    id='discord' 
                                    type='text' 
                                    placeholder='DiscordNick#0000'
                                />
                            </div>
                        </div>                  
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='weekDays'>Quais dias costuma jogar?</label>

                                <ToggleGroup.Root 
                                    type='multiple' 
                                    className='flex gap-2' 
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    
                                    <ToggleGroup.Item
                                    value='0'
                                    title='Domingo' 
                                    className={`w-10 h-10 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >D</ToggleGroup.Item>
                                    
                                    <ToggleGroup.Item 
                                    value='1'
                                    title='Segunda' 
                                    className={`w-10 h-10 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >S</ToggleGroup.Item>
                                    
                                    <ToggleGroup.Item 
                                    value='2'
                                    title='Terça' className={`w-10 h-10 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >T</ToggleGroup.Item>
                                    
                                    <ToggleGroup.Item 
                                    value='3'
                                    title='Quarta' 
                                    className={`w-10 h-10 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >Q</ToggleGroup.Item>
                                    
                                    <ToggleGroup.Item 
                                    value='4'
                                    title='Quinta'
                                    className={`w-10 h-10 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >Q</ToggleGroup.Item>
                                    
                                    <ToggleGroup.Item 
                                    value='5'
                                    title='Sexta' 
                                    className={`w-10 h-10 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >S</ToggleGroup.Item>
                                    
                                    <ToggleGroup.Item 
                                    value='6'
                                    title='Sabado' 
                                    className={`w-10 h-10 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >S</ToggleGroup.Item>
                                </ToggleGroup.Root> 
                        </div>
                        <div className='flex gap-5'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='hourStart'>Em qual horário costuma começar a jogar?</label>
                                <Input 
                                    name='hourStart' 
                                    id='hourStart' 
                                    type='time' 
                                    placeholder='Por volta de '
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='hourEnd'>Em qual horário costuma parar de jogar?</label>
                                <Input 
                                    name='hourEnd' 
                                    id='hourEnd' 
                                    type='time' 
                                    placeholder='Por volta de '
                                />
                            </div>                         
                        </div>
                        <label className='mt-2 flex items-center gap-2 text-sm'>
                            <Checkbox.Root
                            checked={useVoice}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoice(true);
                                } else {
                                    setUseVoice(false);
                                }
                            }}
                            className='w-6 h-6 p-1 rounded bg-zinc-900'>
                                <Checkbox.CheckboxIndicator>
                                    <Check className='w-4 h-4 text-emerald-400' />
                                </Checkbox.CheckboxIndicator>
                            </Checkbox.Root>
                            Posso me conectar ao chat de voz
                        </label>

                        <footer className='gap-4 flex justify-end placeholder:gap-4'>
                            <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md text-sm hover:bg-zinc-300 hover:text-violet-900'>Cancelar</Dialog.Close>
                        
                            <button type='submit' className='bg-violet-500 px-5 h-12 rounded-md text-sm flex items-center gap-3 hover:bg-violet-300 hover:text-violet-900'>
                                <GameController className='w-6 h-6'/>
                                Encontrar duo
                            </button>
                        </footer>                     
                    </form>
                </Dialog.Content>
            </Dialog.Overlay>
       </Dialog.Portal>       
    )
}