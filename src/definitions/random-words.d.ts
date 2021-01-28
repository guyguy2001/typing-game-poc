declare module 'random-words' {
export interface IRandomWordsOptions {
  min?: number;
  max?: number;
  exactly?: number;
  join?: string;
  wordsPerString?: number;
  separator?: string;
  formatter?: (word: string, index: number) => string;
}

  function randomWords(options: IRandomWordsOptions): string | Array<string>;
  export default randomWords;
}