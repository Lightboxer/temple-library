import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'tinystock-models';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ErrorService } from '../services/error.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-items',
  temp