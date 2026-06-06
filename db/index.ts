import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { games, scoreEvents, turnoverEvents, pullEvents } from "./schema";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

async function main() {
  // Create a game
  const game: typeof games.$inferInsert = {
    name: "Ultimate Tournament 2026",
    createdAt: new Date(),
  };

  const insertedGame = await db.insert(games).values(game).returning();
  const gameId = insertedGame[0].id;
  console.log("New game created:", insertedGame[0]);

  // Add score events
  const scoreEvent: typeof scoreEvents.$inferInsert = {
    gameId,
    team: "Team A",
    timestamp: "2026-05-31T14:05:03Z",
    gametime: "00:05:30",
    player: "Alice",
    assistBy: "Bob",
    points: 1,
  };

  await db.insert(scoreEvents).values(scoreEvent);
  console.log("Score event added!");

  // Add turnover events
  const turnoverEvent: typeof turnoverEvents.$inferInsert = {
    gameId,
    team: "Team B",
    timestamp: "2026-05-31T14:12:45Z",
    gametime: "00:12:45",
    player: "Charlie",
    reason: "receiver error",
  };

  await db.insert(turnoverEvents).values(turnoverEvent);
  console.log("Turnover event added!");

  // Add pull events
  const pullEvent: typeof pullEvents.$inferInsert = {
    gameId,
    team: "Team A",
    timestamp: "2026-05-31T14:13:00Z",
    gametime: "00:13:400",
    outcome: "caught",
  };

  await db.insert(pullEvents).values(pullEvent);
  console.log("Pull event added!");

  // Fetch all games
  const allGames = await db.select().from(games);
  console.log("All games:", allGames);
}

main();
