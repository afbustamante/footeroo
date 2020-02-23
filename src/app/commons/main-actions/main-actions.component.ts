import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.css']
})
export class MainActionsComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('appointment-new', sanitizer.bypassSecurityTrustResourceUrl('assets/img/actions/appointment-new.svg'));
    iconRegistry.addSvgIcon('go-home', sanitizer.bypassSecurityTrustResourceUrl('assets/img/actions/go-home.svg'));
    iconRegistry.addSvgIcon('list-add', sanitizer.bypassSecurityTrustResourceUrl('assets/img/actions/list-add.svg'));
    iconRegistry.addSvgIcon('system-search', sanitizer.bypassSecurityTrustResourceUrl('assets/img/actions/system-search.svg'));
    iconRegistry.addSvgIcon('office-calendar', sanitizer.bypassSecurityTrustResourceUrl('assets/img/apps/office-calendar.svg'));
  }

  ngOnInit(): void {
  }

}
