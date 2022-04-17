export function makeShotAccount(account: string): string {
  if (account) {
    const s1 = account.slice(0, 5);
    const s2 = account.slice(-3);
    return s1 + '...' + s2;
  }
  return null;
}
