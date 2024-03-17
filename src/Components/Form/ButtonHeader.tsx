import React from 'react';
import styles from './Button.module.css';
const ButtonHeader = (props: any) => {
  return (
    <button className={styles.btn} {...props}>
      {props.children}
    </button>
  );
};

export default ButtonHeader;
