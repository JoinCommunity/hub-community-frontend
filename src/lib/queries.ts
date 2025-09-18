import { gql } from '@apollo/client';

export const GET_COMMUNITIES = gql`
  query GetCommunities($filters: CommunityFilter) {
    communities(filters: $filters) {
      data {
        id
        title
        short_description
        full_description
        members_quantity
        images
        organizers {
          id
          username
          email
        }
        events {
          id
          title
          start_date
        }
        tags {
          id
          value
        }
        links {
          id
          url
        }
      }
    }
  }
`;

export const GET_COMMUNITY_BY_ID = gql`
  query GetCommunityById($id: String!) {
    community(id: $id) {
      id
      title
      short_description
      full_description
      members_quantity
      images
      organizers {
        id
        username
        email
      }
      events {
        id
        title
        start_date
      }
      tags {
        id
        value
      }
      links {
        id
        url
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents($filters: EventFilter) {
    events(filters: $filters) {
      data {
        id
        title
        description
        start_date
        end_date
        images
        communities {
          id
          title
          short_description
          full_description
          images
        }
        talks {
          id
          title
          speakers {
            id
            name
            avatar
          }
        }
        location {
          title
          region
          latitude
          longitude
          google_maps_url
          full_address
          city
          events {
            title
          }
        }
      }
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      data {
        id
        value
        events {
          id
          title
        }
        communities {
          id
          title
        }
      }
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query GetEventById($eventId: String!) {
    event(id: $eventId) {
      id
      title
      description
      start_date
      end_date
      images
      communities {
        id
        title
        short_description
        full_description
        images
      }
      talks {
        id
        title
        description
        room_description
        highlight
        speakers {
          id
          name
          avatar
        }
      }
      location {
        title
        region
        latitude
        longitude
        google_maps_url
        full_address
        city
      }
    }
  }
`;

// Authentication Mutations
export const SIGN_UP = gql`
  mutation SignUp($input: UserInput!) {
    signUp(input: $input) {
      email
      username
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($identifier: String!, $password: String!) {
    signIn(identifier: $identifier, password: $password) {
      token
    }
  }
`;

export const FORWARD_PASSWORD = gql`
  mutation ForwardPassword($email: String!) {
    forwardPassword(email: $email)
  }
`;
