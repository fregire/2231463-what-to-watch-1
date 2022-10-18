import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { FilmInfo } from '../../const';
import { Film } from '../../types/film';

type Props = {
  filmInfo: FilmInfo;
  films: Film[];
}

const App: FC<Props> = (props) => {
  const { filmInfo, films } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen filmInfo={filmInfo} films={films} />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListScreen films={films} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.SignIn} element={<SignInScreen />} />
        <Route path={AppRoute.Film} element={<MovieScreen film={films[0]} films={films} />} />
        <Route path={AppRoute.AddReview} element={<AddReviewScreen film={films[0]}/>} />
        <Route path={AppRoute.Player} element={<PlayerScreen film={films[0]} />} />
        <Route path={AppRoute.Default} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
