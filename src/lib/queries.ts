import { gql } from '@apollo/client';

export const GET_COMMUNITIES = gql`
  query GetCommunities($search: String) {
    communities(search: $search) {
      data {
        id
        title
        short_description
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
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents($search: String) {
    events(search: $search) {
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
    }
  }
`;
