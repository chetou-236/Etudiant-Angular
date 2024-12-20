import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'etudiant';
  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Message de succès !', 'Succès');
  }
}
