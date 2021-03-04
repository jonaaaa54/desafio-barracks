import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css']
})
export class DataPanelComponent implements OnInit {

  activatedToken: string | null = localStorage.getItem('token');

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }


  logOut(){
    this.authService.logOut();
    this.router.navigate(['']);
  }

}
