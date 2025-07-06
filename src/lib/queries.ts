import { gql } from '@apollo/client';

export const GET_COMMUNITIES = gql`
  query GetCommunities {
    communities {
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
  query GetEvents {
    events {
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
