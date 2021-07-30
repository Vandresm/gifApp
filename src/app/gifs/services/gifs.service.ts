import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponsive, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private _apiKey : string = 'rwUYQIIIcstQ4CaCTRZaNCnbcBZue0lj';
  
  // TODO: cambiar any
  public resultados : Gif[] = [] ;

  constructor( private http : HttpClient){ 
    localStorage.getItem('historial');
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
   }



  get historial(){
    
    return [...this._historial];
  }

  buscarGifs(query : string){

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
          this._historial.unshift(query);  
          this._historial = this._historial.splice(0,10);

          localStorage.setItem('historial' , JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponsive>(`http://api.giphy.com/v1/gifs/search?api_key=rwUYQIIIcstQ4CaCTRZaNCnbcBZue0lj&limit=15&q=${query}`)
      .subscribe(
          (resp) => {
            console.log(resp.data);
            this.resultados = resp.data;
            
          }
      );

       
    
  }
  
}
