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
}

export const serverConfig: ServerConfig = {
  supabaseKey: "https://xhpugefhcgqjkanhmanu.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocHVnZWZoY2dxamthbmhtYW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4ODM1MjEsImV4cCI6MjA2MjQ1OTUyMX0.xTtQoriMeofCpAnaAd6c9IZbVI1pOzGt6nYQbgVEOHI",
  rsvpTableName: "Rsvp",
  serverEmail: "arfankareem1002@gmail.com",
  serverPassword: "omie yntf uidt rkow",
};

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

export const emailConfig: EmailConfig = {
  organizerEmailList: ["kamalHassan@mailnesia.com"], //["izhatieaisyah@gmail.com", "arfankareem1002@gmail.com"],
  brideEmailList: ["kamalHassan@mailnesia.com"], //["izhatieaisyah@gmail.com", "arfankareem1002@gmail.com"],
};

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

export const weddingCountdownConfig: CountdownConfig = {
  event: {
    name: "Majlis Perkahwinan",
    date: "2025-09-20T03:00:00Z",
    timeZone: "Asia/Kuala_Lumpur",
    location: "Sebening Embun Garden Event Hall",
  },
  ui: {
    title: "Walimatul Urus Amirul & Aisyah",
    badgeText: "Menghitung Hari",
    completedMessage: "Hari yang dinanti telah tiba",
    timeBoxLabels: {
      days: "Hari",
      hours: "Jam",
      minutes: "Minit",
      seconds: "Saat",
    },
  },
  prayer: {
    text: "Ya Allah Ya Rahman Ya Rahim, berkatilah majlis perkahwinan ini. Limpahkanlah baraqah dan rahmatMu kepada kedua-dua mempelai ini. Kurniakanlah mereka kelak zuriat yang soleh dan solehah. Kekalkanlah jodoh mereka hingga ke jannah. Aamiin.",
  },
};

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

export const BOTTOM_DOCK_ITEMS: DockItemConfig[] = [
  {
    key: "calendar",
    label: "Kalendar",
    icon: CalendarIcon,
    show: true,
  },
  {
    key: "moneyGift",
    label: "Salam Kaut",
    icon: GiftIcon,
    show: true,
  },
  {
    key: "location",
    label: "Lokasi",
    icon: MapPinIcon,
    show: true,
  },
  {
    key: "contact",
    label: "Hubungi",
    icon: PhoneIcon,
    show: true,
  },
  {
    key: "rsvp",
    label: "RSVP",
    icon: PencilSquareIcon,
    show: true,
  },
  {
    key: "tentative",
    label: "Tentatif",
    icon: ClockIcon,
    show: true,
  },
];

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

export const weddingCalendarConfig: CalendarDrawerConfig = {
  ui: {
    title: "Tambah ke Kalendar",
    description:
      "Gunakan pilihan di bawah untuk simpan tarikh ke kalendar anda.",
    closeButtonText: "Tutup",
    providers: {
      google: {
        label: "Add to Google Calendar",
        src: "/icons/google-calendar-icon.png",
      },
      apple: {
        label: "Add to Apple Calendar",
        src: "/icons/apple-calendar-icon.png",
      },
    },
  },
  event: {
    title: "Walimatul Urus Amirul & Aisyah",
    description: "",
    location: "Sebening Embun Garden Event Hall",
    startDate: "2025-09-20T03:00:00Z", // 11:00 AM MYT is 03:00 AM UTC
    endDate: "2025-09-20T08:00:00Z", // 04:00 PM MYT is 08:00 AM UTC
    timeZone: "Asia/Kuala_Lumpur",
  },
};

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

export const moneyGiftConfig: MoneyGiftConfig = {
  accountName: "Juana Binti Ahmad",
  bankName: "Maybank",
  accountNumber: "564418702167",
  qrCodeImageUrl:
    "https://drive.google.com/uc?export=view&id=1jDFkp0BNEiXsda8tu7rlGl7Go92AtOpx",
  translations: {
    title: "Salam Kaut",
    description: "Imbas kod QR atau salin nombor akaun",
    copySuccessMessage: "Account number copied!",
    closeButtonText: "Tutup",
  },
};

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

export const locationConfig: LocationConfig = {
  coordinates: {
    latitude: 2.8868436949766383,
    longitude: 101.76270193604462,
  },
  locationInfo: {
    title: "Lokasi Kami",
    description: "Gunakan aplikasi di bawah untuk navigasi ke lokasi kami.",
    google: {
      googleMapsButtonText: "Google Maps",
      src: "/icons/google-maps-icon.png",
    },
    waze: {
      wazeButtonText: "Waze",
      src: "/icons/waze-icon.png",
    },
    closeButtonText: "Tutup",
  },
};

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

export const contactConfig: ContactConfig = {
  contacts: [
    {
      name: "Amirul Irfan",
      phone: "+60196643494",
      designation: "Pengantin Lelaki",
      avatarOptions: {
        background: "random", // or specific color
        color: "#ffffff",
        size: 128,
      },
    },
    {
      name: "Nur Izhatie Aisyah",
      phone: "+60123611306",
      designation: "Pengantin Perempuan",
    },
    {
      name: "Juana Binti Ahmad",
      phone: "+60193823494",
      designation: "Ibu Pengantin Lelaki",
    },
    {
      name: "Norhaizan Binti Jumaat",
      phone: "+601131737650",
      designation: "Ibu Pengantin Perempuan",
    },
  ],
  translations: {
    title: "Hubungi Kami",
    description: "Terus hubungi sesiapa yang berkaitan.",
    whatsappButtonText: "WhatsApp",
    callButtonText: "Call",
    closeButtonText: "Tutup",
  },
  styles: {
    card: "text-center border p-4 rounded-md shadow-sm bg-white",
    whatsappButton:
      "flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition",
    callButton:
      "flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition",
  },
};

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

export const RSVP_FORM_CONFIG: RSVPFormConfig = {
  labels: {
    name: "Nama Anda",
    speech: "Ucapan",
    isAttend: "Saya Hadir",
    totalPerson: "Bilangan Rombongan",
  },
  placeholders: {
    name: "Contoh: Amirul Irfan",
    speech: "Ucapan anda...",
    totalPerson: "Pilih bilangan rombongan",
  },
  dialog: {
    title: "Isi Maklumat Kehadiran",
    description: "Kami hargai kehadiran dan ucapan anda",
    successTitle: "Terima kasih!",
    successMessage: "Respon anda telah diterima",
  },
  buttons: {
    submit: "Hantar RSVP",
    submitLoading: "Menghantar...",
    cancel: "Batal",
    close: "Tutup",
  },
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

export const TENTATIVE_SCHEDULE: TentativeConfig[] = [
  { time: "10:00 AM", activity: "Ketibaan tetamu" },
  { time: "11:00 AM", activity: "Ketibaan pengantin" },
  { time: "12:00 PM", activity: "Jamuan makan" },
  { time: "1:00 PM", activity: "Sesi fotografi" },
  { time: "2:00 PM", activity: "Bersurai" },
];

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

export const canvaImagesConfig: CanvaImageConfig[] = [
  {
    id: "1",
    url: "https://drive.google.com/uc?export=view&id=1horEWuMrSJ4rC-5tunEMev3tcYi5-SWZ",
    alt: "Main Image",
  },
  {
    id: "2",
    url: "https://drive.google.com/uc?export=view&id=1HO784nsHTwffwBr7rdL505x0NWT9PC2Z",
    alt: "Invitation image",
  },
  {
    id: "3",
    url: "https://drive.google.com/uc?export=view&id=19QFbyiBhtPbNGeXj3DwaaGZBT8_z_C3Z",
    alt: "Invitation image",
  },
];

/**
 * Configuration for Countdown Base Background Image
 */
export interface BaseImageCountDownConfig {
  id: string; // Unique identifier
  url: string; // Image URL
  alt: string; // Alt text for accessibility
}

export const baseBackGroundImageCountdownConfig: BaseImageCountDownConfig = {
  id: "bg-1",
  url: "https://drive.google.com/uc?export=view&id=1-kuql6CjYzDKwkf5cqwREqIU3FdcIbZh",
  alt: "Canva Design Background",
};

/**
 * Configuration for Countdown Base BAckground Image
 */
export interface BaseImageMessageConfig {
  id: string; // Unique identifier
  url: string; // Image URL
  alt: string; // Alt text for accessibility
}

export const baseBackGroundImageMessageConfig: BaseImageMessageConfig = {
  id: "bg-1",
  url: "https://drive.google.com/uc?export=view&id=1M6zdmu2NLTDN4bBP2aBkhnOL16VWAjrG",
  alt: "Canva Design Background",
};

/**
 * Configuration for play video
 */
export interface BackgroundVideoConfig {
  url: string;
  alt: string;
}

export const backgroundVideoConfig: BackgroundVideoConfig = {
  url: "https://xhpugefhcgqjkanhmanu.supabase.co/storage/v1/object/public/wedding-video//AI%20IA%20initials.mp4",
  alt: "Wedding Background Video",
};
