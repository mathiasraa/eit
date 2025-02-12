import type { FoundationType, SuperstructureType } from "@/lib/types";

export const INITIAL_BUDGET = 500000; // 500,000 NPR

export const FOUNDATION_COSTS: Record<FoundationType, number> = {
  mud_mortar_stone_brick: 100000,
  bamboo_timber: 50000,
  cement_stone_brick: 150000,
  reinforced_concrete: 200000,
  other: 0,
};

type ExtractArrayItem<T> = T extends (infer U)[] ? U : never;

export const SUPERSTRUCTURE_COSTS: Record<
  ExtractArrayItem<SuperstructureType>,
  number
> = {
  adobe_mud: 100000,
  mud_mortar_stone: 150000,
  stone_flag: 200000,
  cement_mortar_stone: 250000,
  mud_mortar_brick: 300000,
  cement_mortar_brick: 350000,
  timber: 400000,
  bamboo: 450000,
  rc_non_engineered: 500000,
  re_engineered: 550000,
  other: 0,
};
