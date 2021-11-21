import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Funcs } from '../../Funcs/funcs';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  loaded: boolean | null = null;
  expandedElement: any;
  payload = {
    CVE_id: '',
    keyword: '',
    pincode: '',
  };
  cols = ['ip_str', 'city', 'org', 'deets'];
  data = new MatTableDataSource();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private funcs: Funcs
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['cve']) {
        this.payload.CVE_id = params['cve'];
      }
    });
    this.data.paginator = this.paginator;
  }

  getData(form: any): void {
    const obj = {};
    if (form.keyword.length > 0) {
      Object.assign(obj, { keyword: form.keyword });
    }
    if (form.pincode.length > 0) {
      Object.assign(obj, { pincode: form.pincode });
    }
    if (form.CVE_id.length > 0) {
      Object.assign(obj, { CVE_id: form.CVE_id });
    }
    const opts = {
      params: new HttpParams().appendAll(obj),
    };
    this.loaded = false;
    this.http
      .get(environment.server + '/search', opts)
      .subscribe((res: any) => {
        if (res.data.length === 0) {
          this.funcs.handleMessages('NO IPs with given conditions are present');
        }
        this.data.data = res.data;
        this.loaded = true;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }
}
