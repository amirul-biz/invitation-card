import {
  CalendarIcon,
  ClockIcon,
  GiftIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { ComponentType } from "react";

// ======================
// SERVER CONFIGURATION
// ======================

/**
 * Configuration for the server
 */
export interface ServerConfig {
  supabaseKey: string;
  supabaseAnonKey: string;
  rsvpTableName: string;
  serverEmail: string;
  serverPassword: string;
  userId: string;
}

// ======================
// EMAIL CONFIGURATION
// ======================

/**
 * Configuration for the email component
 */
export interface EmailConfig {
  organizerEmailList: string[];
  brideEmailList: string[];
}

// ======================
// COUNTDOWN CONFIGURATION
// ======================

/**
 * Configuration for the countdown component
 */
export interface CountdownConfig {
  event: {
    name: string; // Event name to display
    date: string; // ISO format date/time of the event
    timeZone: string; // Timezone for the event
    location: string; // Venue location
  };
  ui: {
    title: string; // Main title for countdown
    badgeText: string; // Text for badge/label
    completedMessage: string; // Message to show when countdown completes
    timeBoxLabels: {
      // Labels for time units
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  };
  prayer: {
    text: string; // Prayer text to display
  };
}

// =====================
// BOTTOM DOCK CONFIGURATION
// =====================

/**
 * Configuration for bottom dock navigation items
 */

export type DockItemKey =
  | "calendar"
  | "moneyGift"
  | "location"
  | "contact"
  | "rsvp"
  | "tentative";

export interface DockItemConfig {
  key: DockItemKey; // Unique identifier for the dock item
  label: string; // Display text
  icon: ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component
  show: boolean; // Whether to display this item
}

// =====================
// CALENDAR DRAWER CONFIGURATION
// =====================

/**
 * Configuration for a calendar event
 */
export interface CalendarEvent {
  title: string; // Event title
  description: string; // Event description
  location: string; // Event location
  startDate: string; // ISO format start date/time
  endDate: string; // ISO format end date/time
  timeZone: string; // Timezone for the event
}

/**
 * Configuration for the calendar drawer component
 */
export interface CalendarDrawerConfig {
  ui: {
    title: string; // Drawer title
    description: string; // Instructions/description
    closeButtonText: string; // Close button text
    providers: {
      // Calendar provider options
      google: {
        label: string; // Display label
        src: string; // File Path
      };
      apple: {
        label: string;
        src: string; // File Path
      };
    };
  };
  event: CalendarEvent; // The event to add to calendar
}

// =====================
// MONEY GIFT CONFIGURATION
// =====================

/**
 * Configuration for the money gift drawer
 */
export interface MoneyGiftConfig {
  accountName: string; // Name on the bank account
  bankName: string; // Bank Name on the bank account
  accountNumber: string; // Bank account number
  qrCodeImageUrl: string; // URL of QR code image
  translations: {
    title: string; // Drawer title
    description: string; // Instructions
    copySuccessMessage: string; // Message when account number is copied
    closeButtonText: string; // Close button text
  };
}

// =====================
// LOCATION CONFIGURATION
// =====================

/**
 * Configuration for the location drawer
 */
export interface LocationConfig {
  coordinates: {
    latitude: number; // Venue latitude
    longitude: number; // Venue longitude
  };
  locationInfo: {
    title: string; // Drawer title
    description: string; // Instructions
    google: {
      googleMapsButtonText: string; // Google Maps button text
      src: string; // File Path
    };
    waze: {
      wazeButtonText: string; // Waze button text
      src: string; // File Path
    };
    closeButtonText: string; // Close button text
  };
}

// =====================
// CONTACT CONFIGURATION
// =====================

/**
 * Configuration for a contact person
 */
export interface ContactPerson {
  name: string; // Contact name
  phone: string; // Phone number
  designation: string; // Role/relationship
  avatarOptions?: {
    // Optional avatar styling
    background?: string;
    color?: string;
    size?: number;
  };
}

/**
 * Configuration for the contact drawer
 */
export interface ContactConfig {
  contacts: ContactPerson[]; // List of contacts
  translations: {
    title: string; // Drawer title
    description: string; // Instructions
    whatsappButtonText: string; // WhatsApp button text
    callButtonText: string; // Call button text
    closeButtonText: string; // Close button text
  };
  styles: {
    // CSS classes for styling
    card: string;
    whatsappButton: string;
    callButton: string;
  };
}

// =====================
// RSVP FORM CONFIGURATION
// =====================

/**
 * Configuration for the RSVP form
 */
export type RSVPFormConfig = {
  labels: {
    name: string; // Name field label
    speech: string; // Speech/comment field label
    isAttend: string; // Attendance checkbox label
    totalPerson: string; // Party size field label
  };
  placeholders: {
    name: string; // Name field placeholder
    speech: string; // Speech field placeholder
    totalPerson: string; // Party size placeholder
  };
  dialog: {
    title: string; // Form dialog title
    description: string; // Form instructions
    successTitle: string; // Success message title
    successMessage: string; // Success message body
  };
  buttons: {
    submit: string; // Submit button text
    submitLoading: string; // Submit button loading text
    cancel: string; // Cancel button text
    close: string; // Close button text
  };
};

// =====================
// TENTATIVE CONFIGURATION
// =====================

/**
 * Configuration for the Tentative
 */
// types
export interface TentativeConfig {
  time: string;
  activity: string;
}

// text and data
export const TENTATIVE_TEXT = {
  title: "Aturcara Majlis",
  description: "Berikut adalah jadual tentatif majlis kami.",
  closeButton: "Tutup",
};

// =====================
// ASSET CONFIGURATIONS
// =====================

/**
 * Configuration for Canva images
 */
export interface CanvaImageConfig {
  id: string; // Unique identifier
  url: string; // Image URL
  alt: string; // Alt text for accessibility
}

/**
 * Configuration for Countdown Base Background Image
 */
export interface BaseImageCountDownConfig {
  id: string; // Unique identifier
  url: string; // Image URL
  alt: string; // Alt text for accessibility
}

/**
 * Configuration for Countdown Base BAckground Image
 */
export interface BaseImageMessageConfig {
  id: string; // Unique identifier
  url: string; // Image URL
  alt: string; // Alt text for accessibility
}

/**
 * Configuration for play video
 */
export interface BackgroundVideoConfig {
  url: string;
  alt: string;
}
