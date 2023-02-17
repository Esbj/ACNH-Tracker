export default interface Creature {
  name: string;
  image_url: string;
  url: string;
  collected: boolean;
  shadow_size?: string,
  location?:string,
  north: {
    availability_array: [
      {
        months: string;
        time: string;
      }
    ];
  };
}
