import { useUser } from '../Context/UserContext';
const Header = () => {
  const { login } = useUser();
  return (
    <header className="flex justify-center py-2 bg-blue-950">
      <section className="text-blue-200 text-2xl">
        Avaliação De Desempenho
      </section>
      {login ? <p>Olá</p> : null}
    </header>
  );
};

export default Header;
