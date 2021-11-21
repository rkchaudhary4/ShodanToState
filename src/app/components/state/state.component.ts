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
      const opts = {
        params: new HttpParams().set('state', params.state),
      };
      this.http
        .get(`${environment.server}/state_report`, opts)
        .subscribe((res: any) => {
          this.data = res.facets;
          console.log(res);
          this.loaded = true;
        });
    });
  }
}
