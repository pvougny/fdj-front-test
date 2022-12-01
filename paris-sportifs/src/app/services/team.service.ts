import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team';

export interface TeamResponse {
  teams: Team[];
}

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly baseUrl = `${environment.api}/json/${environment.apiKey}`;

  constructor(private httpClient: HttpClient) {}

  public getTeamsByLeague(league: string): Observable<TeamResponse> {
    return this.httpClient.get<TeamResponse>(`${this.baseUrl}/search_all_teams.php`, {
      params: {
        l: league,
      },
    });
  }

  public getTeam(team: string): Observable<TeamResponse> {
    return this.httpClient.get<TeamResponse>(`${this.baseUrl}/searchteams.php`, {
      params: {
        t: team,
      },
    });
  }
}
