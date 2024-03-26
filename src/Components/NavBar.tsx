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
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={styles.Summary}
        >
          Avaliação
        </AccordionSummary>
        {user.Cargo === 'Admin' && (
          <AccordionDetails className={styles.Details}>
            <Link to="/main">Avaliar Equipe</Link>
          </AccordionDetails>
        )}
        <AccordionDetails className={styles.Details}>
          <Link to="/main/avaliacaoPessoal">Avaliação Pessoal</Link>
        </AccordionDetails>
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
