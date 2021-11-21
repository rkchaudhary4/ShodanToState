import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './cves.component.html',
  styleUrls: ['./cves.component.css'],
})
export class CvesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  loaded = false;
  data = new MatTableDataSource();
  cols = ['id', 'summary', 'published', 'cvss', 'search'];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  fetchData(): void {
    this.http
      .get(environment.server + '/LatestCVES/50')
      .subscribe((res: any) => {
        this.loaded = true;
        this.data.data = res.data;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }
}
