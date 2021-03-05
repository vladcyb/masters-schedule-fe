import { SpecializationsThunk } from '../specializationSlice/thunk';
import { UserThunk } from '../userSlice/thunk';
import { ServiceThunk } from '../serviceSlice/thunk';
import { LocationThunk } from '../locationSlice/thunk';
import { MasterThunk } from '../masterSlice/thunk';

export const thunks = {
  specialization: SpecializationsThunk,
  user: UserThunk,
  location: LocationThunk,
  service: ServiceThunk,
  master: MasterThunk,
};
