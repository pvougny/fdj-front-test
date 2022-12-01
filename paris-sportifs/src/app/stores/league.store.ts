import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { League } from '../models/league';
import { LeagueResponse, LeagueService } from '../services/league.service';
import { filterAndSortTeams } from '../utils/team.util';

export interface LeagueState {
  query: string;
  leagueList: League[];
  leagueEntities: Record<League['idLeague'], League>;
  loadingLeagues: 'not_started' | 'in_progress' | 'success' | 'failed';
  loadingLeague: 'not_started' | 'in_progress' | 'success' | 'failed';
  error: string | null;
}

const initialState: LeagueState = {
  query: '',
  loadingLeagues: 'not_started',
  loadingLeague: 'not_started',
  error: null,
  leagueList: [],
  leagueEntities: {},
};

@Injectable()
export class LeagueStore extends ComponentStore<LeagueState> {
  constructor(private LeagueService: LeagueService) {
    super(initialState);
  }

  public loadingLeagues$: Observable<LeagueState['loadingLeagues']> = this.select((state) => state.loadingLeagues);

  public loadingLeague$: Observable<LeagueState['loadingLeague']> = this.select((state) => state.loadingLeague);

  public error$: Observable<LeagueState['error']> = this.select((state) => state.error);

  public loadLeagues = this.effect((action$: Observable<void>) => {
    return action$.pipe(
      tap(() => {
        this.patchState({
          loadingLeagues: 'in_progress',
          error: null,
        });
      }),
      switchMap(() =>
        this.LeagueService.getLeagues().pipe(
          tap((res: LeagueResponse) => {
            this.patchState({
              loadingLeagues: 'success',
              leagueList: res.leagues,
            });
          }),
          catchError((res: HttpErrorResponse) => {
            this.patchState({
              loadingLeagues: 'failed',
              error: res.error.message || 'An error occurred!',
            });

            return of([]);
          })
        )
      )
    );
  });

  public selectLeagues(): Observable<LeagueState['leagueList']> {
    return this.state$.pipe(
      filter((state) => {
        if (state.loadingLeagues === 'not_started') {
          this.loadLeagues();
          return false;
        }
        return true;
      }),
      map((state) => state.leagueList)
    );
  }
}
