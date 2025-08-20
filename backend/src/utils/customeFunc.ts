export const getRootDomain = (
  origin: string | undefined
): string | undefined => {
  if (!origin) return;

  const hostname = new URL(origin).hostname;
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
  ) {
    return undefined;
  }

  const parts = hostname.split(".");
  if (parts.length >= 2) {
    return "." + parts.slice(-2).join(".");
  }

  return undefined;
};
