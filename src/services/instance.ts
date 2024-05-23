import ky from "ky";

const prefixUrl = `${process.env.API_URL ? process.env.API_URL : ""}/`;
const APP_ID = "664eb768e63f6ddd87b45b82";

export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: "application/json",
    "app-id": APP_ID,
  },
});
