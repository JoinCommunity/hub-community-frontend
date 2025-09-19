import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

// Event names
export const ANALYTICS_EVENTS = {
  ADD_TALK_TO_AGENDA: 'add_talk_to_agenda',
  REMOVE_TALK_FROM_AGENDA: 'remove_talk_from_agenda',
  CREATE_AGENDA: 'create_agenda',
  VIEW_EVENT_DETAIL: 'view_event_detail',
  VIEW_TALK_DETAIL: 'view_talk_detail',
  VIEW_AGENDA_DETAIL: 'view_agenda_detail',
} as const;

// Analytics utility functions
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (analytics && typeof window !== 'undefined') {
    try {
      logEvent(analytics, eventName, parameters);
      console.log(`Analytics event: ${eventName}`, parameters);
    } catch (error) {
      console.warn('Failed to log analytics event:', error);
    }
  }
};

// Specific event tracking functions
export const trackAddTalkToAgenda = (talkId: string, eventId: string) => {
  trackEvent(ANALYTICS_EVENTS.ADD_TALK_TO_AGENDA, {
    talk_id: talkId,
    event_id: eventId,
  });
};

export const trackRemoveTalkFromAgenda = (talkId: string, eventId: string) => {
  trackEvent(ANALYTICS_EVENTS.REMOVE_TALK_FROM_AGENDA, {
    talk_id: talkId,
    event_id: eventId,
  });
};

export const trackCreateAgenda = (eventId: string) => {
  trackEvent(ANALYTICS_EVENTS.CREATE_AGENDA, {
    event_id: eventId,
  });
};

export const trackViewEventDetail = (eventId: string) => {
  trackEvent(ANALYTICS_EVENTS.VIEW_EVENT_DETAIL, {
    event_id: eventId,
  });
};

export const trackViewTalkDetail = (talkId: string, eventId?: string) => {
  trackEvent(ANALYTICS_EVENTS.VIEW_TALK_DETAIL, {
    talk_id: talkId,
    event_id: eventId,
  });
};

export const trackViewAgendaDetail = (agendaId: string) => {
  trackEvent(ANALYTICS_EVENTS.VIEW_AGENDA_DETAIL, {
    agenda_id: agendaId,
  });
};
