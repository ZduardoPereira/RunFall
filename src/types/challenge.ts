export type ChallengeLength = 7 | 14 | 21 | 30 | 50 | 75 | 100 | 365 | 'infinite';

export interface Challenge {
  id: string;
  name: string;
  lengthDays: ChallengeLength;
  description: string;
}
