// 1000 => $1,000.00
export function formatCost(cost: number): string {
  if (cost == 0) {
    return "No extra cost";
  }

  return `$${cost.toLocaleString()}`;
}
