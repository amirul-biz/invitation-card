import {
  CalendarIcon,
  ClockIcon,
  GiftIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import {
  BackgroundVideoConfig,
  BaseImageCountDownConfig,
  BaseImageMessageConfig,
  CalendarDrawerConfig,
  CanvaImageConfig,
  ContactConfig,
  CountdownConfig,
  DockItemConfig,
  EmailConfig,
  LocationConfig,
  MoneyGiftConfig,
  RSVPFormConfig,
  ServerConfig,
  TentativeConfig,
} from "./config-app-environment-interface";

// ======================
// SERVER CONFIGURATION
// ======================

/**
 * Configuration for the server
 */
export const serverDemoConfig: ServerConfig = {
  supabaseKey: "https://xhpugefhcgqjkanhmanu.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocHVnZWZoY2dxamthbmhtYW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4ODM1MjEsImV4cCI6MjA2MjQ1OTUyMX0.xTtQoriMeofCpAnaAd6c9IZbVI1pOzGt6nYQbgVEOHI",
  rsvpTableName: "Rsvp",
  serverEmail: "arfankareem1002@gmail.com",
  serverPassword: "omie yntf uidt rkow",
  userId: "demoUser",
  personalMessageLimit: "100000",
  headcountMessageLimit: "10000",
};

export const serverConfig: ServerConfig = {
  supabaseKey: process.env.SUPABASE_URL ?? serverDemoConfig.supabaseKey,
  supabaseAnonKey:
    process.env.SUPABASE_ANON_KEY ?? serverDemoConfig.supabaseAnonKey,
  rsvpTableName: process.env.RSVP_TABLE_NAME ?? serverDemoConfig.rsvpTableName,
  serverEmail: process.env.SERVER_EMAIL ?? serverDemoConfig.serverEmail,
  serverPassword:
    process.env.SERVER_PASSWORD ?? serverDemoConfig.serverPassword,
  userId: process.env.SERVER_USER_ID ?? serverDemoConfig.userId,
  personalMessageLimit:
    process.env.PERSONAL_MESSAGE_LIMIT ?? serverDemoConfig.personalMessageLimit,
  headcountMessageLimit:
    process.env.HEADCOUNT_MESSAGE_LIMIT ??
    serverDemoConfig.headcountMessageLimit,
};

// ======================
// EMAIL CONFIGURATION
// ======================

/**
 * Configuration for the email component
 */

export const emailDemoConfig: EmailConfig = {
  organizerEmailList: ["kamalHassan@mailnesia.com"],
  brideEmailList: ["kamalHassan@mailnesia.com"],
};

export const emailConfig: EmailConfig = {
  organizerEmailList:
    process.env.ORGANIZER_EMAIL_LIST?.split(",") ??
    emailDemoConfig.brideEmailList,
  brideEmailList:
    process.env.BRIDE_EMAIL_LIST?.split(",") ??
    emailDemoConfig.organizerEmailList,
};

// ======================
// COUNTDOWN CONFIGURATION
// ======================

/**
 * Configuration for the countdown component
 */

export const weddingCountdownConfig: CountdownConfig = {
  event: {
    name: "Majlis Perkahwinan",
    date: "2025-09-20T03:00:00Z", //TODO
    timeZone: "Asia/Kuala_Lumpur",
    location: "Sebening Embun Garden Event Hall", //TODO
  },
  ui: {
    title: "Walimatul Urus Amirul & Aisyah", //TODO
    badgeText: "Jumlah Tetamu",
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
    show: false,
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
 * Configuration for the calendar drawer component
 */

export const weddingCalendarConfig: CalendarDrawerConfig = {
  ui: {
    title: "Tambah ke Kalendar",
    description:
      "Gunakan pilihan di bawah untuk simpan tarikh ke kalendar anda.",
    closeButtonText: "Tutup",
    providers: {
      google: {
        label: "Google Calendar",
        src: "/icons/google-calendar-icon.png",
      },
      apple: {
        label: "Apple Calendar",
        src: "/icons/apple-calendar-icon.png",
      },
    },
  },
  event: {
    title: weddingCountdownConfig.ui.title,
    description: "",
    location: weddingCountdownConfig.event.location,
    startDate: "2025-09-20T03:00:00Z", // 11:00 AM MYT is 03:00 AM UTC //TODO
    endDate: "2025-09-20T08:00:00Z", // 04:00 PM MYT is 08:00 AM UTC //TODO
    timeZone: "Asia/Kuala_Lumpur",
  },
};

// =====================
// MONEY GIFT CONFIGURATION
// =====================

/**
 * Configuration for the money gift drawer
 */

export const moneyGiftConfig: MoneyGiftConfig = {
  accountName: "Juana Binti Ahmad", //TODO
  bankName: "Maybank", //TODO
  accountNumber: "564418702167", //TODO
  qrCodeImageUrl:
    "https://drive.google.com/uc?export=view&id=1jDFkp0BNEiXsda8tu7rlGl7Go92AtOpx", //TODO
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
export const locationConfig: LocationConfig = {
  coordinates: {
    latitude: 2.8867151123114785, //TODO
    longitude: 101.76270193675566, //TODO
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
 * Configuration for the contact drawer
 */

export const contactConfig: ContactConfig = {
  //TODO
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
      name: "Puan Juana Ahmad",
      phone: "+60193823494",
      designation: "Ibu Pengantin Lelaki",
    },
    {
      name: "YB Khairul Azreem",
      phone: "+60196643494",
      designation: "Bapa Pengantin Lelaki",
    },
    {
      name: "Ainul Kamilia",
      phone: "+60136851282",
      designation: "Adik Pengantin Lelaki",
    },
    {
      name: "Juanita Ahmad",
      phone: "+60192104121",
      designation: "Ibu Saudara Pengantin Lelaki",
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

export const RSVP_FORM_CONFIG: RSVPFormConfig = {
  labels: {
    name: "Nama Anda",
    speech: "Ucapan",
    isAttend: "(Tandakan) *jika hadir",
    totalPerson: "Bilangan Tetamu",
  },
  placeholders: {
    name: "Nama anda...",
    speech: "Ucapan anda...",
    totalPerson: "Pilih bilangan tetamu",
  },
  dialog: {
    title: "Ucapan Kepada Pegantin",
    description: "Kami hargai ucapan dan kehadiran anda",
    successTitle: "Terima kasih!",
    successMessage: "Respon anda telah diterima",
  },
  buttons: {
    submit: "Hantar Ucapan",
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
export const TENTATIVE_TEXT = {
  title: "Aturcara Majlis",
  description: "Berikut adalah jadual tentatif majlis kami.",
  closeButton: "Tutup",
};

export const TENTATIVE_SCHEDULE: TentativeConfig[] = [
  //TODO
  { time: "11:00 Pagi", activity: "Ketibaan tetamu" },
  { time: "12:30 Tengahari", activity: "Ketibaan pengantin" },
  { time: "4:00 Petang", activity: "Majlis Tamat" },
];

// =====================
// ASSET CONFIGURATIONS
// =====================

/**
 * Configuration for Canva images
 */

export const canvaImagesConfig: CanvaImageConfig[] = [
  //TODO
  {
    id: "1",
    url: "https://drive.google.com/uc?export=view&id=1zBG4PJlwnetOMK4IdUtQRobkVLS0P94I",
    alt: "Main Image",
  },
  {
    id: "2",
    url: "https://drive.google.com/uc?export=view&id=12Xd9d8r82JMpKJ1XcDPBxCH9L038snce",
    alt: "Invitation image",
  },
  {
    id: "3",
    url: "https://drive.google.com/uc?export=view&id=10FNuieMFWJdd5W_9h5HOiQPG2u3YFern",
    alt: "Tenative",
  },
];

/**
 * Configuration for Countdown Base Background Image
 */

export const baseBackGroundImageCountdownConfig: BaseImageCountDownConfig = {
  //TODO
  id: "bg-1",
  url: "https://drive.google.com/uc?export=view&id=1btGVKGc1-vL0m237WYA_uyaWJlLgm-EH",
  alt: "Canva Design Background",
};

/**
 * Configuration for Message Base BAckground Image
 */

export const baseBackGroundImageMessageConfig: BaseImageMessageConfig = {
  id: "bg-1",
  url: "https://drive.google.com/uc?export=view&id=1Uhj3i5Fqmc67in9H6F_dvW9c6faHX98v",
  alt: "Canva Design Background",
};

/**
 * Configuration for play video
 */

export const backgroundVideoConfig: BackgroundVideoConfig = {
  url: "https://xhpugefhcgqjkanhmanu.supabase.co/storage/v1/object/public/wedding-video//20-9-2025-amirul-aisyah-sebening-embun%20(2).webm", //TODO
  alt: "Wedding Background Video",
};

/**
 * Configuration for play music
 */

export const backgroundMusicConfig: string = "/song.mp3";
