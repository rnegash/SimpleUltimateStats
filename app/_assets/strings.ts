import { eventType } from "../game/types";

export const copy = {
  dashboardPage: {
    pastGamesPage: {
      gameList: {
        emptyState:
          "A list of games will appear here once game data is available.",
        columns: {
          game: "Game",
          result: "Result",
          date: "Date",
        },
      },
    },
    title: "Dashboard",
    subtitle: "My team",
    links: {
      startGame: "Start new game",
      pastGames: "Past games",
      addPlayers: "Add players",
      reports: "Reports",
    },
    playersList: {
      columns: {
        player: "Player",
        position: "Joined",
      },
      emptyState:
        "A list of players will appear here once player data is available.",
    },
    addPlayersPage: {
      form: {
        nameLabel: "Player name",
        namePlaceholder: "Enter player name",
        submit: "Add player",
      },
    },
  },
  authPage: {
    registerPage: {
      title: "Register",
      subtitle: "Create an account to start tracking stats.",
      nameLabel: "Name",
      emailLabel: "Email",
      passwordLabel: "Password",
      submit: "Create account",
    },
  },
  gamePage: {
    lightTeam: "Light",
    darkTeam: "Dark",
    currentPossession: "Current Possession",
    events: {
      pull: {
        title: eventType[2],
        addEvent: "Add Pull event",
        eventData: {
          team: {
            label: "Team",
          },
          outcome: {
            label: "Outcome",
            outcome: ["in", "out", "caught"],
          },
          player: {
            label: "Player",
          },
        },
      },
      score: {
        title: eventType[0],
        addEvent: "Add Score event",
        eventData: {
          team: {
            label: "Team",
          },
          assistBy: {
            label: "Assist by",
          },
          player: {
            label: "Player",
          },
        },
      },
      turnover: {
        title: eventType[1],
        addEvent: "Add Turnover event",
        eventData: {
          team: {
            label: "Team",
          },
          reason: {
            label: "Reason",
          },
          player: {
            label: "Player",
          },
        },
      },
      actions: {
        save: "Save game",
        back: "Back to dashboard",
      },
    },
    eventTable: {
      eventData: {
        required: {
          type: "Event type",
          team: "Team",
          player: "Player",
          timestamp: "Timestamp",
        },
      },
      emptyState: "Lets start the game!",
    },
  },
};
