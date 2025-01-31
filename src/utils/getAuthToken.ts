import AppError from "../app/Error/AppError";

export function getAuthToken(req: {
  headers: { authorization?: string };
}): string {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError(400, "Authorization header is missing");
  }
  return authHeader.split(" ")[1];
}
