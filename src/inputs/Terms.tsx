import addIcon from '../assets/icons/add.svg';
import removeIcon from '../assets/icons/remove.svg';
import '../styles/inputs/Terms.css';
import type { Term } from '../types';

type TermsProps = {
  title: string;
  terms: Term[];
  setTerms: (terms: Term[]) => void;
};

export default function Terms({ title, terms, setTerms }: TermsProps) {
  function handleChange(id: string, value: string) {
    const newTerms = terms.map((term) => (term.id === id ? { ...term, value } : term));
    setTerms(newTerms);
  }

  function handleRemove(id: string) {
    const newTerms = terms.filter((term) => term.id !== id);
    setTerms(newTerms);
  }

  function handleAdd() {
    const newTerms = [...terms, { id: crypto.randomUUID(), value: '' }];
    setTerms(newTerms);
  }

  const fields = terms.map(({ id, value }) => (
    <div key={id} className="Terms__field">
      <input type="text" id={id} value={value} onChange={(e) => handleChange(id, e.target.value)} />
      <button type="button" className="Terms__remove" onClick={() => handleRemove(id)}>
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  ));

  return (
    <fieldset>
      <legend>{title}:</legend>
      <div className="Terms__grid">
        {fields}
        <button type="button" className="Terms__add" onClick={() => handleAdd()}>
          <img src={addIcon} alt="add" />
        </button>
      </div>
    </fieldset>
  );
}
