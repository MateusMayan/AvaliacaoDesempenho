import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Components/Form/Button';
import Input from '../Components/Form/Input';
import Head from '../Components/Helper/Head';
import useForm from '../Hooks/useForm';
import { UserContext } from '../Context/UserContext';
import Error from '../Components/Helper/Error';
const LoginForm = () => {
  //LoginForm
  const username = useForm();
  const password = useForm();
  const { fazerLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      if (fazerLogin) {
        fazerLogin(username.value, password.value);
      }
    }
  }

  return (
    <section className="m-auto p-5 md:w-96 my-32">
      <Head title="Login" />

      <div>
        <h1 className="text-3xl font-bold text-blue-950 mb-10 sm:text-5xl">
          Faça seu login
        </h1>
        <form className="flex-col" onSubmit={handleSubmit}>
          <Input label="Email:" type="text" name="username" {...username} />
          <Input label="Senha:" type="password" name="password" {...password} />
          {loading ? (
            <Button disabled>Carregando...</Button>
          ) : (
            <Button>Entrar</Button>
          )}
          <Error error={error && 'Dados incorretos.'} />
        </form>
        <Link
          className="text-md underline text-blue-950 mt-5 block"
          to="/login/password-forgot"
        >
          Perdeu a Senha?
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
