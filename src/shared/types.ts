export type SpecializationType = {
  id: number
  title: string
  icon: string
};

export type LocationType = {
  id: number
  title: string
  coordinates: string
  type: {
    id: number
    title: string
  }
};
