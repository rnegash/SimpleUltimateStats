import { describe, expect, test } from "vitest";
import { calculateGameTime } from "./calculateGameTime";

describe("calculateGameTime", () => {
  test("returns '00:00:00' when startIso is not provided", () => {
    expect(calculateGameTime("2026-05-31T14:00:00Z")).toBe("00:00:00");
  });

  test("returns '00:00:00' when start and end are the same", () => {
    expect(
      calculateGameTime("2026-05-31T14:00:00Z", "2026-05-31T14:00:00Z"),
    ).toBe("00:00:00");
  });

  test("calculates seconds only", () => {
    expect(
      calculateGameTime("2026-05-31T14:00:45Z", "2026-05-31T14:00:00Z"),
    ).toBe("00:00:45");
  });

  test("calculates minutes and seconds", () => {
    expect(
      calculateGameTime("2026-05-31T14:03:15Z", "2026-05-31T14:00:00Z"),
    ).toBe("00:03:15");
  });

  test("calculates hours, minutes, and seconds", () => {
    expect(
      calculateGameTime("2026-05-31T15:30:00Z", "2026-05-31T14:00:00Z"),
    ).toBe("01:30:00");
  });

  test("zero-pads single-digit hours, minutes, and seconds", () => {
    expect(
      calculateGameTime("2026-05-31T14:01:05Z", "2026-05-31T14:00:00Z"),
    ).toBe("00:01:05");
  });

  test("result is the same regardless of argument order (Math.abs)", () => {
    const a = "2026-05-31T14:00:00Z";
    const b = "2026-05-31T14:02:30Z";
    expect(calculateGameTime(a, b)).toBe(calculateGameTime(b, a));
  });

  test("throws on invalid endIso", () => {
    expect(() =>
      calculateGameTime("not-a-date", "2026-05-31T14:00:00Z"),
    ).toThrow();
  });

  test("throws on invalid startIso", () => {
    expect(() =>
      calculateGameTime("2026-05-31T14:00:00Z", "not-a-date"),
    ).toThrow();
  });
});
