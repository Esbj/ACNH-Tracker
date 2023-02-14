export interface bugs {
  name:         string;
  url:          string;
  number:       number;
  imageURL:     string;
  renderURL:    string;
  location:     string;
  rarity:       Rarity;
  totalCatch:   number;
  sellNook:     number;
  sellFlick:    number;
  tankWidth:    number;
  tankLength:   number;
  catchphrases: string[];
  north:        North;
  south:        North;
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
  The11Pm4Pm = "11 PM – 4 PM",
  The11Pm8Am = "11 PM – 8 AM",
  The4Am5Pm = "4 AM – 5 PM",
  The4Am7Pm = "4 AM – 7 PM",
  The4Am8Am4Pm7Pm = "4 AM – 8 AM & 4 PM – 7 PM",
  The4Am8Am5Pm7Pm = "4 AM – 8 AM & 5 PM – 7 PM",
  The4Pm11Pm = "4 PM – 11 PM",
  The5Pm4Am = "5 PM – 4 AM",
  The5Pm8Am = "5 PM – 8 AM",
  The7Pm4Am = "7 PM – 4 AM",
  The7Pm8Am = "7 PM – 8 AM",
  The8Am4Pm = "8 AM – 4 PM",
  The8Am5Pm = "8 AM – 5 PM",
  The8Am7Pm = "8 AM – 7 PM",
}

export enum Rarity {
  Common = "Common",
  Empty = "",
  RarityVeryCommon = "Very Common",
  Uncommon = "Uncommon",
  VeryCommon = "Very common",
  VeryRare = "Very rare",
}
