import { describe, expect, test } from "vitest";
import {
  buildPlayerStats,
  buildTurnoversByTeam,
  formatAsText,
} from "./formatGameExport";
import { mockGame, mockEvents } from "@/mocks/savedGame";
import type { SavedEvent } from "@/mocks/savedGame";

const makeEvent = (
  overrides: Partial<SavedEvent> & Pick<SavedEvent, "eventType">,
): SavedEvent => ({
  id: 99,
  createdAt: new Date("2026-01-01"),
  gameId: 1,
  team: "Lights",
  timestamp: "2026-01-01T00:00:00Z",
  gametime: "00:00:00",
  player: null,
  additionalStats: null,
  ...overrides,
});

describe("buildPlayerStats", () => {
  test("counts all stat types from mockEvents grouped by team", () => {
    const stats = buildPlayerStats(mockEvents);
    expect(stats["Lights"]["Anna"].pulls).toBe(1);
    expect(stats["Lights"]["Anna"].throwerErrors).toBe(1);
    expect(stats["Lights"]["Anna"].scores).toBe(1);
    expect(stats["Darks"]["Ben"].scores).toBe(1);
    expect(stats["Darks"]["Carlos"].assists).toBe(1);
    expect(stats["Darks"]["Dana"].receiverErrors).toBe(1);
  });

  test("ignores events with no player", () => {
    const events = [
      makeEvent({ eventType: "score", player: null }),
      makeEvent({ eventType: "pull", player: null }),
    ];
    expect(Object.keys(buildPlayerStats(events))).toHaveLength(0);
  });

  test("unclear turnover is not attributed to any player", () => {
    const events = [
      makeEvent({
        eventType: "turnover",
        player: "Eve",
        additionalStats: { reason: "unclear" },
      }),
    ];
    const stats = buildPlayerStats(events);
    expect(stats["Lights"]?.["Eve"]).toBeUndefined();
  });
});

describe("buildTurnoversByTeam", () => {
  test("counts turnovers per team", () => {
    const counts = buildTurnoversByTeam(mockEvents);
    expect(counts["Lights"]).toBe(1);
    expect(counts["Darks"]).toBe(1);
  });

  test("returns empty object when there are no turnovers", () => {
    const events = [makeEvent({ eventType: "pull", team: "Lights" })];
    expect(buildTurnoversByTeam(events)).toEqual({});
  });
});

describe("formatAsText", () => {
  test("starts with game name and final score", () => {
    const text = formatAsText(mockGame, mockEvents);
    const lines = text.split("\n");
    expect(lines[0]).toBe("Game: Lights vs Darks");
    expect(lines[1]).toBe("Final Score: Darks 3 – Lights 5");
  });

  test("includes a Player Stats section grouped by team", () => {
    const text = formatAsText(mockGame, mockEvents);
    expect(text).toContain("Player Stats:");
    expect(text).toContain("Lights:");
    expect(text).toContain("  Anna:");
    expect(text).toContain("Darks:");
    expect(text).toContain("  Carlos:");
  });

  test("does not list players with no recorded stats", () => {
    const events = [
      makeEvent({ eventType: "score", player: "Anna" }),
    ];
    const text = formatAsText(mockGame, events);
    expect(text).not.toContain("Ben:");
  });

  test("pluralises labels correctly", () => {
    const events = [
      makeEvent({ eventType: "score", player: "Anna" }),
      makeEvent({ eventType: "score", player: "Anna" }),
      makeEvent({ eventType: "pull", player: "Ben" }),
    ];
    const text = formatAsText(mockGame, events);
    expect(text).toContain("  Anna: 2 scores");
    expect(text).toContain("  Ben: 1 pull");
  });

  test("includes an Events section with event details", () => {
    const text = formatAsText(mockGame, mockEvents);
    expect(text).toContain("Events:");
    expect(text).toContain("assist: Carlos");
    expect(text).toContain("thrower error");
    expect(text).toContain("in");
  });
});
