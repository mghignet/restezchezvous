export enum ReleaseReasons {
  TRAVAIL = 'travail',
  ACHATS = 'achats',
  SANTE = 'sante',
  FAMILLE = 'famille',
  HANDICAP = 'handicap',
  SPORT_ANIMAUX = 'sport_animaux',
  CONVOCATION = 'convocation',
  MISSIONS = 'missions',
  ENFANTS = 'enfants',
}

export type ReleaseReason =
  | ReleaseReasons.TRAVAIL
  | ReleaseReasons.ACHATS
  | ReleaseReasons.SANTE
  | ReleaseReasons.FAMILLE
  | ReleaseReasons.HANDICAP
  | ReleaseReasons.SPORT_ANIMAUX
  | ReleaseReasons.CONVOCATION
  | ReleaseReasons.MISSIONS
  | ReleaseReasons.ENFANTS;
