import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'tinystock-models';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ErrorService } from '../