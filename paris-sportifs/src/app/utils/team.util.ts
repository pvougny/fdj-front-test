import { Team } from '../models/team';

/**
 * Take one out of two teams, and sort them descendingly by `strTeam`.
 *
 * @param teams Collection of `Team`
 * @returns Filtered and sorted collection
 */
export function filterAndSortTeams(teams: Team[]): Team[] {
  return teams.filter((team, index) => index % 2 === 0).sort((a: Team, b: Team) => (a.strTeam < b.strTeam ? 1 : -1));
}
