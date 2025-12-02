import { Component } from '@angular/core';
import { ConfigurationContainer } from 'src/app/models/configurationContainer.model';
import { ListItemService } from 'src/app/services/listItem/listItem.service';

@Component({
  selector: 'mobentis-configuration-general',
  templateUrl: './configuration-general.component.html',
  styleUrls: ['./configuration-general.component.scss'],
})
export class ConfigurationGeneralComponent {
  containers: ConfigurationContainer[] = [];

  constructor(
    private _listItemService: ListItemService
  ) {}

  ngOnInit(): void {
    this.loadContainers();
  }

  private loadContainers(): void {
    this._listItemService.getConfigContainers().subscribe((data) => {
      this.containers = data;
    });
  }
}
