import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useUser } from '../Context/UserContext';
export default function NavBar() {
  const { user } = useUser();

  return (
    <div className={styles.NavBar}>
      <Accordion disableGutters square className={styles.Accordion} expanded>
        {user.Cargo === 'Admin' && (
          <>
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className={styles.Summary}
            >
              Avaliação Equipe
            </AccordionSummary>

            <AccordionDetails className={styles.Details}>
              <Link to="/main">Realizar Avaliação</Link>
            </AccordionDetails>

            <AccordionDetails className={styles.Details}>
              <Link to="/main/edicaoEquipe">Editar Avaliação</Link>
            </AccordionDetails>
          </>
        )}
        <>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={styles.Summary}
          >
            Avaliação Pessoal
          </AccordionSummary>

          <AccordionDetails className={styles.Details}>
            <Link to="/main/avaliacaoPessoal">Realizar Avaliação</Link>
          </AccordionDetails>

          <AccordionDetails className={styles.Details}>
            <Link to="/main/edicaoPessoal">Editar Avaliação</Link>
          </AccordionDetails>
        </>
      </Accordion>
      <Link to={'/main/parametros'}>
        <Accordion square>
          <AccordionDetails className={styles.Parametros}>
            Parâmetros
          </AccordionDetails>
        </Accordion>
      </Link>
      {user.Cargo === 'Admin' && (
        <Link to={'/main/register'}>
          <Accordion square>
            <AccordionDetails className={styles.Parametros}>
              Cadastrar Funcionário
            </AccordionDetails>
          </Accordion>
        </Link>
      )}
    </div>
  );
}
