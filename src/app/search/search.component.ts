import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, retry, retryWhen } from "rxjs/operators";
import { SearchService } from "../search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  public loading: boolean;
  public searchTerm = new Subject<string>();
  public baseUrl = "https://api.github.com/search/repositories"; 
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page:any; //
  
  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search(){
    this.searchTerm.pipe(
      map((e: any) => {
        console.log(e.target.value);
        return e.target.value
      }),
      debounceTime(400), // wait 400 seconds 
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        return this.searchService._searchEntries(term);
      }),
      catchError((e) => {
        //handle the error and return it
        console.log(e)
        this.loading = false;
        this.errorMessage = e.message;
        return throwError(e);
      }),
    ).subscribe(v => {
        this.loading = false;  // true
        //return the results
        this.searchResults = v;
        this.paginationElements = this.searchResults;
    })
  }

  ngOnInit() {
    this.search();
  }
}
