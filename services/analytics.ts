type FunnelEvent =
  | 'click_to_call'
  | 'inquiry_open'
  | 'consultation_form_start'
  | 'consultation_submit_attempt'
  | 'generate_lead'
  | 'consultation_submit_error';

type FunnelParameters = {
  cta_location?: string;
  form_type?: string;
  consultation_category?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const getPageType = () =>
  window.location.pathname.startsWith('/case-results/') ? 'case' : 'home';

export const trackFunnelEvent = (
  eventName: FunnelEvent,
  parameters: FunnelParameters = {}
) => {
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, {
    site_section: 'lawahn',
    page_type: getPageType(),
    cta_location: parameters.cta_location || '',
    form_type: parameters.form_type || '',
    consultation_category: parameters.consultation_category || ''
  });
};

