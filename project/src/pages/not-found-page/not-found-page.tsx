import { Link } from 'react-router-dom';
import { FC } from 'react';

const NotFoundPage: FC = () => (
  <>
    404 <br />
    Страница не найдена <br />
    <Link to='/'>
      Вернуться на главную
    </Link>
  </>
);

export default NotFoundPage;
