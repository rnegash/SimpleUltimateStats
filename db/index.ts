import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { gamesTable, usersTable, eventsTable } from "./schema";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "Coach R",
    createdAt: new Date(),
  };

  const insertedUser = await db.insert(usersTable).values(user).returning();

  // Create a game
  const game: typeof gamesTable.$inferInsert = {
    name: "Ultimate Tournament 2026",
    createdAt: new Date(),
    createdBy: insertedUser[0].id,
  };

  const insertedGame = await db.insert(gamesTable).values(game).returning();
  const gameId = insertedGame[0].id;
  console.log("New game created:", insertedGame[0]);

  // Add score events
  const scoreEvent: typeof eventsTable.$inferInsert = {
    gameId,
    team: "Team A",
    timestamp: "2026-05-31T14:05:03Z",
    gametime: "00:05:30",
    player: "Alice",
    additionalStats: {
      assistBy: "Bob",
      points: 1,
    },
  };

  await db.insert(eventsTable).values(scoreEvent);
  console.log("Score event added!");

  // Add turnover events
  const turnoverEvent: typeof eventsTable.$inferInsert = {
    gameId,
    team: "Team B",
    timestamp: "2026-05-31T14:12:45Z",
    gametime: "00:12:45",
    player: "Charlie",
    additionalStats: {
      reason: "receiver error",
    },
  };

  await db.insert(eventsTable).values(turnoverEvent);
  console.log("Turnover event added!");

  // Add pull events
  const pullEvent: typeof eventsTable.$inferInsert = {
    gameId,
    team: "Team A",
    timestamp: "2026-05-31T14:13:00Z",
    gametime: "00:13:400",
    additionalStats: {
      outcome: "caught",
    },
  };

  await db.insert(eventsTable).values(pullEvent);
  console.log("Pull event added!");

  // Fetch all games
  const allGames = await db.select().from(gamesTable);
  console.log("All games:", allGames);
}

main();
