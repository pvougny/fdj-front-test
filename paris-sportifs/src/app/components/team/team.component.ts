import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamState, TeamStore } from 'src/app/stores/team.store';

@Component({
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  public team$: Observable<Team> = this.route.params.pipe(
    switchMap((params) => this.teamStore.selectTeam(params['id']))
  );

  public title$: Observable<Team['strTeam']> = this.team$.pipe(map((team) => team?.strTeam || ''));

  public loadingTeam$: Observable<TeamState['loadingTeam']> = this.teamStore.loadingTeam$;

  public error$: Observable<TeamState['error']> = this.teamStore.error$;

  constructor(private router: Router, private route: ActivatedRoute, private teamStore: TeamStore) {}

  public back(): void {
    this.router.navigate(['/leagues']);
  }
}
