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

export enum OrderStatus {
  PENDING,
  IN_PROGRESS,
  DONE,
  ABORTED,
  ON_REWORK,
  PENDING_FOR_ACCEPTING,
}

export type OrderType = {
  id: number
  description: string
  startDate: string | null
  finishDate: string | null
  status: OrderStatus
  comment: string | null
  photo: string
  address: string
};
