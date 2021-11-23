import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Funcs } from '../../Funcs/funcs';
import { environment } from 'src/environments/environment';
import { lastValueFrom, retry } from 'rxjs';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  loaded = false;
  stateDeets: { [key: string]: any } = {};
  img!: string;
  constructor(private http: HttpClient, funcs: Funcs) {}

  ngOnInit(): void {
    this.fetchData('');
  }

  async fetchData(keyword: string): Promise<void> {
    const obj = {};
    if (keyword && keyword.length > 0) {
      Object.assign(obj, { keyword });
    }
    const opts = {
      params: new HttpParams().appendAll(obj),
    };
    for (const i of [1, 2, 3, 4]) {
      const r: { [key: string]: any } = await lastValueFrom(
        this.http
          .get(`${environment.server}/all_count_${i}`, opts)
          .pipe(retry(3))
      );
      for (const key in r) {
        if (key !== 'page' && r.hasOwnProperty(key)) {
          this.stateDeets[key] = r[key];
        }
      }
      const image: any = await lastValueFrom(
        this.http.post(`${environment.server}/getMap/`, {
          count: this.stateDeets,
        })
      );
      this.img =
        'data:image/jpeg;base64,' +
        image.image.slice(2, image.image.length - 1);
    }
    this.loaded = true;
  }
}
