import { ReleaseReason } from "./release-reason";

export interface CertificateReason {
  releaseReasons: ReleaseReason[];
  releaseDate: Date;
}
