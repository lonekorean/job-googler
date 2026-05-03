import '../styles/inputs/Options.css';
import type { Option } from '../types';

type OptionsProps = {
  title: string;
  options: Option[];
  setOptions: (options: Option[]) => void;
  allowMultiple: boolean;
};

export default function Options({ title, options, setOptions, allowMultiple }: OptionsProps) {
  function handleChange(id: string, selected: boolean) {
    let newOptions: Option[];
    if (allowMultiple) {
      // toggle current option only
      newOptions = options.map((option) => (option.id === id ? { ...option, selected } : option));
    } else {
      // always select current option, unselect others
      newOptions = options.map((option) => ({ ...option, selected: option.id === id }));
    }
    setOptions(newOptions);
  }

  const inputType = allowMultiple ? 'checkbox' : 'radio';
  const inputName = title.toLowerCase().replaceAll(/[^a-z]/g, '-');
  const fields = options.map(({ id, name, value, selected }) => {
    return (
      <div key={id} className="Options__field">
        <input
          type={inputType}
          name={inputName}
          id={id}
          value={value}
          checked={selected}
          onChange={(e) => handleChange(id, e.target.checked)}
        />
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
