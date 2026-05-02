import { useState } from 'react';
import { defaultBodyTerms, defaultTitleTerms } from '../config';
import MultiTermInput from '../inputs/MultiTerm';
import '../styles/pages/Search.css';
import type { Term } from '../types';

function loadDefaultTerms(values: string[]): Term[] {
  return values.map((value) => ({ id: crypto.randomUUID(), value }));
}

export default function Search() {
  const [titleTerms, setTitleTerms] = useState<Term[]>(() => loadDefaultTerms(defaultTitleTerms));
  const [bodyTerms, setBodyTerms] = useState<Term[]>(() => loadDefaultTerms(defaultBodyTerms));

  return (
    <>
      <h1>Search</h1>

      <form className="Search__form">
        <MultiTermInput title="In Page Title" terms={titleTerms} setTerms={setTitleTerms} />
        <MultiTermInput title="In Page Body" terms={bodyTerms} setTerms={setBodyTerms} />

        <fieldset>
          <legend>On These Job Boards:</legend>
          <div className="Search__field-pair">
            <input type="checkbox" id="board-greenhouse" />
            <label htmlFor="board-greenhouse">job-boards.greenhouse.io</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Within The Last:</legend>
          <div className="Search__field-pair">
            <input type="radio" id="within-hour" name="within" value="h" />
            <label htmlFor="within-hour">Hour</label>
          </div>
          <div className="Search__field-pair">
            <input type="radio" id="within-day" name="within" value="d" />
            <label htmlFor="within-day">Day</label>
          </div>
          <div className="Search__field-pair">
            <input type="radio" id="within-week" name="within" value="w" />
            <label htmlFor="within-week">Week</label>
          </div>
          <div className="Search__field-pair">
            <input type="radio" id="within-month" name="within" value="m" />
            <label htmlFor="within-month">Month</label>
          </div>
        </fieldset>

        <button type="submit" className="Search__submit">Open Google Search!</button>
      </form>
    </>
  );
}
