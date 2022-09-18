 //IMPORTS 
  import { GameBanner } from './components/GameBanner';
  //

  import { Input } from './components/Form/input';
  

  import { useEffect, useState } from 'react'; /* 
  useState é uma função utilizada para armazenar o estado booleano para componentes.
  useEffect ...
 */

  import * as Dialog from '@radix-ui/react-dialog'; /* o "as" é utilizado para retornar todos os componentes da biblioteca dentro de um objeto.
  radix são bibliotecas que contem modelos de componentes pre-montados sem formatação para serem utilizados no react. exemplo radix-dialog que nos auxilia a implmentar um modal.
  */
  
  import './styles/main.css';
  //

  import logoImg from './assets/logo_nlw_esports.svg';
  //

  import { CreateAdBanner } from './components/CreateAdBanner';
  //
  
  import { GameController } from 'phosphor-react';
  //



// Interface é utilizada no typescript para indicar a tipagem de um componente.
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
     ads:number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt=""></img>

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw_gradient bg-clip-text text-transparent">duo</span> está aqui.</h1>

      
      <div className="grid grid-cols-6 gap-6 mt-16">
        {/*map é uma função utilizada para percorrer listas no java script.*/}
        {games.map(game => {
          return (
            <GameBanner
            //"key" propriedade interna do javascrip que ele utiliza para encontrar um registro mais fácilmente, sempre utilizar identificadores únicos.
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        );
        })}   
      </div>
      <Dialog.Root>
        <CreateAdBanner />      
        
        {/*Portal é utilizado para implementar componentes sobrepondo toda a interface onde está o seu Trigger*/}
        <Dialog.Portal>
          
          {/*Overlay implementa o escurecimento da interface sobreposta.*/}
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
            
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-xl shadow-black/60'>
              <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

                <form className='mt-8 flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                    <Input id='game'             placeholder='Selecione o game que deseja'/>
                  </div>                
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='name'>Nickname</label>
                    <Input id='name' type='text' placeholder='Qual é o seu nickname no game?'/>
                  </div>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='yearsPlayng'>Você joga a quantos anos?</label>
                      <Input id='yearsPlayng' type='number' placeholder='Tudo bem ser Zero'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='discord'>Qual é o seu usuário do discord?</label>
                      <Input id='discord' type='text' placeholder='DiscordNick#0000'/>
                    </div>
                  </div>                  
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='weekDays'>Quais dias costuma jogar?</label>
                    <div className='flex gap-2'>
                      <button title='Domingo' className='w-10 h-10 rounded bg-zinc-900'>D</button>
                      <button title='Segunda' className='w-10 h-10 rounded bg-zinc-900'>S</button>
                      <button title='Terça' className='w-10 h-10 rounded bg-zinc-900'>T</button>
                      <button title='Quarta' className='w-10 h-10 rounded bg-zinc-900'>Q</button>
                      <button title='Quinta' className='w-10 h-10 rounded bg-zinc-900'>Q</button>
                      <button title='Sexta' className='w-10 h-10 rounded bg-zinc-900'>S</button>
                      <button title='Sabado' className='w-10 h-10 rounded bg-zinc-900'>S</button>
                    </div> 
                  </div>
                  <div className='flex gap-5'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='hourStart'>Em qual horário costuma começar a jogar?</label>
                      <Input id='hourStart' type='time' placeholder='Por volta de '/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='hourEnd'>Em qual horário costuma parar de jogar?</label>
                      <Input id='hourEnd' type='time' placeholder='Por volta de '/>
                    </div> 
                  
                  </div>
                  <div className='mt-2 flex gap-2 text-sm'>
                    <input type='checkbox'/>Posso me conectar ao chat de voz 
                  </div>

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
      </Dialog.Root>
    </div>
  )
}

export default App
