import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { League } from '../models/league';

export interface LeagueResponse {
  leagues: League[];
}

@Injectable({ providedIn: 'root' })
export class LeagueService {
  private readonly baseUrl = `${environment.api}/json/${environment.apiKey}`;

  constructor(private httpClient: HttpClient) {}

  public getLeagues(): Observable<LeagueResponse> {
    return this.httpClient.get<LeagueResponse>(`${this.baseUrl}/all_leagues.php`);
  }
}
