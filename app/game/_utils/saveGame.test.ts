import { describe, expect, test, vi, beforeEach } from "vitest";
import { saveGame } from "./saveGame";
import { sampleEvents } from "@/mocks/events";
import type { GameSavedStatus } from "../ClientGame";

vi.mock("@/actions/gameActions", () => ({
  addGame: vi.fn(),
}));

import { addGame } from "@/actions/gameActions";

const mockAddGame = vi.mocked(addGame);

const firstStatus = (mockFn: ReturnType<typeof vi.fn>): GameSavedStatus =>
  mockFn.mock.calls.at(0)?.[0] as GameSavedStatus;

const lastStatus = (mockFn: ReturnType<typeof vi.fn>): GameSavedStatus =>
  mockFn.mock.calls.at(-1)?.[0] as GameSavedStatus;

describe("saveGame", () => {
  const setGameSavedStatus = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("sets pending before calling addGame", async () => {
    mockAddGame.mockResolvedValueOnce(undefined);

    await saveGame(sampleEvents, setGameSavedStatus);

    expect(firstStatus(setGameSavedStatus)).toEqual({ pending: true, success: false, error: false });
  });

  test("resolves to success state when addGame succeeds", async () => {
    mockAddGame.mockResolvedValueOnce(undefined);

    await saveGame(sampleEvents, setGameSavedStatus);

    expect(lastStatus(setGameSavedStatus)).toEqual({ pending: false, success: true, error: false });
  });

  test("resolves to error state when addGame rejects", async () => {
    mockAddGame.mockRejectedValueOnce(new Error("network error"));

    await saveGame(sampleEvents, setGameSavedStatus);

    expect(lastStatus(setGameSavedStatus)).toEqual({ pending: false, success: false, error: true });
  });
});
