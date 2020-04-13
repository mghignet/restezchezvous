import { isExpired } from "./certificate.service";
import { Certificate } from "../models/certificate";
import { ReleaseReason, ReleaseReasons } from "../models/release-reason";

describe("isExpired", () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be expired is no release reason is provided", () => {

    const expiredCertificate = buildCertificate(new Date(), []);
    expect(isExpired(expiredCertificate)).toBe(true);
  });

  it("should expire after one hour when reason is SPORT only", () => {

    const sixtyOneMinutesAgo = new Date("2020-01-01T16:59:00.000Z");
    const fiftyNineMinutesAgo = new Date("2020-01-01T17:01:00.000Z");

    const now = new Date("2020-01-01T18:00:00.000Z");
    jest
      .spyOn(Date, 'now')
      // @ts-ignore
      .mockImplementation(() => now);

    const expiredCertificate = buildCertificate(sixtyOneMinutesAgo, [ReleaseReasons.SPORT]);
    expect(isExpired(expiredCertificate)).toBe(true);
    const validCertificate = buildCertificate(fiftyNineMinutesAgo, [ReleaseReasons.SPORT]);
    expect(isExpired(validCertificate)).toBe(false);
  });

  it("should not be expired id date is in the future", () => {

    const futureDate = new Date("2020-01-01T19:00:00.000Z");

    const now = new Date("2020-01-01T18:00:00.000Z");
    jest
      .spyOn(Date, 'now')
      // @ts-ignore
      .mockImplementation(() => now);

    const expiredCertificate = buildCertificate(futureDate, [ReleaseReasons.SPORT]);
    expect(isExpired(expiredCertificate)).toBe(false);
  });

  it("should expire at the end of the day when reasons include COURSE, SANTE, FAMILLE, JUDICIAIRE but not TRAVAIL or MISSIONS", () => {

    const todayDate = new Date("2020-01-02T14:00:00.000Z");
    const yesterdayDate = new Date("2020-01-01T17:00:00.000Z");

    const now = new Date("2020-01-02T18:00:00.000Z");
    jest
      .spyOn(Date, 'now')
      // @ts-ignore
      .mockImplementation(() => now);

    const expiredCertificate = buildCertificate(yesterdayDate, [ReleaseReasons.SPORT, ReleaseReasons.COURSES]);
    expect(isExpired(expiredCertificate)).toBe(true);
    const validCertificate = buildCertificate(todayDate, [ReleaseReasons.SPORT, ReleaseReasons.COURSES]);
    expect(isExpired(validCertificate)).toBe(false);
  });

  it("should expire 24h later when reasons include TRAVAIL or MISSIONS", () => {

    const before24HoursEarlier = new Date("2020-01-01T17:59:00.000Z");
    const after24HoursEarlier = new Date("2020-01-01T18:01:00.000Z");

    const now = new Date("2020-01-02T18:00:00.000Z");
    jest
      .spyOn(Date, 'now')
      // @ts-ignore
      .mockImplementation(() => now);

    const expiredCertificate = buildCertificate(before24HoursEarlier, [ReleaseReasons.COURSES, ReleaseReasons.TRAVAIL]);
    expect(isExpired(expiredCertificate)).toBe(true);
    const validCertificate = buildCertificate(after24HoursEarlier, [ReleaseReasons.COURSES, ReleaseReasons.TRAVAIL]);
    expect(isExpired(validCertificate)).toBe(false);
  });

  function buildCertificate(releaseDate: Date, releaseReasons: ReleaseReason[]): Certificate {
    return {
      address: "",
      birthDate: "",
      birthLocation: "",
      creationDate: new Date(0), // irrelevant here
      releaseReasons: releaseReasons,
      town: "",
      zipCode: "",
      releaseDate: releaseDate,
      lastName: "",
      firstName: ""
    };
  }

});

