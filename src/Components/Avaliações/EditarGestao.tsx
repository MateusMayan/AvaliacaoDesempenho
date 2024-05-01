import React from 'react';
import { UserContext } from '../../Context/UserContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const EditarGestao = () => {
  const { employees } = React.useContext(UserContext);

  const [employee, setEmployee] = React.useState('');
  const [month, setMonth] = React.useState<string>();
  const [evaluatedMonths, setEvaluatedMonths] = React.useState<string[]>([]);

  function handleSelectEmployee(e: React.ChangeEvent<HTMLSelectElement>) {
    setEmployee(e.target.value);
  }

  function handleSelectMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    setMonth(e.target.value);
  }

  React.useEffect(() => {
    const searchEmployee = async () => {
      const avaliacoesSnapshot = await getDocs(
        collection(db, 'avaliacaoGestao'),
      );
      const arrayMonths: string[] = [];
      avaliacoesSnapshot.docs.map(
        (doc) => doc.id !== null && arrayMonths.push(doc.id),
      );
      setEvaluatedMonths(arrayMonths);
    };
    searchEmployee();
  }, []);

  React.useEffect(() => {}, [month, employee]);

  return (
    <div className="flex flex-col items-center grow p-10 bg-blue-50">
      <h1 className="text-5xl font-bold text-blue-900">
        Avaliações Realizadas
      </h1>
      <div className="flex gap-10 m-5">
        <select
          onChange={handleSelectEmployee}
          className="bg-blue-100 p-2 h-14 rounded-md select"
        >
          <option className="bg-blue-100" selected disabled>
            Quem você quer avaliar?
          </option>
          {employees !== undefined &&
            employees?.map((doc) => (
              <option key={doc.Nome} value={doc.Id} id={doc.Nome}>
                {doc.Nome}
              </option>
            ))}
        </select>

        <select
          onChange={handleSelectMonth}
          className="bg-blue-100 p-2 h-14 rounded-md select"
        >
          <option className="bg-blue-100" selected disabled>
            Qual mês deseja editar?
          </option>
          {evaluatedMonths &&
            evaluatedMonths.map((month) => (
              <option value={month}>{month}</option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default EditarGestao;
