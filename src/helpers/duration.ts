import humanizeDuration from "humanize-duration";

export const humanize = humanizeDuration.humanizer({
  language: "en",
  units: ["h", "m"],
  round: true,
});
