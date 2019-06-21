import { Component } from '@angular/core';
import { KeywordTransportService } from './keyword-transport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FoodSearchApp';

  constructor(private data: KeywordTransportService) {

  }
  
}
