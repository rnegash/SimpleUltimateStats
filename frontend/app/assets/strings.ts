export const copy = {
  dashboardPage: {
    title: "Dashboard",
    subtitle: "My team",
    links: {
      startGame: "Start new game",
      pastGames: "Past games",
      addPlayers: "Add players",
      reports: "Reports",
    },
    playersList: {
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
