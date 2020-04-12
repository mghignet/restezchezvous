export enum ReleaseReasons {
  TRAVAIL = 'travail',
  COURSES = 'courses',
  SANTE = 'sante',
  FAMILLE = 'famille',
  SPORT = 'sport',
  JUDICIAIRE = 'judiciaire',
  MISSIONS = 'missions',
}

export type ReleaseReason =
  | ReleaseReasons.TRAVAIL
  | ReleaseReasons.COURSES
  | ReleaseReasons.SANTE
  | ReleaseReasons.FAMILLE
  | ReleaseReasons.SPORT
  | ReleaseReasons.JUDICIAIRE
  | ReleaseReasons.MISSIONS;
