import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'

interface Dude {
  id: number
  who: string
  wat: string
  cool: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger ('dudeAnim', [
      transition(':enter', [
          style({
              opacity: 0,
              transform: 'scale (0.75)'
          }),      
          animate('0.2s ease')
      ]),  
      transition(':leave', [      
        animate (      
          '0.2s ease',
          style({
            opacity: 0, 
            transform: 'scale(0.75)'
          })
        )
      ])
  ])
  ]
})

export class AppComponent {
  @ViewChild('inputWho', { static: false })
  inputWho!: ElementRef;

  newWho: string = ''
  newWat: string = ''
  cool: number = 10
  characters: Dude[] = []

  ngOnInit(){
    fetch('./assets/adventure.json')
      .then(res => res.json())
      .then(json => this.characters = json)
  }

  isShort(dude: string): boolean {
    return dude.split(' ').length < 3
  }
  isLong(dude: string): boolean {
    return dude.split(' ').length > 3
  }

  addDude(event: Event) {
    if (!this.newWho || !this.newWat) return

    this.characters.push({
      id: Math.max(...this.characters.map(d => d.id))+1,
      who: this.newWho,
      wat: this.newWat,
      cool: 15
  })

  this.resetForm()
  // console.dir(this.characters)
    // this.characters.push(this.newWho)
    
  }

resetForm(){
  this.newWho = ""
  this.newWat = ""
  this.inputWho.nativeElement.focus()
}
  /* 
  Kill dude
  */
 remove(dude: { id: number; who: string; wat: string; cool: number; }){
  this.characters = this.characters.filter(item => item !== dude)
 }
}
