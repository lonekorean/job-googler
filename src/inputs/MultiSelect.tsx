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

  const fields = selections.map(({ name, value, selected }) => (
    <div key={name} className="MultiSelect__field-pair">
      <input type="checkbox" id={name} checked={selected} onChange={() => handleChange(name, !selected)} />
      <label htmlFor={name}>{value}</label>
    </div>
  ));

  return (
    <fieldset>
      <legend>{title}:</legend>
      {fields}
    </fieldset>
  );
}
