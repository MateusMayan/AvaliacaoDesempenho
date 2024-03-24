import InputRange from '../Form/InputRange';

const AvaliaçãoGestão = () => {
  return (
    <form className="flex flex-col items-center grow bg-blue-50 ">
      <div className="flex flex-col p-10  gap-10">
        <h1 className="text-5xl font-bold text-blue-900 text-center">
          Avaliar Equipe
        </h1>
        <div className="flex gap-3 max-[800px]:flex-col">
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
      <div>
        <h2 className="text-4xl text-center">Parâmetros de Avaliação</h2>
        <div className="flex-col justify-center">
          <div className="flex gap-5 justify-between w">
            <InputRange label="Entrega: " name="entrega" id="entrega" />
            <InputRange
              label="Proatividade:"
              name="proatividade"
              id="proatividade"
            />
          </div>
          <div className="flex gap-5 justify-between w">
            <InputRange label="Qualidade: " name="qualidade" id="qualidade" />
            <InputRange
              label="Gestão de Tempo:"
              name="gestao-tempo"
              id="gestao-tempo"
            />
          </div>
          <div className="flex gap-5 justify-between w">
            <InputRange
              label="Assiduidade: "
              name="assiduidade"
              id="assiduidade"
            />
            <InputRange
              label="Comunicação:"
              name="comunicacao"
              id="comunicacao"
            />
          </div>
          <div className="flex gap-5 justify-between w">
            <InputRange
              label="Gestão de Processos: "
              name="gestao-processos"
              id="gestao-processos"
            />
            <InputRange
              label="Gestão de Equipe: "
              name="gestao-equipe"
              id="gestao-equipe"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AvaliaçãoGestão;
