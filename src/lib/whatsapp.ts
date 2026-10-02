import { waLink } from './contact';

export interface VisaEnquiryData {
  nationality: string;
  visaType: string;
  validity: string;
  entry: 'Single entry' | 'Multiple entries';
  month: string;
}

export interface FlightEnquiryData {
  from: string;
  to: string;
  tripType?: 'Round-trip' | 'One-way' | 'Multi-city';
  cabinClass?: 'Economy Saver' | 'Premium Economy' | 'Business Class' | 'First Class';
  flightPreference?: 'Direct flight only' | 'Best value / Any' | 'Specific airline';
  departDate: string;
  returnDate?: string;
  passengers: number;
}

export interface FlightCardInquiry {
  airline: string;
  route: string;
  flightType: string;
  cabin: string;
  timing: string;
  baggage: string;
}

export interface OtherEnquiryData {
  service: string;
  notes: string;
}

export const createVisaWhatsAppUrl = (data: VisaEnquiryData) => {
  const message = `Hi Aeroviz, I need a ${data.visaType} (${data.validity} - ${data.entry}). Nationality: ${data.nationality}. Travel month: ${data.month}.`;
  return waLink(message);
};

export const createFlightWhatsAppUrl = (data: FlightEnquiryData) => {
  const returnPart = data.returnDate ? `, returning ${data.returnDate}` : '';
  const tripPart = data.tripType ? ` (${data.tripType})` : '';
  const cabinPart = data.cabinClass ? ` | Cabin: ${data.cabinClass}` : '';
  const prefPart = data.flightPreference ? ` | Preference: ${data.flightPreference}` : '';
  
  const message = `Hi Aeroviz, I'd like flight options from ${data.from} to ${data.to}${tripPart}, departing ${data.departDate}${returnPart}. Passengers: ${data.passengers}${cabinPart}${prefPart}.`;
  return waLink(message);
};

export const createFlightOptionWhatsAppUrl = (flight: FlightCardInquiry) => {
  const message = `Hi Aeroviz, I would like to book/enquire about this flight option:\n• Airline: ${flight.airline}\n• Route: ${flight.route}\n• Class: ${flight.cabin} (${flight.flightType})\n• Timing: ${flight.timing}\n• Baggage: ${flight.baggage}\nPlease confirm live availability and current fare.`;
  return waLink(message);
};

export const createOtherWhatsAppUrl = (data: OtherEnquiryData) => {
  const notesPart = data.notes ? ` Details: ${data.notes}` : '';
  const message = `Hi Aeroviz, I'd like to ask about ${data.service}.${notesPart}`;
  return waLink(message);
};

export const createServiceWhatsAppUrl = (serviceName: string) => {
  const message = `Hi Aeroviz, I'd like to know more about ${serviceName}.`;
  return waLink(message);
};

export const createRouteWhatsAppUrl = (from: string, to: string, cabin = 'Economy') => {
  const message = `Hi Aeroviz, I'd like fare and schedule options for ${from} to ${to} (${cabin} class).`;
  return waLink(message);
};

export const createQuickQuoteUrl = () => {
  return waLink("Hi Aeroviz, I'd like a quote.");
};
