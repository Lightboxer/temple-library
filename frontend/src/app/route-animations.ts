import { trigger, transition, style, animate, } from '@angular/animations';

export const fader =
    trigger('routeAnimations', [
        transition('* <=> *'