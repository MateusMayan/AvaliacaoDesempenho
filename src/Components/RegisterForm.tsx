import React, { useState } from 'react';
import Button from './Form/Button';
import Input from './Form/Input';
import Head from './Helper/Head';
import useForm from '../Hooks/useForm';
import { UserContext } from '../Context/UserContext';
import Error from './Helper/Error';

const RegisterForm = () => {
  //RegisterForm
  const nome = useForm();
  const [cargo, setCargo] = useState('');
  const email = useForm('email');
  const password = useForm('password');
  const { cadastrarUsuario, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      cadastrarUsuario &&
        cadastrarUsuario(nome.value, cargo, email.value, password.value);
    }
  }

  const handleSelectCargo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCargo(e.target.value);
  };

  return (
    <section className="m-auto p-5 md:w-96 my-32">
      <Head title="Login" />

      <div>
        <h1 className="text-3xl font-bold text-blue-950 mb-10 sm:text-5xl">
          Cadastre um Funcionário
        </h1>
        <form className="flex-col" onSubmit={handleSubmit}>
          <Input
            autoComplete="on"
            label="Nome:"
            type="text"
            name="nome"
            {...nome}
          />
          <label htmlFor="Cargo" className="block text-xl text-blue-900 mb-2">
            Cargo
          </label>
          <select
            className="block mb-5 w-full bg-gray-300 rounded-md py-1 px-2 duration-200 border focus:outline-none focus:border-blue-400 focus:shadow-sm focus:shadow-blue-100 focus:bg-gray-100 text-sky-700"
            name="Cargo"
            onChange={handleSelectCargo}
          >
            <option value="Admin">Admin</option>
            <option value="Equipe">Equipe</option>
            <option value="Gestão">Gestão</option>
          </select>

          <Input
            autoComplete="on"
            label="Email:"
            type="text"
            name="email"
            {...email}
          />
          <Input name="password" type="password" label="Senha:" {...password} />
          {loading ? (
            <Button disabled>Carregando...</Button>
          ) : (
            <Button>Entrar</Button>
          )}
          <Error error={error && 'Dados incorretos.'} />
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
