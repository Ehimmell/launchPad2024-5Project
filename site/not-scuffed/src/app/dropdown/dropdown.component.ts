import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() header: string = "No Header";
  @Input() content: string = "No Content Provided Yet- Add Some";
  displayContent: boolean = false;

  onToggle() {
    this.displayContent = !this.displayContent;
  }
}
