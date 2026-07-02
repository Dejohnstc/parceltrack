const PREFIX = "PTX";

function randomPart(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

export function generateTrackingNumber() {
  const year = new Date().getFullYear();

  return `${PREFIX}-${year}-${randomPart()}`;
}