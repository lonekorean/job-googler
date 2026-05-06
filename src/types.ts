import defaults from './defaults.json';

export type SearchData = typeof defaults;

export type SearchState = {
  titleTerms: Term[];
  allTerms: Term[];
  anyTerms: Term[];
  jobBoards: Option[];
  timeRanges: Option[];
};

export type Term = {
  id: string;
  value: string;
};

export type Option = {
  id: string;
  name: string;
  value: string;
  selected: boolean;
}
