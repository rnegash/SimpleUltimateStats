CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"eventType" text,
	"gameId" integer NOT NULL,
	"team" varchar(255) NOT NULL,
	"timestamp" varchar(255) NOT NULL,
	"gametime" varchar(255) NOT NULL,
	"player" varchar(255),
	"additionalStats" json
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "players_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_gameId_games_id_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id");--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_createdBy_users_id_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_createdBy_users_id_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id");