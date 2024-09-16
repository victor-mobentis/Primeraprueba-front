import { Component, Input } from '@angular/core';
import { ListItem } from 'src/app/models/listItem.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  @Input() listItem!: ListItem;

  handlePopup(): void {
    if (this.listItem.popupFunction) {
      this.listItem.popupFunction();  
    } 
  }
}


