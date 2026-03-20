export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const checkIfDevEnv = (): boolean =>
  process.env.NODE_ENV === "development";

export const renderTime = () =>
  new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });

export function RenderTimeStamp() {
  const time = renderTime();
  return <p>{time}</p>;
}
