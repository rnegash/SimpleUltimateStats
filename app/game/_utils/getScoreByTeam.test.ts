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
});
