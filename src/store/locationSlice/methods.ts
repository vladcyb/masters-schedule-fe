import { LocationType } from '../../shared/types';

export const getLocationById = (
  locations: LocationType[],
  currentIndex: number,
  id: number,
): LocationType | null => {
  if (!locations.length) {
    return null;
  }
  const current = locations[currentIndex];
  if (current.id === id) {
    return current;
  }
  let foundInChildren = null;
  current.children.forEach(() => {
    // @ts-ignore
    const found = getLocationById(current.children, 0, id);
    foundInChildren = found;
  });
  if (foundInChildren) {
    return foundInChildren;
  }
  if (locations.length > currentIndex + 1) {
    return getLocationById(locations, currentIndex + 1, id);
  }
  return null;
};
