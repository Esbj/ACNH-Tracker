import Creature from "./iCreature";
export interface Bugs  extends Creature<Time> {
  name:         string;
  url:          string;
  number:       number;
  image_url:    string;
  render_url:   string;
  location:     string;
  rarity:       Rarity;
  total_catch:  number;
  sell_nook:    number;
  sell_flick:   number;
  tank_width:   number;
  tank_length:  number;
  catchphrases: string[];
  north:        North<Time>;
  south:        North<Time>;
}

export interface North<Time> {
  availability_array: AvailabilityArray<Time>[];
  times_by_month:     { [key: string]: Time };
  months:             string;
  months_array:       number[];
}

export interface AvailabilityArray <Time>{
  months: string;
  time:   Time;
}

export enum Time {
  Time
}

export enum Rarity {
  Common = "Common",
  Empty = "",
  RarityVeryCommon = "Very Common",
  Uncommon = "Uncommon",
  VeryCommon = "Very common",
  VeryRare = "Very rare",
}
