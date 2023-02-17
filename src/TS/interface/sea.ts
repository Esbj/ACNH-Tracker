import Creature from "./iCreature";
export interface Sea extends Creature<Time> {
  name:            string;
  url:             string;
  number:          number;
  image_url:       string;
  render_url:      string;
  shadow_size:     ShadowSize;
  shadow_movement: ShadowMovement;
  rarity:          string;
  total_catch:     number;
  sell_nook:       number;
  tank_width:      number;
  tank_length:     number;
  catchphrases:    string[];
  north:           North<Time>;
  south:           North<Time>;
}

export interface North <Time>{
  availability_array: AvailabilityArray[];
  times_by_month:     { [key: string]: Time };
  months:             string;
  months_array:       number[];
}

export interface AvailabilityArray {
  months: string;
  time:   Time;
}

export enum Time {
  AllDay = "All day",
  Na = "NA",
  The4Am9Pm = "4 AM – 9 PM",
  The4Pm9Am = "4 PM – 9 AM",
  The9Am4Pm9Pm4Am = "9 AM – 4 PM; 9 PM – 4 AM",
  The9Pm4Am = "9 PM – 4 AM",
}

export enum ShadowMovement {
  Fast = "Fast",
  Medium = "Medium",
  Slow = "Slow",
  Stationary = "Stationary",
  VeryFast = "Very fast",
  VerySlow = "Very slow",
}

export enum ShadowSize {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
  Tiny = "Tiny",
  VeryLarge = "Very large",
}
