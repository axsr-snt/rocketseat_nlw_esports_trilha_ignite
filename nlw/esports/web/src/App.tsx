//IMPORTS 
  import axios from 'axios';
  //

  import { GameBanner } from './components/GameBanner';
  // 

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

  import { CreateAdModal } from './components/CreateAdModal';
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
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt=""></img>

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw_gradient bg-clip-text text-transparent">duo</span> está aqui.</h1>

      
      <div className="grid grid-cols-6 gap-6 mt-16">
        {/*map é uma função utilizada para percorrer listas no javascript.*/}
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
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
