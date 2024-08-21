export const getChipFormattedValue = (amount: number) => {
  if (amount <= 1000) return amount;
  if (amount > 1000 && amount < 1000000) return `${amount / 1000}K`;
};

export * as BetChipUtils from "./BetChip.util";
