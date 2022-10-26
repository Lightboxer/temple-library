import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  themeSource = new BehaviorSubject(themes.responsiveTheme);

  updateTheme(theme: themes) {
    this.themeSource.next(them