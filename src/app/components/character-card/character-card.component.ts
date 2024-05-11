import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CharacterModel} from "../../core/models/character.model";

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {

  @Input()
  character: CharacterModel;
  @Input()
  show: string[] = ['status', 'species', 'gender'];

  @Output()
  clicked = new EventEmitter();

  click(id: number) {
    this.clicked.emit(id);
  }
}
