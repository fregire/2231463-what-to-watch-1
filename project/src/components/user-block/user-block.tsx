import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { AppRoute } from '../../const';

type AuthedUserBlockProps = {
  avatarLink: string;
}
const AuthedUserBlock: FC<AuthedUserBlockProps> = (props) => {
  const { avatarLink } = props;
  const dispatch = useAppDispatch();

  const handleSignOutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <a href={AppRoute.MyList}>
            <img src={avatarLink} alt="User avatar" width="63" height="63" />
          </a>
        </div>
      </li>
      <li className="user-block__item">
        <a href="#!" className="user-block__link" onClick={handleSignOutClick}>Sign out</a>
      </li>
    </>
  );
};

const UserBlock: FC = () => {
  const { authorizationStatus, user } = useAppSelector((state) => state);

  return (
    <ul className="user-block">
      {authorizationStatus === AuthorizationStatus.Auth
        ? <AuthedUserBlock avatarLink={user ? user.avatarUrl : 'img/avatar.jpg'} />
        : <Link to='/login' className='user-block__link'>Sign in</Link>}
    </ul>
  );
};

export default UserBlock;
