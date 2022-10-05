import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  title: string;
  genre: string;
  year: number;
}

function App({title, genre, year}: AppProps): JSX.Element {
  return <MainScreen title={title} genre={genre} year={year} />;
}

export default App;
