import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | null;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  autocomplete?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  placeholder,
  autocomplete,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-xl text-blue-900 mb-2">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className="block mb-5 w-full bg-gray-300 rounded-md py-1 px-2 duration-200 border focus:outline-none focus:border-blue-400 focus:shadow-sm focus:shadow-blue-100 focus:bg-gray-100 "
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
