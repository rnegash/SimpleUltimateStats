export const copy = {
  game: {
    lightTeam: "Light",
    darkTeam: "Dark",
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
    eventData: {
      required: {
        type: "Event type",
        team: "Team",
        player: "Player",
        timestamp: "Timestamp",
      },
    },
  },
};
