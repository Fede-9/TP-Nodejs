import { UrlNavigateService } from './../../../services/url-navigate.service';
import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';
import { GlobalUrl } from '../../../data/url';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public globalText: GlobalText,
    public urlNavigateService: UrlNavigateService,
    public globalUrl: GlobalUrl
  ) { }

  navigateHome() {
    this.urlNavigateService.navigateToUrl(this.globalUrl.home);
  }
}
