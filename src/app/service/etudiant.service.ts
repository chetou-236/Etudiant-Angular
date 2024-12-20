// importation de Injectable pour declarer le service
import { Injectable } from '@angular/core';
// importation de HttpClient pour effctuer les requetes HTTP
import { HttpClient } from '@angular/common/http';
// importation du modele etudiant
import { etudiant } from '../model/etudiant';
import {Observable} from 'rxjs'
@Injectable({
  // declaration du sevice etant fourni à la racine de l'application
  providedIn: 'root'
})
export class EtudiantService {
// URL de l'APLI pour les opérations sur les étudiats
  apiUrl = 'http://localhost:3000/etudiant';

  constructor(private http:HttpClient) { }

  GetAll(){
    return this.http.get<etudiant[]>(this.apiUrl);
  }
  Create(data:etudiant){
    return this.http.post(this.apiUrl, data);
  }

  Update(data:etudiant){
    const id = data.id?.toString();
    return this.http.put(this.apiUrl +'/'+id, data);
  }

  Delete(id:string){
    return this.http.delete(this.apiUrl+ '/' +id);
  }

  Get(id:string){
    return this.http.get<etudiant>(this.apiUrl+'/'+id);
  }

}
