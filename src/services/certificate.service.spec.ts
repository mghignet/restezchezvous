import { isExpired } from "./certificate.service";
import { Certificate } from "../models/certificate";

describe("isExpired", () => {

  it("should be expired when the date is prior to one hour ago", () => {

    const sixtyOneMinutesAgo = new Date("2020-01-01T16:59:00.000Z");
    const fiftyNineMinutesAgo = new Date("2020-01-01T17:01:00.000Z");

    const now = new Date("2020-01-01T18:00:00.000Z");
    jest
      .spyOn(Date, 'now')
      // @ts-ignore
      .mockImplementation(() => now);

    const expiredCertificate = buildCertificate(sixtyOneMinutesAgo);
    expect(isExpired(expiredCertificate)).toBe(true);
    const validCertificate = buildCertificate(fiftyNineMinutesAgo);
    expect(isExpired(validCertificate)).toBe(false);
  });

  function buildCertificate(releaseDate: Date): Certificate {
    return {
      address: "",
      birthDate: "",
      birthLocation: "",
      creationDate: new Date(0), // irrelevant here
      releaseReasons: [],
      town: "",
      zipCode: "",
      releaseDate: releaseDate,
      lastName: "",
      firstName: ""
    };
  }

});

