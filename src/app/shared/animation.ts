import {style, animate, transition, state, trigger} from '@angular/core';


export class Animations {
  static page = [
    trigger('routeAnimation', [
     state('void', style({opacity:0}) ),
    state('*', style({opacity:1}) ),
      transition('void => *', [
        style({transform: 'translateX(-100px)', opacity: 0}),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
      ])
      // transition('* => void',
      //   animate(0, style({
      //     transform: 'translateY(100%)',
      //     opacity: 0
      //   }))
      // )
    ])
  ];

  static dashboardAnimation = [
    Animations.page,
    trigger('testState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#fff',
        transform: 'scale(1.5)'
      })),
      transition('inactive <=> active', animate(300))
    ])
  ];
  
}