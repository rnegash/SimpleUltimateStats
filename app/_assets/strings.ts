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
        position: "Position",
      },
      emptyState:
        "A list of players will appear here once player data is available.",
    },
  },
  gamePage: {
    lightTeam: "Light",
    darkTeam: "Dark",
    currentPossession: "Current Possession",
    events: {
      pull: {
        title: "Pull",
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
        title: "Score",
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
        title: "Turnover",
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
