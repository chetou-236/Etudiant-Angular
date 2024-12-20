import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEtudiantComponent } from '../add-etudiant/add-etudiant.component';
import { etudiant } from '../../model/etudiant';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../../service/etudiant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-etudiant',
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit, OnDestroy {
  // definition du liste d'etudiants
  etudList: etudiant[] = [];
  // tableau d'affichage
  datatable!: MatTableDataSource<etudiant>;
  // conlonnes
  displayColumn: string[] = ['nom', 'prenom', 'niveau', 'actions'];

  subscriptions = new Subscription();

  constructor(private dialog: MatDialog, private service: EtudiantService) { }

  ngOnInit(): void {
    this.getEtudiants();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getEtudiants() {
    let sub = this.service.GetAll().subscribe(item => {
      this.etudList = item;
      this.datatable = new MatTableDataSource(this.etudList);
    });
    this.subscriptions.add(sub);
  }

  openpopup(etudId: string) {
    this.dialog.open(AddEtudiantComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        'code': etudId,
      }
    }).afterClosed().subscribe(o => {
      this.getEtudiants();
    })
  }

  addEtudiant() {
    this.openpopup('');
  }

  deleteEtudiant(etudId: string) {
    if (confirm("Est que tu es sur de vouloir Supprimer!")) {
      let sub = this.service.Delete(etudId).subscribe(item => {
        this.getEtudiants();
      });
    }
  }

  editEtudiant(etudId: string) {
    this.openpopup(etudId);
  }
}
