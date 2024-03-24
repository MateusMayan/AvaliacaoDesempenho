import React from 'react';
const Button = (props: any) => {
  return (
    <button
      className="py-1.5 px-3 rounded-md border border-solid border-blue-400 
    text-blue-200 bg-blue-950 hover:font-bold hover:bg-blue-400 hover:text-blue-900 focus:bg-blue-400 focus:outline-none focus:font-bold focus:text-blue-900  !important"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
