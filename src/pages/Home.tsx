import '../styles/pages/Home.css';

export default function Home() {
  return (
    <>
      <h1>Search</h1>

      <fieldset>
        <legend>In Page Title:</legend>
        <input type="text" value="design engineer" />
      </fieldset>

      <fieldset>
        <legend>In Page Body:</legend>
        <input type="text" value="remote" />
      </fieldset>

      <fieldset>
        <legend>On These Job Boards:</legend>
        <input type="checkbox" /><label>job-boards.greenhouse.io</label>
      </fieldset>

      <fieldset>
        <legend>Within The Last:</legend>
        <input type="radio" id="within-hour" name="within" value="h" /><label htmlFor="within-hour">Hour</label>
        <input type="radio" id="within-day" name="within" value="d" /><label htmlFor="within-day">Day</label>
        <input type="radio" id="within-week" name="within" value="w" /><label htmlFor="within-week">Week</label>
        <input type="radio" id="within-month" name="within" value="m" /><label htmlFor="within-month">Month</label>
      </fieldset>

      <button>Open Google Search!</button>
    </>
  );
}
