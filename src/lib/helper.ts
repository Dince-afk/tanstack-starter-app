export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const checkIfDevEnv = (): boolean =>
  process.env.NODE_ENV === "development";
