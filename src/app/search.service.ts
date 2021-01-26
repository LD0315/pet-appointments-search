import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //public baseUrl = "https://api.github.com/search/repositories";
  public baseUrl = "https://localhost:5001/appointments/get_all";
  public searchResults: any;

  constructor(private httpClient: HttpClient) { } 
  
  public searchEntries(term): Observable<any>{
    if (term === "" ){
      return this.httpClient.get(this.baseUrl).pipe(
        map(response => {
          console.log("Linlindbg", response)
          return this.searchResults = response;
        })
      );
    }else{
   
      return this.httpClient.get(this.baseUrl + "?search=" + term).pipe(
        map(response => {
          console.log("Linlindbg", response)
          return this.searchResults = response;
        })
      );
    }
    
  }

  //returns the response 
  public _searchEntries(term){
    return this.searchEntries(term);
  }
}