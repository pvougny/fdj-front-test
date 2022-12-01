import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, take, map, combineLatest, tap, BehaviorSubject, Subject, takeUntil, debounceTime } from 'rxjs';
import { LeagueState, LeagueStore } from 'src/app/stores/league.store';
import { TeamState, TeamStore } from 'src/app/stores/team.store';

@Component({
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
})
export class LeaguesComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject();

  private _leagues$: Observable<LeagueState['leagueList']> = this.leagueStore.selectLeagues();

  private _query$: BehaviorSubject<LeagueState['query']> = new BehaviorSubject('');

  public form = new FormGroup({
    query: new FormControl<string>('', { nonNullable: true }),
  });

  public filteredLeagues$: Observable<LeagueState['leagueList']> = combineLatest([this._query$, this._leagues$]).pipe(
    map(([query, leagues]: [string, LeagueState['leagueList']]) =>
      leagues.filter((league) => !query || league.strLeague.toLowerCase().includes(query.toLowerCase()))
    )
  );

  public teams$: Observable<TeamState['teamList']> = this.teamStore.teams$;

  public loadingTeams$: Observable<TeamState['loadingTeams']> = this.teamStore.loadingTeams$;

  public error$: Observable<TeamState['error']> = this.teamStore.error$;

  constructor(private teamStore: TeamStore, private leagueStore: LeagueStore) {}

  public ngOnInit(): void {
    this.leagueStore.state$.pipe(take(1)).subscribe(({ query }) => {
      this.form.setValue({ query });
      this._query$.next(query);
    });

    this.form
      .get('query')!
      .valueChanges.pipe(takeUntil(this._destroy$))
      .subscribe((query) => {
        this.leagueStore.patchState({ query });
        this._query$.next(query);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public resetQuery(): void {
    this.form.get('query')!.setValue('');
  }

  public optionSelected(e: MatAutocompleteSelectedEvent): void {
    this.teamStore.loadTeams({ league: e.option.value });
  }
}
