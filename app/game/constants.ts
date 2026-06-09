export const teams = {
  TEAM_DARK: "Darks",
  TEAM_LIGHT: "Lights",
} as const;

type TeamKeys = keyof typeof teams;

export type Team = (typeof teams)[TeamKeys];

export default teams;
