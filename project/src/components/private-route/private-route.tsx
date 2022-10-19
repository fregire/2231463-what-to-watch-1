import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

const PrivateRoute: FC<Props> = (props) => {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
};

export default PrivateRoute;
