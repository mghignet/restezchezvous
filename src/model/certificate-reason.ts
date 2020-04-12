import { ReleaseReason } from "./release-reason";

export interface CertificateReason {
  reasons: ReleaseReason[];
  releaseDate: Date;
}
