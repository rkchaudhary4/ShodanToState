import { ReportComponent } from './components/report/report.component';
import { SearchComponent } from './components/search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvesComponent } from './components/cves/cves.component';
import { CveDeetsComponent } from './components/cve-deets/cve-deets.component';
import { StateComponent } from './components/state/state.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'cves',
    component: CvesComponent,
  },
  {
    path: 'cve/:id',
    component: CveDeetsComponent,
  },
  {
    path: 'states',
    component: ReportComponent,
  },
  {
    path: 'state/:state',
    component: StateComponent,
  },
  {
    path: '**',
    redirectTo: 'search',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
