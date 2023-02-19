export default interface Creature<Time> {
  name: string;
  image_url: string;
  location?: string,
  shadow_size?: string,
  url: string;
  collected: boolean;
  north: North<Time>,
  south: North<Time>
}



export interface North <Time>{
  availability_array: AvailabilityArray<Time>[];
  times_by_month:     { [key: string]: Time };
  months:             string;
  months_array:       number[];
}

export interface AvailabilityArray <Time>{
  months: string;
  time:   Time;
}
