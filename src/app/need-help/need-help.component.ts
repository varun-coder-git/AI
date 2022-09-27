import { Component, OnInit,  ViewChild } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { WindowServiceService } from '../services/window-service.service';
declare var $: any;

@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.css']
})
export class NeedHelpComponent implements OnInit {
imgSrc: any;
searchWord: any;
searchWordInput: any;
nextWordInput: any;
  constructor(public nav: NavbarService, public router: Router, private winRef: WindowServiceService) {
    this.imgSrc = 'assets/images/needhelp/mobileApp.png';
    this.searchWordInput = null;
    this.searchWord = false;
    this.nextWordInput = 1;
  }

  ngOnInit() {
   window.scroll(0, 0);
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
