import { describe, expect, test } from "vitest";
import { getScoreByTeam } from "./getScoreByTeam";
import { GameEvent } from "../types";

describe("getScoreByTeam", () => {
  test("when no score events", () => {
    const mockEvents: GameEvent[] = [
      {
        type: "pull",
        teamId: "team1",
        timestamp: "2026-05-31T14:02:15Z",
        playerId: "player12",
        gametime: "00:00:00",
        data: {
          outcome: "in",
        },
      },
    ];

    expect(getScoreByTeam("team1", null)).toBe(0);
    expect(getScoreByTeam("team1", mockEvents)).toBe(0);
  });

  test("when score events, get score for the right team", () => {
    const mockEvents: GameEvent[] = [
      {
        type: "score",
        teamId: "team1",
        timestamp: "2026-05-31T14:02:15Z",
        playerId: "player12",
        gametime: "00:00:00",
        data: {
          points: 1,
        },
      },
    ];

    expect(getScoreByTeam("team1", mockEvents)).toBe(1);
    expect(getScoreByTeam("team2", mockEvents)).toBe(0);
  });

  test("returns the last score event's points when there are multiple", () => {
    const mockEvents: GameEvent[] = [
      {
        type: "score",
        teamId: "team1",
        timestamp: "2026-05-31T14:00:00Z",
        gametime: "00:00:00",
        data: { points: 1 },
      },
      {
        type: "score",
        teamId: "team1",
        timestamp: "2026-05-31T14:05:00Z",
        gametime: "00:05:00",
        data: { points: 2 },
      },
    ];

    expect(getScoreByTeam("team1", mockEvents)).toBe(2);
  });

  test("returns 0 when the score event has no points field", () => {
    const mockEvents: GameEvent[] = [
      {
        type: "score",
        teamId: "team1",
        timestamp: "2026-05-31T14:00:00Z",
        gametime: "00:00:00",
        data: {},
      },
    ];

    expect(getScoreByTeam("team1", mockEvents)).toBe(0);
  });

  test("ignores score events from the other team", () => {
    const mockEvents: GameEvent[] = [
      {
        type: "score",
        teamId: "team2",
        timestamp: "2026-05-31T14:00:00Z",
        gametime: "00:00:00",
        data: { points: 5 },
      },
    ];

    expect(getScoreByTeam("team1", mockEvents)).toBe(0);
  });
});
