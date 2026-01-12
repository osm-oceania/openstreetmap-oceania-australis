'use strict'

// Base colours
export const BACKGROUND = 'hsl(33, 48%, 95%)'
export const WATER = 'hsl(205, 69%, 85%)'

// Water features
export const WATER_DAM_AREA = 'hsl(40, 4%, 67%)'
export const WATER_DAM_AREA_OUTLINE = 'hsl(0, 3%, 45%)'
export const WATER_PIER = 'hsl(33, 48%, 95%)'
export const WATER_PIER_AREA = 'hsl(33, 48%, 95%)'

// Land cover
export const LAND_GLACIER = 'hsl(0, 0%, 100%)'
export const LAND_SAND = 'hsl(60, 57%, 95%)'
export const LAND_ROCK = 'hsl(192, 9%, 89%)'
export const LAND_GRASS = 'hsl(99, 77%, 80%)'
export const LAND_GARDEN = 'hsl(96, 49%, 65%)'
export const LAND_VEGETATION = 'hsl(76, 48%, 72%)' // e.g. scrub, heathland
export const LAND_FOREST = 'hsl(130, 34%, 68%)'
export const LAND_WETLAND = 'hsla(154, 55%, 84%, 0.4)'

// Land uses
export const LAND_RESIDENTIAL = 'hsl(30, 20%, 92%)'
export const LAND_AGRICULTURE = 'hsl(72, 51%, 88%)'
export const LAND_COMMERCIAL = 'hsla(0, 80%, 90%, 0.8)'
export const LAND_INDUSTRIAL = 'hsla(295, 75%, 80%, 0.17)'
export const LAND_WASTE = 'hsl(36, 16%, 82%)'
export const LAND_BURIAL = 'hsl(170, 16%, 78%)'
export const LAND_LEISURE = 'hsl(84, 29%, 90%)' // e.g. golf courses, playgrounds
export const LAND_PARK = 'hsl(90, 67%, 81%)'

// Amenities
export const SITE_UNIVERSITY = 'hsl(60, 100%, 75%)'
export const SITE_UNIVERSITY_OUTLINE = 'hsl(60, 70%, 30%)'

export const SITE_COLLEGE = 'hsl(60, 100%, 75%)'
export const SITE_COLLEGE_OUTLINE = 'hsl(60, 70%, 30%)'

export const SITE_SCHOOL = 'hsl(60, 100%, 75%)'
export const SITE_SCHOOL_OUTLINE = 'hsl(60, 70%, 30%)'

export const SITE_HOSPITAL = 'hsl(0, 100%, 90%)'
export const SITE_HOSPITAL_OUTLINE = 'hsl(0, 55%, 80%)'
export const SITE_PARKING = 'hsl(240, 7%, 87%)'
export const SITE_PARKING_BICYCLE = 'hsl(24, 11%, 91%)'

export const SITE_CONSTRUCTION = 'hsla(30, 8%, 69%, 0.9)'
export const SITE_DANGER_AREA = 'hsla(0, 100%, 50%, 0.3)'
export const SITE_PRISON = 'hsla(270, 17%, 28%, 0.05)'
export const SITE_MILITARY = 'hsla(270, 17%, 28%, 0.05)'

export const SITE_AIRPORT = 'hsl(240, 7%, 87%)'

// Buildings
export const BUILDING = 'hsl(29, 46%, 88%)'
export const BUILDING_OUTLINE = 'hsla(29, 13%, 68%, 0.5)'

// Bridges
export const BRIDGE = 'hsla(33, 33%, 94%, 0.5)'
export const BRIDGE_OUTLINE = 'hsla(33, 33%, 94%, 0.5)'
// Transport
// Major roads
export const STREET_MOTORWAY = 'hsl(5, 100%, 77%)'
export const STREET_MOTORWAY_OUTLINE = 'hsl(0, 72%, 69%)'

export const STREET_TRUNK = 'hsl(29, 100%, 79%)'
export const STREET_TRUNK_OUTLINE = 'hsl(28, 92%, 69%)'
export const STREET_PRIMARY = 'hsl(48, 100%, 83%)'
export const STREET_PRIMARY_OUTLINE = 'hsl(28, 72%, 69%)'

export const STREET_SECONDARY = 'hsl(48, 100%, 83%)'
export const STREET_SECONDARY_OUTLINE = 'hsl(28, 72%, 69%)'
export const STREET_TERTIARY = 'hsl(0, 0%, 100%)'
export const STREET_TERTIARY_OUTLINE = 'hsl(36, 5%, 80%)'

// Minor roads
export const STREET_RESIDENTIAL = 'hsl(0, 0%, 100%)'
export const STREET_RESIDENTIAL_OUTLINE = 'hsl(40, 4%, 86%)'
export const STREET_UNCLASSIFIED = 'hsl(0, 0%, 100%)'
export const STREET_UNCLASSIFIED_OUTLINE = 'hsl(40, 4%, 86%)'

export const STREET_SERVICE = 'hsl(0, 0%, 100%)'
export const STREET_SERVICE_OUTLINE = 'hsl(40, 4%, 86%)'

// Areas
export const STREET_PEDESTRIAN_ZONE = 'hsla(210, 32%, 35%, 0.13)'

// Paths

// Rail

// Exports
export const base = {
  background: BACKGROUND,
  ocean: WATER,
  landGlacier: LAND_GLACIER,
}

export const water = {
  area: WATER,
  river: WATER,
  canal: WATER,
  stream: WATER,
  ditch: WATER,
  dam: WATER,
  damArea: WATER_DAM_AREA,
  damAreaOutline: WATER_DAM_AREA_OUTLINE,
  pier: WATER_PIER,
  pierArea: WATER_PIER_AREA,
}

export const land = {
  industrial: LAND_INDUSTRIAL,
  residential: LAND_RESIDENTIAL,
  agriculture: LAND_AGRICULTURE,
  commercial: LAND_COMMERCIAL,
  waste: LAND_WASTE,
  burial: LAND_BURIAL,
  leisure: LAND_LEISURE,
  park: LAND_PARK,
  glacier: LAND_GLACIER,
  sand: LAND_SAND,
  rock: LAND_ROCK,
  grass: LAND_GRASS,
  garden: LAND_GARDEN,
  vegetation: LAND_VEGETATION,
  forest: LAND_FOREST,
  wetland: LAND_WETLAND,
}

export const amenity = {
  university: SITE_UNIVERSITY,
  universityOutline: SITE_UNIVERSITY_OUTLINE,
  college: SITE_COLLEGE,
  collegeOutline: SITE_COLLEGE_OUTLINE,
  school: SITE_SCHOOL,
  schoolOutline: SITE_SCHOOL_OUTLINE,
  kindergarten: SITE_SCHOOL,
  kindergartenOutline: SITE_SCHOOL_OUTLINE,
  hospital: SITE_HOSPITAL,
  hospitalOutline: SITE_HOSPITAL_OUTLINE,
  parking: SITE_PARKING,
  construction: SITE_CONSTRUCTION,
  dangerArea: SITE_DANGER_AREA,
  prison: SITE_PRISON,
  military: SITE_MILITARY,
  airport: SITE_AIRPORT,
}
