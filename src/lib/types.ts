import { BlocksContent } from '@strapi/blocks-react-renderer';

export interface Community {
  id: string;
  title: string;
  short_description: string | BlocksContent;
  full_description: string | BlocksContent;
  members_quantity: number;
  organizers: string[];
  events: Event[];
  tags: Tag[];
  images?: string[];
}

export interface CommunityDetail {
  id: string;
  title: string;
  short_description: string | BlocksContent;
  full_description: string | BlocksContent;
  members_quantity: number;
  images?: string[];
  location?: string;
  founded_date?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  organizers: Organizer[];
  events: Event[];
  tags: Tag[];
}

export interface Organizer {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Tag {
  id: string;
  value: string;
}

export interface Speaker {
  id: string;
  name: string;
  avatar?: string;
}

export interface Talk {
  id: string;
  title: string;
  description?: string;
  room_description?: string;
  highlight?: boolean;
  speakers: Speaker[];
}

export interface Event {
  id: string;
  title: string;
  description: string | BlocksContent;
  start_date: string;
  end_date: string;
  images?: string[];
  communities: {
    id: string;
    title: string;
    short_description: string | BlocksContent;
    full_description: string | BlocksContent;
    images?: string[];
  }[];
  talks: Talk[];
}

export interface CommunitiesResponse {
  communities?: {
    data: Community[];
  };
}

export interface CommunityResponse {
  community?: CommunityDetail;
}

export interface CommunityDetail {
  id: string;
  title: string;
  short_description: string | BlocksContent;
  members_quantity: number;
}

export interface EventsResponse {
  events?: {
    data: Event[];
  };
}

export interface TagsResponse {
  tags?: {
    data: Tag[];
  };
}

export interface EventResponse {
  event: Event;
}
