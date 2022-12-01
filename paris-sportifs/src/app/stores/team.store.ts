import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { Team } from '../models/team';
import { TeamResponse, TeamService } from '../services/team.service';
import { filterAndSortTeams } from '../utils/team.util';

export interface TeamState {
  teamList: Team[];
  teamEntities: Record<Team['idTeam'], Team>;
  loadingTeams: 'not_started' | 'in_progress' | 'success' | 'failed';
  loadingTeam: 'not_started' | 'in_progress' | 'success' | 'failed';
  error: string | null;
}

const initialState: TeamState = {
  loadingTeams: 'not_started',
  loadingTeam: 'not_started',
  error: null,
  teamList: [],
  teamEntities: {},
};

@Injectable()
export class TeamStore extends ComponentStore<TeamState> {
  constructor(private teamService: TeamService) {
    super(initialState);
  }

  public teams$: Observable<TeamState['teamList']> = this.select((state) => state.teamList);

  public loadingTeams$: Observable<TeamState['loadingTeams']> = this.select((state) => state.loadingTeams);

  public loadingTeam$: Observable<TeamState['loadingTeam']> = this.select((state) => state.loadingTeam);

  public error$: Observable<TeamState['error']> = this.select((state) => state.error);

  public loadTeams = this.effect((action$: Observable<{ league: string }>) => {
    return action$.pipe(
      tap(() => {
        this.patchState({
          loadingTeams: 'in_progress',
          error: null,
        });
      }),
      switchMap(({ league }) =>
        this.teamService.getTeamsByLeague(league).pipe(
          tap((res: TeamResponse) => {
            this.patchState({ loadingTeams: 'success', teamList: filterAndSortTeams(res.teams) });
          }),
          catchError((res: HttpErrorResponse) => {
            this.patchState({
              loadingTeams: 'failed',
              error: res.error.message || 'An error occurred!',
            });

            return of([]);
          })
        )
      )
    );
  });

  public loadTeam = this.effect((action$: Observable<{ team: string }>) => {
    return action$.pipe(
      tap(() => {
        this.patchState({ error: null, loadingTeam: 'in_progress' });
      }),
      switchMap(({ team }) =>
        this.teamService.getTeam(team).pipe(
          tap((res: TeamResponse) => {
            const team = res.teams[0];

            this.patchState((state) => ({
              loadingTeam: 'success',
              teamEntities: { ...state.teamEntities, [team.strTeam]: team },
            }));
          }),
          catchError((res: HttpErrorResponse) => {
            this.patchState({
              loadingTeam: 'failed',
              error: res.error.message || 'An error occurred!',
            });

            return of(null);
          })
        )
      )
    );
  });

  public selectTeam(id: Team['strTeam']): Observable<Team> {
    return this.state$.pipe(
      filter((state) => {
        if (!state.teamEntities[id] && state.loadingTeam !== 'in_progress') {
          this.loadTeam({ team: id });
          return false;
        }
        return true;
      }),
      map((state) => state.teamEntities[id])
    );
  }
}
