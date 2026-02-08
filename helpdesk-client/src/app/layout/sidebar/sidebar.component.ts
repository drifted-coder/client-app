import { Component, OnInit } from '@angular/core';
import { jwtDecoderFunc } from '../../utils/jwtDecoder';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  tokenData: any;
  ngOnInit() {
    let token = localStorage.getItem('accessToken');
    this.tokenData = jwtDecoderFunc(token);
  }
}
