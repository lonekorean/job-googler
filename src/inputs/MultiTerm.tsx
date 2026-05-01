import addIcon from '../assets/icons/add.svg';
import removeIcon from '../assets/icons/remove.svg';
import '../styles/inputs/MultiTerm.css';

export default function MultiTerm({ title, terms, setTerms }) {
  const fields = terms.map((term) => (
    <div className="MultiTerm__field">
      <input type="text" value={term} />
      <button className="MultiTerm__remove">
        <img src={removeIcon} alt="remove" />
      </button>
    </div>
  ));

  return (
    <fieldset>
      <legend>{title}:</legend>
      <div className="MultiTerm__grid">
        {fields}
        <button className="MultiTerm__add">
          <img src={addIcon} alt="add" />
        </button>
      </div>
    </fieldset>
  );
}
