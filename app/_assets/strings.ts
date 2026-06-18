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
            label: "Outcome (Optional)",
            outcome: ["in", "out", "caught"],
          },
          player: {
            label: "Player (Optional)",
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
            label: "Assist by (Optional)",
          },
          player: {
            label: "Player (Optional)",
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
            label: "Reason (Optional)",
          },
          player: {
            label: "Player (Optional)",
          },
        },
      },
      actions: {
        save: "Save game",
        saving: "Saving..",
        back: "Back to dashboard",
        pending: {
          title: "Processing your request",
          description:
            "Please wait while we sync your data. This may take a few moments.",
        },
        error: {
          title: "Unable to connect to server",
          description:
            "We're experiencing connection issues. Please try the following:",
          list: [
            "Check your internet connection",
            "Refresh the page",
            "Clear your browser cache",
          ],
        },
        success: {
          title: "Game saved successfully",
        },
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
