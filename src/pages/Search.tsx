import '../styles/pages/Search.css';
import formData from '../data/form.json';
import { useState } from 'react';

export default function Home() {
  const [titleTerms, setTitleTerms] = useState(formData['default-title-terms']);

  const titleTermInputs = titleTerms.map((titleTerm) => (
    <div className="Search__input-wrapper">
      <input type="text" value={titleTerm} />
      <button className="Search__input-remove">×</button>
    </div>
  ));

  return (
    <>
      <h1>Search</h1>

      <form className="Search__form">
        <fieldset>
          <legend>In Page Title:</legend>
          <div className="Search__input-grid">
            {titleTermInputs}
            <button className="Search__input-add">+</button>
          </div>
        </fieldset>

        <fieldset>
          <legend>In Page Body:</legend>
          <input type="text" value="remote" />
        </fieldset>

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
