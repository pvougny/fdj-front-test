import { MOCK_TEAM } from '../mocks/team.mock';
import { Team } from '../models/team';
import { filterAndSortTeams } from './team.util';

describe('filterAndSortTeams', () => {
  it('[] should be []', () => {
    const input: Team[] = [];
    const output: Team[] = [];

    expect(filterAndSortTeams(input)).toEqual(output);
  });

  it('[A] should be [A]', () => {
    const input: Team[] = [{ ...MOCK_TEAM, strTeam: 'A' }];
    const output: Team[] = [{ ...MOCK_TEAM, strTeam: 'A' }];

    expect(filterAndSortTeams(input)).toEqual(output);
  });

  it('[A, B] should be [A]', () => {
    const input: Team[] = [
      { ...MOCK_TEAM, strTeam: 'A' },
      { ...MOCK_TEAM, strTeam: 'B' },
    ];
    const output: Team[] = [{ ...MOCK_TEAM, strTeam: 'A' }];

    expect(filterAndSortTeams(input)).toEqual(output);
  });

  it('[A, B, C] should be [C, A]', () => {
    const input: Team[] = [
      { ...MOCK_TEAM, strTeam: 'A' },
      { ...MOCK_TEAM, strTeam: 'B' },
      { ...MOCK_TEAM, strTeam: 'C' },
    ];
    const output: Team[] = [
      { ...MOCK_TEAM, strTeam: 'C' },
      { ...MOCK_TEAM, strTeam: 'A' },
    ];

    expect(filterAndSortTeams(input)).toEqual(output);
  });

  it('[A, B, C, D] should be [C, A]', () => {
    const input: Team[] = [
      { ...MOCK_TEAM, strTeam: 'A' },
      { ...MOCK_TEAM, strTeam: 'B' },
      { ...MOCK_TEAM, strTeam: 'C' },
      { ...MOCK_TEAM, strTeam: 'D' },
    ];
    const output: Team[] = [
      { ...MOCK_TEAM, strTeam: 'C' },
      { ...MOCK_TEAM, strTeam: 'A' },
    ];

    expect(filterAndSortTeams(input)).toEqual(output);
  });

  it('[A, B, C, D, E] should be [E, C, A]', () => {
    const input: Team[] = [
      { ...MOCK_TEAM, strTeam: 'A' },
      { ...MOCK_TEAM, strTeam: 'B' },
      { ...MOCK_TEAM, strTeam: 'C' },
      { ...MOCK_TEAM, strTeam: 'D' },
      { ...MOCK_TEAM, strTeam: 'E' },
    ];
    const output: Team[] = [
      { ...MOCK_TEAM, strTeam: 'E' },
      { ...MOCK_TEAM, strTeam: 'C' },
      { ...MOCK_TEAM, strTeam: 'A' },
    ];

    expect(filterAndSortTeams(input)).toEqual(output);
  });
});
