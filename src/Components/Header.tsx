import { MouseEventHandler } from 'react';
import { useUser } from '../Context/UserContext';

const Header = () => {
  const { user, fazerLogout } = useUser();
  const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
    fazerLogout && fazerLogout();
  };

  return (
    <header className="flex justify-center gap-3 py-2 bg-blue-950">
      <section className="text-blue-200 text-2xl">
        Avaliação De Desempenho
      </section>
      {user && fazerLogout ? (
        <button
          className="text-blue-300 border border-blue-300 rounded-md py-1 px-2 focus:bg-blue-900 hover:bg-blue-900 focus:outline-none hover:text-blue-200 focus:text-blue-200 focus:border-blue-500 hover:border-blue-500 "
          onClick={handleLogout}
        >
          Sair
        </button>
      ) : null}
    </header>
  );
};

export default Header;
