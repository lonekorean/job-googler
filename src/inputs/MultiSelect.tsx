import '../styles/inputs/MultiSelect.css';
import type { Selection } from '../types';

type MultiSelectProps = {
  title: string;
  selections: Selection[];
  setSelections: (selections: Selection[]) => void;
};

export default function MultiTerm({ title, selections, setSelections }: MultiSelectProps) {
  function handleChange(name: string, selected: boolean) {
    const newSelections = selections.map((selection) => (selection.name === name ? { ...selection, selected } : selection));
    setSelections(newSelections);
  }

  const fields = selections.map(({ name, selected }) => {
    const id = name.toLowerCase().replaceAll(/[^a-z]/g, '-');

    return (
      <div key={id} className="MultiSelect__field">
        <input type="checkbox" id={id} checked={selected} onChange={() => handleChange(name, !selected)} />
        <label htmlFor={id}>{name}</label>
      </div>
    );
  });

  return (
    <fieldset>
      <legend>{title}:</legend>
      <div className="MultiSelect__grid">
        {fields}
      </div>
    </fieldset>
  );
}
