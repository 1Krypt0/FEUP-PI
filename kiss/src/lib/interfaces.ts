/**
 * @fileoverview Provides the program with an interface to work with,
 *     based on the information from the sheets. When the sheets
 *     change, be sure to update these interfaces as well,
 *     otherwise the progrma will likely start to throw errors
 */

export interface TeamMember {
  id: string,
  name: string,
  shortBio: string,
  bio: string,
  areasOfInterest: string,
  status: string,
  tags: string,
  mainRole: string,
  photo: string,
  sigarraNumber: string,
  email: string,
  orcid: string,
  authenticus: string,
  personalPageLink: string,
  additionalInfo: string,
}

export interface Thesis {
  id: string,
  title: string,
  type: string,
  author: string,
  year: string,
  supervisors: string,
  areas: string,
  tags: string,
  repo: string,
  abstract: string,
  additionalInfo: string
}

export interface Project {
  id: string,
  name: string,
  longName: string,
  startYear: string,
  endYear: string,
  status: string,
  reference: string,
  shortDescription: string,
  description: string,
  additionalInfo: string,
  tags: string,
  peopleInvolved: string,
  site: string,
  thumbnail: string,
  imageShareLink: string,
  video: string,
  bibtexLink: string,
}

export interface News {
  id: string,
  date: string,
  published: string,
  title: string,
  shortText: string,
  tags: string,
  thumbnail: string,
  image: string,
  video: string,
}
