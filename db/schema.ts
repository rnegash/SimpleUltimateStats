import {
  pgSchema,
  uuid,
  boolean,
  jsonb,
  index,
  uniqueIndex,
  unique,
  integer,
  pgTable,
  text,
  varchar,
  timestamp,
  json,
} from "drizzle-orm/pg-core";
import { defineRelations, sql } from "drizzle-orm";
import { eventType } from "@/app/game/types";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  externalId: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const gamesTable = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  finalScore: varchar("final_score", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: integer("created_by")
    .references(() => usersTable.id)
    .notNull(),
});

export const playersTable = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  position: text({ enum: ["handler", "cutter", "hybrid"] }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: integer("created_by")
    .references(() => usersTable.id)
    .notNull(),
});

export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  eventType: text("event_type", { enum: eventType }),
  gameId: integer("game_id")
    .references(() => gamesTable.id)
    .notNull(),
  team: varchar({ length: 255 }).notNull(),
  timestamp: varchar({ length: 255 }).notNull(),
  gametime: varchar({ length: 255 }).notNull(),
  player: varchar({ length: 255 }),
  additionalStats: json("additional_stats"),
});

export const neonAuth = pgSchema("neon_auth");

export const accountInNeonAuth = neonAuth.table(
  "account",
  {
    id: uuid().defaultRandom().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: uuid()
      .notNull()
      .references(() => userInNeonAuth.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ withTimezone: true }),
    refreshTokenExpiresAt: timestamp({ withTimezone: true }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true }).notNull(),
  },
  (table) => [
    index("account_userId_idx").using("btree", table.userId.asc().nullsLast()),
  ],
);

export const invitationInNeonAuth = neonAuth.table(
  "invitation",
  {
    id: uuid().defaultRandom().primaryKey(),
    organizationId: uuid()
      .notNull()
      .references(() => organizationInNeonAuth.id, { onDelete: "cascade" }),
    email: text().notNull(),
    role: text(),
    status: text().notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    createdAt: timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    inviterId: uuid()
      .notNull()
      .references(() => userInNeonAuth.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("invitation_email_idx").using("btree", table.email.asc().nullsLast()),
    index("invitation_organizationId_idx").using(
      "btree",
      table.organizationId.asc().nullsLast(),
    ),
  ],
);

export const jwksInNeonAuth = neonAuth.table("jwks", {
  id: uuid().defaultRandom().primaryKey(),
  publicKey: text().notNull(),
  privateKey: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  expiresAt: timestamp({ withTimezone: true }),
});

export const memberInNeonAuth = neonAuth.table(
  "member",
  {
    id: uuid().defaultRandom().primaryKey(),
    organizationId: uuid()
      .notNull()
      .references(() => organizationInNeonAuth.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => userInNeonAuth.id, { onDelete: "cascade" }),
    role: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull(),
  },
  (table) => [
    index("member_organizationId_idx").using(
      "btree",
      table.organizationId.asc().nullsLast(),
    ),
    index("member_userId_idx").using("btree", table.userId.asc().nullsLast()),
  ],
);

export const organizationInNeonAuth = neonAuth.table(
  "organization",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    slug: text().notNull(),
    logo: text(),
    createdAt: timestamp({ withTimezone: true }).notNull(),
    metadata: text(),
  },
  (table) => [
    uniqueIndex("organization_slug_uidx").using(
      "btree",
      table.slug.asc().nullsLast(),
    ),
    unique("organization_slug_key").on(table.slug),
  ],
);

export const projectConfigInNeonAuth = neonAuth.table(
  "project_config",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    endpointId: text("endpoint_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    trustedOrigins: jsonb("trusted_origins").notNull(),
    socialProviders: jsonb("social_providers").notNull(),
    emailProvider: jsonb("email_provider"),
    emailAndPassword: jsonb("email_and_password"),
    allowLocalhost: boolean("allow_localhost").notNull(),
    pluginConfigs: jsonb("plugin_configs"),
    webhookConfig: jsonb("webhook_config"),
  },
  (table) => [unique("project_config_endpoint_id_key").on(table.endpointId)],
);

export const sessionInNeonAuth = neonAuth.table(
  "session",
  {
    id: uuid().defaultRandom().primaryKey(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: uuid()
      .notNull()
      .references(() => userInNeonAuth.id, { onDelete: "cascade" }),
    impersonatedBy: text(),
    activeOrganizationId: text(),
  },
  (table) => [
    index("session_userId_idx").using("btree", table.userId.asc().nullsLast()),
    unique("session_token_key").on(table.token),
  ],
);

export const userInNeonAuth = neonAuth.table(
  "user",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    role: text(),
    banned: boolean(),
    banReason: text(),
    banExpires: timestamp({ withTimezone: true }),
  },
  (table) => [unique("user_email_key").on(table.email)],
);

export const verificationInNeonAuth = neonAuth.table(
  "verification",
  {
    id: uuid().defaultRandom().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    createdAt: timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("verification_identifier_idx").using(
      "btree",
      table.identifier.asc().nullsLast(),
    ),
  ],
);

export const relations = defineRelations(
  {
    userInNeonAuth,
    accountInNeonAuth,
    organizationInNeonAuth,
    invitationInNeonAuth,
    sessionInNeonAuth,
    memberInNeonAuth,
    gamesTable,
    eventsTable,
    usersTable,
    playersTable,
  },
  (r) => ({
    accountInNeonAuth: {
      userInNeonAuth: r.one.userInNeonAuth({
        from: r.accountInNeonAuth.userId,
        to: r.userInNeonAuth.id,
      }),
    },
    userInNeonAuth: {
      accountInNeonAuths: r.many.accountInNeonAuth(),
      organizationInNeonAuthsViaInvitationInNeonAuth:
        r.many.organizationInNeonAuth({
          from: r.userInNeonAuth.id.through(r.invitationInNeonAuth.inviterId),
          to: r.organizationInNeonAuth.id.through(
            r.invitationInNeonAuth.organizationId,
          ),
          alias:
            "userInNeonAuth_id_organizationInNeonAuth_id_via_invitationInNeonAuth",
        }),
      organizationInNeonAuthsViaMemberInNeonAuth: r.many.organizationInNeonAuth({
        from: r.userInNeonAuth.id.through(r.memberInNeonAuth.userId),
        to: r.organizationInNeonAuth.id.through(
          r.memberInNeonAuth.organizationId,
        ),
        alias:
          "organizationInNeonAuth_id_userInNeonAuth_id_via_memberInNeonAuth",
      }),
      sessionInNeonAuths: r.many.sessionInNeonAuth(),
    },
    organizationInNeonAuth: {
      userInNeonAuthsViaInvitationInNeonAuth: r.many.userInNeonAuth({
        alias:
          "userInNeonAuth_id_organizationInNeonAuth_id_via_invitationInNeonAuth",
      }),
      userInNeonAuthsViaMemberInNeonAuth: r.many.userInNeonAuth({
        from: r.organizationInNeonAuth.id.through(
          r.memberInNeonAuth.organizationId,
        ),
        to: r.userInNeonAuth.id.through(r.memberInNeonAuth.userId),
        alias:
          "organizationInNeonAuth_id_userInNeonAuth_id_via_memberInNeonAuth",
      }),
    },
    sessionInNeonAuth: {
      userInNeonAuth: r.one.userInNeonAuth({
        from: r.sessionInNeonAuth.userId,
        to: r.userInNeonAuth.id,
      }),
    },
    eventsTable: {
      game: r.one.gamesTable({
        from: r.eventsTable.gameId,
        to: r.gamesTable.id,
      }),
    },
    gamesTable: {
      events: r.many.eventsTable(),
      user: r.one.usersTable({
        from: r.gamesTable.createdBy,
        to: r.usersTable.id,
      }),
    },
    usersTable: {
      games: r.many.gamesTable(),
      players: r.many.playersTable(),
    },
    playersTable: {
      user: r.one.usersTable({
        from: r.playersTable.createdBy,
        to: r.usersTable.id,
      }),
    },
  }),
);
