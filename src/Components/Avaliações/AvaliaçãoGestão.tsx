import React from 'react';

const AvaliaçãoGestão = () => {
  return (
    <div className="flex flex-col w-dvw p-10 bg-blue-50 items-center gap-10">
      <h1 className="text-5xl font-bold text-blue-900">Avaliar Equipe</h1>
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
  );
};

export default AvaliaçãoGestão;
