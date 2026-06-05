CREATE TABLE "games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "players_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pull_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pull_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"outcome" text,
	"game_id" integer NOT NULL,
	"team" varchar(255) NOT NULL,
	"timestamp" varchar(255) NOT NULL,
	"gametime" varchar(255) NOT NULL,
	"player" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "score_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "score_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"assist_by" varchar(255),
	"points" integer,
	"game_id" integer NOT NULL,
	"team" varchar(255) NOT NULL,
	"timestamp" varchar(255) NOT NULL,
	"gametime" varchar(255) NOT NULL,
	"player" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "turnover_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "turnover_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"reason" varchar(255),
	"game_id" integer NOT NULL,
	"team" varchar(255) NOT NULL,
	"timestamp" varchar(255) NOT NULL,
	"gametime" varchar(255) NOT NULL,
	"player" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pull_events" ADD CONSTRAINT "pull_events_game_id_games_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id");--> statement-breakpoint
ALTER TABLE "score_events" ADD CONSTRAINT "score_events_game_id_games_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id");--> statement-breakpoint
ALTER TABLE "turnover_events" ADD CONSTRAINT "turnover_events_game_id_games_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id");