import { LOCATIONS as BASE_LOCATIONS } from './locationData';
import { EXPANDED_LOCATIONS } from './locationDataExpanded';
import type { LocationData } from './locationData';

export type { LocationData };

// Merge base + expanded — base takes priority for existing slugs
const slugSet = new Set(BASE_LOCATIONS.map(l => l.slug));
const merged = [...BASE_LOCATIONS, ...EXPANDED_LOCATIONS.filter(l => !slugSet.has(l.slug))];

export const ALL_LOCATIONS: LocationData[] = merged;

export const getLocation = (slug: string) => ALL_LOCATIONS.find(l => l.slug === slug);
export const getRelated = (slugs: string[]) => ALL_LOCATIONS.filter(l => slugs.includes(l.slug));

// Grouped for the hub page
export const CITIES = ALL_LOCATIONS.filter(l => l.type === 'city' || l.type === 'area');
export const DISTRICTS = ALL_LOCATIONS.filter(l => l.type === 'district');

export const REGIONS: Record<string, LocationData[]> = {
  'Kolkata Metro': ALL_LOCATIONS.filter(l =>
    ['interior-designer-kolkata','interior-designer-howrah','interior-designer-salt-lake','interior-designer-new-town'].includes(l.slug)
  ),
  'North Bengal': ALL_LOCATIONS.filter(l =>
    ['interior-designer-siliguri','interior-designer-darjeeling','interior-designer-jalpaiguri','interior-designer-alipurduar','interior-designer-cooch-behar'].includes(l.slug)
  ),
  'Industrial Belt': ALL_LOCATIONS.filter(l =>
    ['interior-designer-durgapur','interior-designer-asansol','interior-designer-west-burdwan','interior-designer-bardhaman','interior-designer-east-burdwan'].includes(l.slug)
  ),
  'South Bengal': ALL_LOCATIONS.filter(l =>
    ['interior-designer-kharagpur','interior-designer-haldia','interior-designer-west-midnapore','interior-designer-east-midnapore','interior-designer-south-24-parganas'].includes(l.slug)
  ),
  'Central Bengal': ALL_LOCATIONS.filter(l =>
    ['interior-designer-hooghly','interior-designer-nadia','interior-designer-krishnanagar','interior-designer-ranaghat','interior-designer-bolpur','interior-designer-murshidabad'].includes(l.slug)
  ),
  'North 24 Parganas': ALL_LOCATIONS.filter(l =>
    ['interior-designer-north-24-parganas','interior-designer-barasat','interior-designer-basirhat'].includes(l.slug)
  ),
  'Jungle Mahal': ALL_LOCATIONS.filter(l =>
    ['interior-designer-purulia','interior-designer-bankura'].includes(l.slug)
  ),
};
