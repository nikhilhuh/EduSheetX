export function getOrCreateUserId(): string {
  let userId = localStorage.getItem("anonUserId");
  if (!userId) {
    userId = crypto.randomUUID(); 
    localStorage.setItem("anonUserId", userId);
  }
  return userId;
}
