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
  links?: Link[];
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
  links?: Link[];
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

export interface Link {
  id: string;
  title: string;
  url: string;
  social_media: string;
}

export interface Speaker {
  id: string;
  name: string;
  avatar?: string;
  biography?: string | BlocksContent;
  socials?: Link[];
}

export interface Talk {
  id: string;
  documentId?: string;
  subtitle?: string;
  title: string;
  description?: string | BlocksContent;
  room_description?: string;
  highlight?: boolean;
  speakers: Speaker[];
}

export interface EventLocation {
  title?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
  full_address?: string;
  city?: string;
}

export interface Event {
  id: string;
  documentId?: string;
  title: string;
  description?: string | BlocksContent;
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
  location?: EventLocation;
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

export interface TalkResponse {
  talk: Talk & {
    event: Event;
  };
}

// Auth Types
export interface User {
  id?: string;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
}

export interface SignUpInput {
  email: string;
  name: string;
  password: string;
  username: string;
}

export interface SignInInput {
  identifier: string;
  password: string;
}

export interface SignInResponse {
  signIn: {
    token: string;
  };
}

export interface SignUpResponse {
  signUp: {
    email: string;
    username: string;
  };
}

export interface ForwardPasswordResponse {
  forwardPassword: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => void;
  forwardPassword: (email: string) => Promise<void>;
}
