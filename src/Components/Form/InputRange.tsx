import React from 'react';

interface InputRangeProps {
  label: string;
  name: string;
  id: string;
  value?: string;
}

const InputRange: React.FC<InputRangeProps> = ({
  label,
  name,
  id,
  ...props
}) => {
  const [color, setColor] = React.useState('#FF0B0B');
  const [value, setValue] = React.useState('1');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    switch (value) {
      case '1':
        setColor('#FF0B0B');
        break;
      case '2':
        setColor('#FF7610');
        break;
      case '3':
        setColor('#FFE315');
        break;
      case '4':
        setColor('#B3EF1C');
        break;
      case '5':
        setColor('#2EFD28');
        break;
      default:
        setColor('');
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2 mt-3">
      <label htmlFor={name} className="text-blue-950">
        {label}
      </label>
      <span className="text-sm font-medium text-blue-800">{value}</span>
      <input
        style={{
          WebkitAppearance: 'none',
          outline: 'none',
          backgroundImage:
            'linear-gradient(0.25turn, #FF0B0B, #FFE815, #2CFD28)',
          borderRadius: '20px',
          width: '300px',
          height: '5px',
          accentColor: color,
        }}
        type="range"
        name={name}
        id={name}
        min={1}
        max={5}
        step={1}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputRange;
