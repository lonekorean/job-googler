import '../styles/inputs/Options.css';
import type { Option } from '../types';

type OptionsProps = {
  title: string;
  options: Option[];
  setOptions: (options: Option[]) => void;
};

export default function Options({ title, options, setOptions }: OptionsProps) {
  function handleChange(id: string, selected: boolean) {
    const newOptions = options.map((option) => (option.id === id ? { ...option, selected } : option));
    setOptions(newOptions);
  }

  const fields = options.map(({ id, name, selected }) => {
    return (
      <div key={id} className="Options__field">
        <input type="checkbox" id={id} checked={selected} onChange={() => handleChange(id, !selected)} />
        <label htmlFor={id}>{name}</label>
      </div>
    );
  });

  return (
    <fieldset>
      <legend>{title}:</legend>
      <div className="Options__grid">
        {fields}
      </div>
    </fieldset>
  );
}
