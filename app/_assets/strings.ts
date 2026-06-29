import { eventTypes } from "../game/types";

export const copy = {
  meta: {
    title: "SimpleUltimateStats",
    description: "Collect stats for your team",
  },
  landingPage: {
    title: "SimpleUltiStats",
    tagline:
      "Track and record ultimate frisbee game events—scores, pulls, turnovers—and save games for later analysis.",
    logIn: "Log in",
    register: "Register",
    featureNote: "Record mode supports score, pull, and turn events.",
  },
  dashboardPage: {
    pastGamesPage: {
      title: "Games",
      pastGame: {
        title: "Final result:",
        deleteGameButton: "Delete game",
      },
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
      logOut: "Log out",
    },
    playersList: {
      title: "Players",
      columns: {
        player: "Player",
        position: "Joined",
      },
      emptyState:
        "A list of players will appear here once player data is available.",
    },
    addPlayersPage: {
      title: "Add Player",
      form: {
        nameLabel: "Player name",
        positionLabel: "Position",
        namePlaceholder: "Enter player name",
        submit: "Add player",
        error: "Player name is required",
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
        title: eventTypes.pull,
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
        title: eventTypes.score,
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
        title: eventTypes.turnover,
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
        submit: "Submit",
        save: "Save game",
        saving: "Saving..",
        back: "Back to dashboard",
        backWarning: {
          title: "Leave game?",
          description:
            "All current game data will be lost. Are you sure you want to go back to the dashboard?",
          confirm: "Leave game",
          cancel: "Stay",
        },
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
