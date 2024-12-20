import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import { etudiant } from '../../model/etudiant';
import { EtudiantService } from '../../service/etudiant.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-etudiant',
  imports: [
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.css']
})
export class AddEtudiantComponent implements OnInit {
  title = 'Add Etudiant';
  dialodata: any;
  isEdit = false;

  etudiantForm: FormGroup;

  constructor(
    private service: EtudiantService,
    private ref: MatDialogRef<AddEtudiantComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    //Initialisation du formulaire
    this.etudiantForm = new FormGroup({
      id: new FormControl<number | null>(null),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      niveau: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.dialodata = this.data;
    if (this.dialodata && this.dialodata.code) {
      this.title = 'Edit Etudiant';
      this.isEdit = true;
      this.service.Get(this.dialodata.code).subscribe({
        next: (item) => {
          console.log('Donnees recuperer: ', item);
          if (item) {
            this.etudiantForm.setValue({
              id: item.id ?? null,
              nom: item.nom,
              prenom: item.prenom,
              niveau: item.niveau,
            });
            console.log('Les valeurs du formulaire: ', this.etudiantForm.value);
          } else {
            this.toastr.error('Impossible de trouver les données pour étudiant', 'Erreur');
          }
        },
        error: (err) => {
          console.log('Erreur lors de la recuperation des donnees', err);
          this.toastr.error('Erreur lors de la récupération des données', 'Erreur');
        }
      });

    }else{
      this.title = 'Ajout d\'etudiant';
    }
  }
  onSubmit() {
    if (this.etudiantForm.valid) {
      let _data: etudiant = {
        id: this.isEdit ? this.etudiantForm.value.id?.toString() : undefined,
        nom: this.etudiantForm.value.nom as string,
        prenom: this.etudiantForm.value.prenom as string,
        niveau: this.etudiantForm.value.niveau as string,
      };

      const observer = {
        next: (item: any) => {
          if (item) {
            this.toastr.success('Etudiant ' + (this.isEdit ? 'modifié' : 'ajouté') + ' avec succès', 'Succès');
            this.onCancel();
          } else {
            this.toastr.error('Erreur lors de l' + (this.isEdit ? 'modification' : 'ajout') + ' de l\'étudiant', 'Erreur');
          }
        }
      };

      if (this.isEdit) {
        this.service.Update(_data).subscribe(observer);
      } else {
        delete _data.id;
        this.service.Create(_data).subscribe(observer);
      }

    }
  }

  onCancel() {
    this.ref.close();
  }
} 
