import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NativeService {


  constructor() { }

  setStorage(key: string,  value: any): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromStorage(key: string): Object{
    return JSON.parse(localStorage.getItem(key));
  }

  remStorage(key: string): void{
    localStorage.removeItem(key);
  }

  clearStorage(): void{
    localStorage.clear();
  }

}
