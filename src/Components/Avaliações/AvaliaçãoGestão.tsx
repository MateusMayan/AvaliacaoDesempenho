import React from 'react';

const AvaliaçãoGestão = () => {
  return (
    <div className="flex flex-col items-center grow bg-blue-50 ">
      <div className="flex flex-col p-10  gap-10">
        <h1 className="text-5xl font-bold text-blue-900 text-center">
          Avaliar Equipe
        </h1>
        <div className="flex gap-3">
          <select className="bg-blue-100 p-2 h-14 rounded-md">
            <option className="bg-blue-100" selected disabled>
              Quem você quer avaliar?
            </option>
          </select>
          <input type="month" className="bg-blue-100 p-2 h-14 rounded-md" />
          <select className="bg-blue-100 p-2 h-14 rounded-md">
            <option className="bg-blue-100" selected disabled>
              Qual semana?
            </option>
            <option value="Semana 1">Semana 1</option>
            <option value="Semana 2">Semana 2</option>
            <option value="Semana 3">Semana 3</option>
            <option value="Semana 4">Semana 4</option>
          </select>
        </div>
      </div>
      <h2 className="text-4xl">Parâmetros de Avaliação</h2>
    </div>
  );
};

export default AvaliaçãoGestão;
