/*
 * Created By Geani Pocroianu on 11/6/19 8:35 PM
 */

import { MainView } from './new/main-view';

export class Main {
  //private _facade: MainFacade;

  constructor() {
    //this._facade = new MainFacade(Keys.FACADE_KEY);
    const test = new MainView();
  }
}

// When the window loads, Main Object will be instantiated
window.onload = () => {
  new Main();
};
