import { useState, type SubmitEvent } from 'react';
import * as config from '../config';
import OptionsInput from '../inputs/Options';
import TermsInput from '../inputs/Terms';
import '../styles/pages/Search.css';
import type { Option, Term } from '../types';

function loadTerms(values: string[]): Term[] {
  return values.map((value) => ({ id: crypto.randomUUID(), value }));
}

function loadOptions(items: { name: string, value: string, selected: boolean }[]): Option[] {
  return items.map((item) => ({
    id: crypto.randomUUID(),
    name: item.name,
    value: item.value,
    selected: item.selected ?? false
  }));
}

function cleanTerms(terms: Term[]): string[] {
  const values = terms
    .filter((term) => term.value !== '')
    .map((term) => term.value.trim())
  return [...(new Set(values).values())]; /* deduped */
}

function cleanOptions(options: Option[]): string[] {
  const values = options
    .filter((value) => value.selected)
    .map((option) => option.value)
  return values;
}

export default function Search() {
  const [titleTerms, setTitleTerms] = useState<Term[]>(() => loadTerms(config.titleTerms));
  const [bodyTerms, setBodyTerms] = useState<Term[]>(() => loadTerms(config.bodyTerms));
  const [jobBoards, setJobBoards] = useState<Option[]>(() => loadOptions(config.jobBoards));
  const [timeRanges, setTimeRanges] = useState<Option[]>(() => loadOptions(config.timeRanges));

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const url = new URL('https://www.google.com/search');

    const titleTermClause = cleanTerms(titleTerms).map((value) => `intitle:"${value}"`).join(' OR ')
    const bodyTermClause = cleanTerms(bodyTerms).map((value) => `"${value}"`).join(' OR ');
    const jobBoardClause = cleanOptions(jobBoards).map((value) => `site:${value}`).join(' OR ')
    url.searchParams.append('q',
      [titleTermClause, bodyTermClause, jobBoardClause]
        .filter((clause) => clause !== '')
        .map((clause) => `(${clause})`)
        .join(' AND ')
    );

    const timeRangeValue = cleanOptions(timeRanges)[0];
    url.searchParams.append('tbs', `qdr:${timeRangeValue}`);

    window.open(url.href, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <h1>Search</h1>

      <form className="Search__form" onSubmit={handleSubmit}>
        <TermsInput title="In Page Title" terms={titleTerms} setTerms={setTitleTerms} />
        <TermsInput title="In Page Body" terms={bodyTerms} setTerms={setBodyTerms} />
        <OptionsInput title="On These Job Boards" options={jobBoards} setOptions={setJobBoards} allowMultiple={true} />
        <OptionsInput title="Within The Last" options={timeRanges} setOptions={setTimeRanges} allowMultiple={false} />

        <button type="submit" className="Search__submit">Open Google Search!</button>
      </form>
    </>
  );
}
