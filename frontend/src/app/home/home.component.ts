
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { themes, ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private themeService: ThemeService) { }

  @ViewChild('sell', { read: ElementRef }) sellElement: ElementRef

  theme: themes

  subscriptions: Subscription[] = []

  ngOnInit() {
    setTimeout(() => {
      this.sellElement.nativeElement.focus()
    })
    this.subscriptions.push(this.themeService.themeSource.subscribe(theme => {
      this.theme = theme