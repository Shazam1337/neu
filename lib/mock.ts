export type Raid = {
  id: string;
  user: string;
  tweetUrl: string;
  sol: number;
  ts: number;
  status: "pending" | "verified" | "paid";
};
export type Payment = { id: string; to: string; amount: number; ts: number };
export type FeeClaim = { ts: number; totalSol: number };

const users = ["@Pulse402fan", "@ethwhale", "@alpha402", "@lumax", "@midax", "@gmgn", "@x402", "@raider"];
const sample = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const rnd = (min: number, max: number) => Math.random() * (max - min) + min;
const id = () => Math.random().toString(36).slice(2);

export function generateRaid(): Raid {
  const baseAmount = parseFloat(rnd(0.002, 0.05).toFixed(3));
  return {
    id: id(),
    user: sample(users) + Math.floor(rnd(10, 99)),
    tweetUrl: `https://twitter.com/user/status/${Math.floor(rnd(10 ** 9, 10 ** 10))}`,
    sol: parseFloat((baseAmount / 15).toFixed(6)),
    ts: Date.now(),
    status: "pending",
  };
}

export function bumpFees(prev: number): number {
  const pulse = Math.random() < 0.2 ? rnd(0.02, 0.08) : rnd(0.002, 0.015);
  const slower = pulse / 45; // 3x slower growth, with ETH values reduced 15x
  return parseFloat((prev + slower).toFixed(6));
}

export function toPayment(raid: Raid): Payment {
  return { id: id(), to: raid.user.replace("@", ""), amount: raid.sol, ts: Date.now() };
}
