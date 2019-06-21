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
  
  onAddClick(){
    this.searchService.setKeyword(this.InputKeyword).subscribe((response) => {
      console.log("subscribed!");
      //Asynchronous, so after callback, get all the keywords to display everything
      this.getKeywords();//then, get an updated list of keywords
    })
  }

  getKeywords() {
    this.Keywords = [];
    this.searchService.getKeywords().subscribe((response) => {
      //console.log(response.data);
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

  deleteKeyword() {
      if (this.DeleteKeyword != "") {
      this.searchService.deleteKeyword(this.DeleteKeyword).subscribe((response) => {
        //console.log(response.data);
        this.getKeywords();
      });
    }
  }

  onChangeClick(){
    this.searchService.putKeyword(this.ChangeFromKeyword, this.ChangeToKeyword).subscribe((response) => {
      //console.log("subscribed!");
      //Asynchronous, so after callback, get all the keywords to display everything
      this.getKeywords();//then, get an updated list of keywords
      
    })
  }

  onDropdownUpdate() {

  }

  onChangeFromUpdate() {

  }


}
