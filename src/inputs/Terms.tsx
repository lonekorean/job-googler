import { useLayoutEffect, useRef } from 'react';
import addIcon from '../icons/add.svg';
import removeIcon from '../icons/remove.svg';
import '../styles/inputs/Terms.css';
import type { Term } from '../types';
import { blockEnterSubmit } from '../utils';

type TermsProps = {
  title: string;
  description: string;
  terms: Term[];
  setTerms: (terms: Term[]) => void;
};

export default function Terms({ title, description, terms, setTerms }: TermsProps) {
  // for focusing new input after it's added
  const focusNewId = useRef<string | null>(null);
  useLayoutEffect(() => {
    if (focusNewId.current) {
      document.getElementById(focusNewId.current)?.focus();
      focusNewId.current = null;
    }
  }, [terms]);

  function handleChange(id: string, value: string) {
    const newTerms = terms.map((term) => (term.id === id ? { ...term, value } : term));
    setTerms(newTerms);
  }

  function handleRemove(id: string) {
    const newTerms = terms.filter((term) => term.id !== id);
    setTerms(newTerms);
  }

  function handleAdd() {
    const newId = crypto.randomUUID();
    focusNewId.current = newId;
    setTerms([...terms, { id: newId, value: '' }]);
  }

  const fields = terms.map(({ id, value }) => (
    <div key={id} className="Terms__field">
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => handleChange(id, e.target.value)}
        onKeyDown={blockEnterSubmit}
      />
      <button type="button" className="Terms__remove" onClick={() => handleRemove(id)}>
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  ));

  return (
    <fieldset>
      <legend>{title}:</legend>
      <p className="Terms__description">{description}</p>
      <div className="Terms__grid">
        {fields}
        <button type="button" className="Terms__add" onClick={() => handleAdd()}>
          <img src={addIcon} alt="add" />
        </button>
      </div>
    </fieldset>
  );
}
