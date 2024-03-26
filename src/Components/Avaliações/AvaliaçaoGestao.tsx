import React from 'react';
import InputRange from '../Form/InputRange';
import Button from '../Form/Button';
import { useUser } from '../../Context/UserContext';

interface Valores {
  entrega: number;
  proatividade: number;
  qualidade: number;
  gestao_tempo: number;
  assiduidade: number;
  comunicacao: number;
  gestao_processos: number;
  gestao_equipe: number;
}

const AvaliacaoGestao = () => {
  const [valores, setValores] = React.useState<Valores>({
    entrega: 1,
    proatividade: 1,
    qualidade: 1,
    gestao_tempo: 1,
    assiduidade: 1,
    comunicacao: 1,
    gestao_processos: 1,
    gestao_equipe: 1,
  });
  const { employees } = useUser();
  const [progressBar, setProgressBar] = React.useState('');
  const [percentage, setPercentage] = React.useState(0);
  const [employee, setEmployee] = React.useState('');
  const [week, setWeek] = React.useState('');
  const [month, setMonth] = React.useState('');

  const handleInputChange = (name: keyof Valores, value: number) => {
    setValores({ ...valores, [name]: value });
  };

  const handleSelectEmployee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployee(e.target.value);
  };

  const handleInputMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const handleSelectWeek = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeek(e.target.value);
  };

  React.useEffect(() => {
    const calcularTotal = () => {
      let sum = 0;
      for (const key in valores) {
        sum += valores[key as keyof Valores];
      }
      const maxPossible = Object.keys(valores).length * 5; // Supondo que o máximo possível seja 5 para cada critério
      const average = sum / maxPossible;
      setPercentage(parseFloat((average * 100).toFixed(1)));

      // Definir a cor da barra de progresso com base na porcentagem do mês
      if (percentage <= 20) {
        setProgressBar('#FF0000'); // Vermelho para 0-25%
      } else if (percentage <= 40) {
        setProgressBar('#FFA500'); // Laranja para 26-50%
      } else if (percentage <= 60) {
        setProgressBar('#FFFF00'); // Amarelo para 51-75%
      } else if (percentage <= 80) {
        setProgressBar('#64FE60'); // Amarelo para 51-75%
      } else {
        setProgressBar('#00FF00'); // Verde para 76-100%
      }
    };

    calcularTotal();
  }, [valores, percentage]);

  return (
    <form className="flex flex-col items-center grow bg-blue-50 ">
      <div className="flex flex-col p-10  gap-10">
        <h1 className="text-5xl font-bold text-blue-900 text-center">
          Avaliar Equipe
        </h1>
        <div className="flex gap-3 max-[800px]:flex-col">
          <select
            onChange={handleSelectEmployee}
            className="bg-blue-100 p-2 h-14 rounded-md"
          >
            <option className="bg-blue-100" selected disabled>
              Quem você quer avaliar?
            </option>
            {employees !== undefined &&
              employees?.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
          </select>
          <input
            type="month"
            onChange={handleInputMonth}
            className="bg-blue-100 p-2 h-14 rounded-md"
          />
          <select
            className="bg-blue-100 p-2 h-14 rounded-md"
            onChange={handleSelectWeek}
          >
            <option className="bg-blue-100" selected disabled>
              Qual semana?
            </option>
            <option value="1">Semana 1</option>
            <option value="2">Semana 2</option>
            <option value="3">Semana 3</option>
            <option value="4">Semana 4</option>
          </select>
        </div>
      </div>

      {week && employee && month && (
        <>
          <div
            style={{ background: progressBar }}
            className={`relative rounded-2xl flex w-96 h-5 items-center mb-5 `}
          >
            <span className="absolute right-3 text-sm text-neutral-800">
              {percentage + '%'}
            </span>
          </div>
          <div>
            <h2 className="text-4xl text-center">Parâmetros de Avaliação</h2>
            <div className="flex-col justify-center">
              <div className="flex gap-5 justify-between max-[800px]:flex-col">
                <InputRange
                  label="Entrega: "
                  name="entrega"
                  id="entrega"
                  onChange={(value) => handleInputChange('entrega', value)}
                />
                <InputRange
                  label="Proatividade:"
                  name="proatividade"
                  id="proatividade"
                  onChange={(value) => handleInputChange('proatividade', value)}
                />
              </div>
              <div className="flex gap-5 justify-between max-[800px]:flex-col">
                <InputRange
                  label="Qualidade: "
                  name="qualidade"
                  id="qualidade"
                  onChange={(value) => handleInputChange('qualidade', value)}
                />
                <InputRange
                  label="Gestão de Tempo:"
                  name="gestao-tempo"
                  id="gestao-tempo"
                  onChange={(value) => handleInputChange('gestao_tempo', value)}
                />
              </div>
              <div className="flex gap-5 justify-between max-[800px]:flex-col">
                <InputRange
                  label="Assiduidade: "
                  name="assiduidade"
                  id="assiduidade"
                  onChange={(value) => handleInputChange('assiduidade', value)}
                />
                <InputRange
                  label="Comunicação:"
                  name="comunicacao"
                  id="comunicacao"
                  onChange={(value) => handleInputChange('comunicacao', value)}
                />
              </div>
              <div className="flex gap-5 justify-between mb-5 max-[800px]:flex-col">
                <InputRange
                  label="Gestão de Processos: "
                  name="gestao-processos"
                  id="gestao-processos"
                  onChange={(value) =>
                    handleInputChange('gestao_processos', value)
                  }
                />
                <InputRange
                  label="Gestão de Equipe: "
                  name="gestao-equipe"
                  id="gestao-equipe"
                  onChange={(value) =>
                    handleInputChange('gestao_equipe', value)
                  }
                />
              </div>
            </div>
          </div>
          <Button>Enviar</Button>
        </>
      )}
    </form>
  );
};
export default AvaliacaoGestao;
