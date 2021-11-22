import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent implements OnInit {
  data: { [key: string]: any } = {};
  state!: string;
  loaded = false;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.state = params.state;
      this.getData('');
    });
  }

  getData(keyword: string): void {
    const pams = {
      state: this.state,
    };
    if (keyword && keyword.length > 0) {
      Object.assign(pams, { keyword });
    }
    const opts = {
      params: new HttpParams().appendAll(pams),
    };
    this.loaded = false;
    this.http
      .get(
        `${environment.server}/${
          this.state === 'India' ? 'india_report' : 'state_report'
        }`,
        opts
      )
      .subscribe((res: any) => {
        this.data = res.facets;
        this.loaded = true;
      });
  }
}
