export const date = () => {
  const now = new Date();
  const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().replace(/.\d+Z$/g, "");
  return date.split("T")[0];
}