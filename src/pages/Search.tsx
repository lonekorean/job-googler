import { useState, type SubmitEvent } from 'react';
import * as config from '../config';
import OptionsInput from '../inputs/Options';
import TermsInput from '../inputs/Terms';
import '../styles/pages/Search.css';
import type { Option, Term } from '../types';
import arrowUpRightIcon from '../assets/icons/arrow-up-right.svg';

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
  const [allTerms, setAllTerms] = useState<Term[]>(() => loadTerms(config.allTerms));
  const [anyTerms, setAnyTerms] = useState<Term[]>(() => loadTerms(config.anyTerms));
  const [jobBoards, setJobBoards] = useState<Option[]>(() => loadOptions(config.jobBoards));
  const [timeRanges, setTimeRanges] = useState<Option[]>(() => loadOptions(config.timeRanges));

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const url = new URL('https://www.google.com/search');

    const titleTermClause = cleanTerms(titleTerms).map((value) => `intitle:"${value}"`).join(' OR ')
    const allTermClause = cleanTerms(allTerms).map((value) => `"${value}"`).join(' AND ');
    const anyTermClause = cleanTerms(anyTerms).map((value) => `"${value}"`).join(' OR ');
    const jobBoardClause = cleanOptions(jobBoards).map((value) => `site:${value}`).join(' OR ')
    url.searchParams.append('q', [titleTermClause, allTermClause, anyTermClause, jobBoardClause]
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
        <TermsInput
          title="Match ANY of these in title"
          description="Require at least one of these terms in the page title, which is usually the job title."
          terms={titleTerms}
          setTerms={setTitleTerms}
        />
        <TermsInput
          title="Match ALL of these anywhere"
          description="Require all of these terms somewhere in the page."
          terms={allTerms}
          setTerms={setAllTerms}
        />
        <TermsInput
          title="Match ANY of these anywhere"
          description="Require at least one of these terms somewhere in the page."
          terms={anyTerms}
          setTerms={setAnyTerms}
        />
        <OptionsInput
          title="On These Job Boards"
          options={jobBoards}
          setOptions={setJobBoards}
          allowMultiple={true}
        />
        <OptionsInput
          title="Within The Last"
          options={timeRanges}
          setOptions={setTimeRanges}
          allowMultiple={false}
        />

        <button type="submit" className="Search__submit">
          Search
          <img src={arrowUpRightIcon} alt="" />
        </button>
      </form>
    </>
  );
}
