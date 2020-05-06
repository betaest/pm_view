declare interface HTMLElement {
  $uniqueid: number;
  msMatchesSelector(selectors: string): boolean;
  mozMatchesSelector(selectors: string): boolean;
}
