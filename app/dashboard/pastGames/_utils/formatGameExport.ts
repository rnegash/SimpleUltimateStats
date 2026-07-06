import type { InferSelectModel } from "drizzle-orm";
import type { eventsTable, gamesTable } from "@/db/schema/simpleUltiStats";

export type Game = InferSelectModel<typeof gamesTable>;
export type GameEvent = InferSelectModel<typeof eventsTable>;

export type PlayerStats = {
  scores: number;
  assists: number;
  throwerErrors: number;
  receiverErrors: number;
  pulls: number;
};

export function buildPlayerStats(events: GameEvent[]) {
  const stats: Record<string, Record<string, PlayerStats>> = {};

  const getOrInit = (team: string, name: string): PlayerStats => {
    stats[team] ??= {};
    stats[team][name] ??= {
      scores: 0,
      assists: 0,
      throwerErrors: 0,
      receiverErrors: 0,
      pulls: 0,
    };
    return stats[team][name];
  };

  for (const event of events) {
    const additional = event.additionalStats as Record<string, unknown> | null;

    if (event.eventType === "score") {
      if (event.player) getOrInit(event.team, event.player).scores += 1;
      const assistBy = additional?.assistBy;
      if (typeof assistBy === "string" && assistBy)
        getOrInit(event.team, assistBy).assists += 1;
    } else if (event.eventType === "turnover" && event.player) {
      const reason = additional?.reason;
      if (reason === "thrower error")
        getOrInit(event.team, event.player).throwerErrors += 1;
      else if (reason === "receiver error")
        getOrInit(event.team, event.player).receiverErrors += 1;
    } else if (event.eventType === "pull" && event.player) {
      getOrInit(event.team, event.player).pulls += 1;
    }
  }

  return stats;
}

function plural(count: number, word: string): string {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

export function buildTurnoversByTeam(
  events: GameEvent[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  const turnoverEvents = events.filter(
    ({ eventType }) => eventType === "turnover",
  );

  for (const turnoverEvent of turnoverEvents) {
    counts[turnoverEvent.team] = (counts[turnoverEvent.team] ?? 0) + 1;
  }

  return counts;
}

export function formatScore(game: Game) {
  return `Darks ${game.darksScore} – Lights ${game.lightsScore}`;
}

export function formatAsText(game: Game, events: GameEvent[]) {
  const lines: string[] = [];

  lines.push(`Game: ${game.name}`);
  lines.push(`Final Score: ${formatScore(game)}`);

  const turnoversByTeam = buildTurnoversByTeam(events);
  if (Object.keys(turnoversByTeam).length > 0) {
    const summary = Object.entries(turnoversByTeam)
      .map(([team, count]) => `${team} ${plural(count, "turnover")}`)
      .join(", ");
    lines.push(`Turnovers: ${summary}`);
  }

  lines.push("");

  const playerStats = buildPlayerStats(events);
  lines.push("Player Stats:");
  for (const [team, players] of Object.entries(playerStats)) {
    lines.push(`${team}:`);
    for (const [player, s] of Object.entries(players)) {
      const parts: string[] = [];

      if (s.scores) parts.push(plural(s.scores, "score"));
      if (s.assists) parts.push(plural(s.assists, "assist"));
      if (s.throwerErrors) parts.push(plural(s.throwerErrors, "thrower error"));
      if (s.receiverErrors)
        parts.push(plural(s.receiverErrors, "receiver error"));
      if (s.pulls) parts.push(plural(s.pulls, "pull"));

      lines.push(`  ${player}: ${parts.join(", ")}`);
    }
  }

  lines.push("");

  lines.push("Events:");
  for (const event of events) {
    const additional = event.additionalStats as Record<string, unknown> | null;
    const parts: string[] = [event.eventType ?? ""];

    if (event.player) parts.push(event.player);
    if (event.team) parts.push(`(${event.team})`);
    if (event.gametime) parts.push(`@ ${event.gametime}`);
    if (event.eventType === "score" && additional?.assistBy)
      parts.push(`assist: ${additional.assistBy}`);
    if (event.eventType === "turnover" && additional?.reason)
      parts.push(`${additional.reason}`);
    if (event.eventType === "pull" && additional?.outcome)
      parts.push(`${additional.outcome}`);
    lines.push(parts.join(" - "));
  }

  return lines.join("\n");
}
