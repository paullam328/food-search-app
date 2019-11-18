import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { KeywordTransportService } from '../keyword-transport.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  Keywords: string[] = [];
  InputKeyword: string = "";
  DeleteKeyword: string = "";
  IsInitializationDone: boolean = false;
  ChangeFromKeyword: string = "";
  ChangeToKeyword: string = "";
  
  constructor(private searchService: SearchService, private data: KeywordTransportService) {

   }

  ngOnInit() {
    this.getKeywords();
    this.data.changeKeywords(this.Keywords);
  }
  
  //InputAction for clicking the 'Add' button
  onAddClick(){
    this.searchService.setKeyword(this.InputKeyword).subscribe((response) => {
      console.log("subscribed!");
      //Asynchronous, so after callback, get all the keywords to display everything
      this.getKeywords();//then, get an updated list of keywords
    })
  }

  //Get the keywords to store them into the keywords array:
  getKeywords() {
    this.Keywords = [];
    //Subscribe to the keywords array and store them:
    this.searchService.getKeywords().subscribe((response) => {

      //for each keyword, push it into an array of keywords:
      for (var i:number = 0; i < response.data.length; i++) {
        this.Keywords.push(response.data[i].keyword);
      }

      this.data.changeKeywords(this.Keywords);

      //Initialize for edge case: on page load then click delete:
      if (!this.IsInitializationDone) {
        this.DeleteKeyword = this.Keywords[0];
        this.IsInitializationDone = true;
      }

      this.InputKeyword = ""; //clear
      this.ChangeFromKeyword = "";
      this.ChangeToKeyword = "";
    });
  }

  //InputAction for clicking the 'Delete' button
  deleteKeyword() {
      if (this.DeleteKeyword != "") {
      this.searchService.deleteKeyword(this.DeleteKeyword).subscribe((response) => {

        this.getKeywords();
      });
    }
  }
  
  //InputAction for clicking the 'Change' button
  onChangeClick(){
    this.searchService.putKeyword(this.ChangeFromKeyword, this.ChangeToKeyword).subscribe((response) => {

      //Asynchronous, so after callback, get all the keywords to display everything
      this.getKeywords();//then, get an updated list of keywords
      
    })
  }

  onDropdownUpdate() {

  }

  onChangeFromUpdate() {

  }


}
