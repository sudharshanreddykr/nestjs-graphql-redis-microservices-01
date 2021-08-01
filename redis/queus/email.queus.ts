import Bull from "bull";

const emailQueue = new Bull("email", {
  redis: process.env.REDIS_URL,
});
