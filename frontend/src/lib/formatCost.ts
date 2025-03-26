// 1000 => $1,000.00
export function formatCost(cost: number): string {
  return `$${cost.toLocaleString()}.00`;
}
