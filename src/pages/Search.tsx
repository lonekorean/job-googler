import { useMemo, useState, type SubmitEvent } from 'react';
import defaults from '../defaults.json';
import arrowUpRightIcon from '../icons/arrow-up-right.svg';
import OptionsInput from '../inputs/Options';
import TermsInput from '../inputs/Terms';
import '../styles/pages/Search.css';
import type { Option, SearchData, SearchState, Term } from '../types';

const STORAGE_KEY = 'searchData.v1';

function loadInitialState(): SearchState {
  let data: SearchData = defaults;

  try {
    const stringifiedData = localStorage.getItem(STORAGE_KEY);
    if (stringifiedData) {
      const parsed: unknown = JSON.parse(stringifiedData);
      if (parsed && typeof parsed === 'object') {
        data = parsed as SearchData;
      }
    }
  } catch {
    // keep defaults
  }

  return {
    titleTerms: prepareTerms(data.titleTerms),
    allTerms: prepareTerms(data.allTerms),
    anyTerms: prepareTerms(data.anyTerms),
    jobBoards: prepareOptions(data.jobBoards),
    timeRanges: prepareOptions(data.timeRanges)
  };
}

function prepareTerms(values: string[]): Term[] {
  return values.map((value) => ({ id: crypto.randomUUID(), value }));
}

function prepareOptions(items: { name: string, value: string, selected: boolean }[]): Option[] {
  return items.map((item) => ({
    id: crypto.randomUUID(),
    name: item.name,
    value: item.value,
    selected: item.selected
  }));
}

function getCleanTerms(terms: Term[]): Term[] {
  const cleanArray = terms
    .map((term) => ({ ...term, value: term.value.trim() }))
    .filter((term) => term.value !== '');

  const uniqueMap = new Map(cleanArray.map((term) => [term.value, term]));

  return [...uniqueMap.values()];
}

function getSelectedOptions(options: Option[]): Option[] {
  return options.filter((value) => value.selected);
}

export default function Search() {
  const initialState = useMemo(loadInitialState, []);

  const [titleTerms, setTitleTerms] = useState<Term[]>(initialState.titleTerms);
  const [allTerms, setAllTerms] = useState<Term[]>(initialState.allTerms);
  const [anyTerms, setAnyTerms] = useState<Term[]>(initialState.anyTerms);
  const [jobBoards, setJobBoards] = useState<Option[]>(initialState.jobBoards);
  const [timeRanges, setTimeRanges] = useState<Option[]>(initialState.timeRanges);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const cleanTitleTerms = getCleanTerms(titleTerms);
    const titleTermsClause = cleanTitleTerms.map((term) => `intitle:"${term.value}"`).join(' OR ');

    const cleanAllTerms = getCleanTerms(allTerms);
    const allTermsClause = cleanAllTerms.map((term) => `"${term.value}"`).join(' AND ');

    const cleanAnyTerms = getCleanTerms(anyTerms);
    const anyTermsClause = cleanAnyTerms.map((term) => `"${term.value}"`).join(' OR ');

    const selectedJobBoards = getSelectedOptions(jobBoards);
    const jobBoardsClause = selectedJobBoards.map((option) => `site:${option.value}`).join(' OR ');

    const selectedTimeRange = getSelectedOptions(timeRanges);
    const timeRangeValue = selectedTimeRange[0]?.value; // singular

    const url = new URL('https://www.google.com/search');

    url.searchParams.append('q', [titleTermsClause, allTermsClause, anyTermsClause, jobBoardsClause]
      .filter((clause) => clause !== '')
      .map((clause) => `(${clause})`)
      .join(' AND ')
    );

    if (timeRangeValue) {
      url.searchParams.append('tbs', `qdr:${timeRangeValue}`);
    }

    window.open(url.href, '_blank');

    // set terms in case any changes resulted from cleaning
    setTitleTerms(cleanTitleTerms);
    setAllTerms(cleanAllTerms);
    setAnyTerms(cleanAnyTerms);

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      'titleTerms': cleanTitleTerms.map((term) => term.value),
      'allTerms': cleanAllTerms.map((term) => term.value),
      'anyTerms': cleanAnyTerms.map((term) => term.value),
      'jobBoards': jobBoards.map(({ id, ...rest }) => rest),
      'timeRanges': timeRanges.map(({ id, ...rest }) => rest)
    }));
  }

  return (
    <>
      <title>Job Googler - Search</title>

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
