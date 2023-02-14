export interface sea {
  name:           string;
  url:            string;
  number:         number;
  imageURL:       string;
  renderURL:      string;
  shadowSize:     ShadowSize;
  shadowMovement: ShadowMovement;
  rarity:         string;
  totalCatch:     number;
  sellNook:       number;
  tankWidth:      number;
  tankLength:     number;
  catchphrases:   string[];
  north:          North;
  south:          North;
}

export interface North {
  availabilityArray: AvailabilityArray[];
  timesByMonth:      { [key: string]: Time };
  months:            string;
  monthsArray:       number[];
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
