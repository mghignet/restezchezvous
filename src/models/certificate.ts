export interface Certificate {
  // User properties
  firstName: string;
  lastName: string;
  birthDate: string;
  birthLocation: string;
  address: string;
  zipCode: string;
  town: string;

  // Reason properties
  releaseReasons: string[];
  releaseDate: Date;

  // Own properties
  creationDate: Date;
}
