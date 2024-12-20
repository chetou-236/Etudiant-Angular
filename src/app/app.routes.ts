import { Routes } from '@angular/router';
import { EtudiantComponent } from './component/etudiant/etudiant.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/etudiant',
        pathMatch: 'full'
    },
    {
        path: 'etudiant', component: EtudiantComponent
    }
];
