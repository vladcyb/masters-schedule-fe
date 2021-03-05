export enum MasterStatus {
  IDLE,
  BUSY,
  HOLIDAY,
}

export type ScheduleType = {
  id: number
  hours: string
  status: MasterStatus
};

export type StateType = {
  loading: boolean
  data: {
    schedule: ScheduleType
  },
};
