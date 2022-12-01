import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  {
    path: 'leagues',
    component: LeaguesComponent,
  },
  {
    path: 'team/:id',
    component: TeamComponent,
  },
  {
    path: '**',
    redirectTo: '/leagues',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
