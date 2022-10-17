import MainScreen from '../../pages/main-screen/main-screen';
import { FC } from 'react';

type Props = {
  title: string;
  genre: string;
  year: number;
}

const App: FC<Props> = (props) => {
  const { title, genre, year } = props;
  return <MainScreen title={title} genre={genre} year={year} />;
};

export default App;
