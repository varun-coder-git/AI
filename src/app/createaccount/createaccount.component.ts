import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { WindowServiceService } from '../services/window-service.service';
declare var $: any;

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
divID: any;
searchWord: any;
searchWordInput: any;
nextWordInput: any;
  constructor(public nav: NavbarService, public router: Router, private winRef: WindowServiceService) {
       this.searchWordInput = null;
    this.searchWord = false;
    this.nextWordInput = 1;
   }

  ngOnInit() {
      if (window.location.href.indexOf('create') > -1)  {
       $('html, body').animate({
          scrollTop: $("#createDiv").offset().top
          }, 0);
      } else if (window.location.href.indexOf('newroom') > -1)  {
        $('html, body').animate({
          scrollTop: $("#NewRoomDIv").offset().top
          }, 0);
      }
      else if (window.location.href.indexOf('vrexperience') > -1)  {
        $('html, body').animate({
          scrollTop: $("#VrExp").offset().top
          }, 0);
      }
      else if (window.location.href.indexOf('assignroom') > -1)  {
        $('html, body').animate({
          scrollTop: $("#AssignRoom").offset().top
          }, 0);
      }
      else if (window.location.href.indexOf('trackxapi') > -1)  {
        $('html, body').animate({
          scrollTop: $("#TrackXapi").offset().top
          }, 0);
      }
      else if (window.location.href.indexOf('mywork') > -1)  {
        $('html, body').animate({
          scrollTop: $("#shareWork").offset().top
          }, 0);
      }
    this.nav.hide();
  }

findWord() {
 this.nextWordInput++;

   for(let i = 1; i < this.nextWordInput; i++) {
     this.searchWord = this.winRef.nativeWindow.window.find(this.searchWordInput);
     if (!this.searchWord) {
       this.nextWordInput = 1;
   this.searchWord = this.winRef.nativeWindow.window.find(this.searchWordInput, 0, 1);
   while (this.winRef.nativeWindow.window.find(this.searchWordInput, 0, 1)) {continue; }
  }
 }
}

}
