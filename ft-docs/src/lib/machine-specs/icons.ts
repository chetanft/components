/**
 * Machine-readable spec builder for the Icons page.
 * Shared by the interactive UI toggle and the /machine/icons route.
 */

const iconNames = [
  "add", "add-trip", "aeroplane", "airtel", "alert-critical-fill", "alert-critical",
  "alert-informational-fill", "alert-informational", "arrow-bottom-left", "arrow-down-right",
  "arrow-down", "arrow-top-left", "arrow-top-right", "arrow-up", "backward", "bell",
  "bsnl", "bulk-actions", "bulk-trip", "bundle", "calendar-clock", "calendar", "cheap",
  "check-alt", "check-fill", "check", "chevron-down", "chevron-left", "chevron-right",
  "chevron-up", "clock", "clock-alert", "clock-cross", "clock-tick", "clock-warning",
  "close-filled", "comment", "compress", "consent-available", "consent-pending",
  "consent-rejected", "control-tower", "copy", "cross-icon", "cross", "cursor-pointer",
  "dashboard", "data-stack", "default-icon", "delete", "detention-at-destination",
  "detention-at-origin", "diversion", "division", "document-reuse", "document", "download",
  "drag", "edit", "eway-bill-expired", "excel", "expand", "export-file", "eye-invisible",
  "file-alt", "file-upload", "file-uploader", "file", "fill-details", "filter", "flame",
  "forward", "ft-colour", "ft-gray", "gmail-logo", "google-colour", "google-drive",
  "google-gray", "gps", "gst", "hamburger-menu", "hand", "help-circle", "home", "image",
  "arrow-left", "indent", "jio", "light-bulb", "link", "loading", "locate", "location",
  "lock", "logout", "long-stoppage", "mail", "map", "megaphone", "more", "more-options",
  "mtnl", "multiple-location", "multiple-time", "multiple-weight", "my-trip", "navigator",
  "no-signal", "notification", "noted", "octagon-alert-filled", "one-drive", "organisation",
  "outbound", "parcel-check", "password", "pause", "pause-filled", "pen", "phone-alt",
  "phone", "plant-alt", "plant", "planning", "play-fill", "play", "portable-tracking",
  "preview-fill", "preview", "recommended", "refresh", "remove", "reports", "road", "rocket",
  "route-deviation", "round-trip", "rupee-coin", "satellite", "save", "search", "send",
  "settlement", "settings", "shake-hand", "share", "shield-alert", "ship", "sim",
  "small-truck", "sort", "star", "stop", "streetview", "strength-high", "strength-low",
  "strength-medium", "strength-no-tracking", "subtract", "success", "tata",
  "temperature-cold", "temperature-default", "temperature-hot", "three-dot-menu", "time",
  "timer", "tracker", "tracking-interrupted", "train", "transit-delay", "triangle-alert",
  "trolley", "truck", "untracked", "user", "vehicle", "vodafone", "warehouse", "weight",
  "whatsapp", "contracted-bill", "upload-document", "part-truck-load", "reconciliation",
  "burger", "menu",
] as const;

const iconCategories: Record<string, readonly string[]> = {
  Navigation: ["chevron-up", "chevron-down", "chevron-left", "chevron-right", "arrow-up", "arrow-down", "arrow-top-left", "arrow-top-right", "arrow-bottom-left", "arrow-down-right", "backward", "forward", "expand"],
  Actions: ["add", "subtract", "edit", "delete", "save", "copy", "share", "download", "upload-document", "remove", "refresh"],
  Status: ["check", "check-alt", "check-fill", "cross", "cross-icon", "alert-critical", "alert-critical-fill", "alert-informational", "alert-informational-fill", "success", "loading", "close-filled"],
  "File & Document": ["file", "file-alt", "file-upload", "file-uploader", "document", "document-reuse", "excel", "export-file", "eway-bill-expired", "contracted-bill"],
  Communication: ["mail", "phone", "phone-alt", "comment", "send", "notification", "bell"],
  "Location & Maps": ["location", "multiple-location", "gps", "map", "navigator", "road", "route-deviation", "diversion", "detention-at-origin", "long-stoppage", "transit-delay", "tracking-interrupted"],
  "Business & Logistics": ["warehouse", "vehicle", "truck", "ship", "train", "aeroplane", "weight", "multiple-weight", "time", "multiple-time", "organisation", "user", "shake-hand", "bundle", "bulk-trip", "add-trip", "round-trip", "my-trip", "part-truck-load"],
  "Temperature & Environment": ["temperature-cold", "temperature-default", "temperature-hot", "plant", "plant-alt", "light-bulb"],
  Brand: ["google-colour", "google-gray", "ft-colour", "ft-gray", "airtel", "jio", "vodafone", "bsnl", "mtnl", "tata"],
  "UI & System": ["eye-invisible", "password", "lock", "cursor-pointer", "drag", "more", "three-dot-menu", "hamburger-menu", "burger", "menu", "preview", "preview-fill", "bulk-actions", "filter", "search", "sort", "settings", "dashboard", "control-tower", "planning", "reports", "indent", "data-stack", "division"],
  "Financial & Commerce": ["rupee-coin", "cheap", "recommended", "rocket", "settlement", "reconciliation"],
  Utility: ["clock", "calendar", "calendar-clock", "portable-tracking", "sim", "link", "logout", "home", "star", "play", "play-fill", "fill-details", "strength-high", "strength-low", "strength-medium", "strength-no-tracking", "tracker", "untracked", "arrow-left", "outbound", "pen", "default-icon"],
};

const iconStyleCategories: Record<string, readonly string[]> = {
  "Single Tone": iconNames.filter(
    (name) =>
      !name.includes("-fill") &&
      !name.includes("filled") &&
      !name.includes("colour") &&
      !name.includes("gray") &&
      !name.includes("logo") &&
      ![
        "dashboard", "control-tower", "my-trip", "reports", "indent", "add-trip",
        "bulk-trip", "truck", "settlement", "strength-high", "strength-medium",
        "strength-low", "strength-no-tracking", "planning", "home", "notification",
        "route-deviation", "diversion", "detention-at-destination", "tracking-interrupted",
        "untracked", "transit-delay", "detention-at-origin", "eway-bill-expired",
        "contracted-bill", "part-truck-load", "upload-document", "reconciliation",
        "sim", "lock", "default-icon", "long-stoppage",
      ].includes(name)
  ),
  "Double Tone": [
    "dashboard", "control-tower", "my-trip", "reports", "indent", "add-trip",
    "bulk-trip", "truck", "settlement", "strength-high", "strength-medium",
    "strength-low", "strength-no-tracking", "planning", "home", "notification",
    "route-deviation", "diversion", "detention-at-destination", "tracking-interrupted",
    "untracked", "transit-delay", "detention-at-origin", "eway-bill-expired",
    "contracted-bill", "part-truck-load", "upload-document", "reconciliation",
    "sim", "lock", "default-icon", "long-stoppage",
  ],
  Filled: iconNames.filter(
    (name) =>
      name.includes("-fill") ||
      name.includes("filled") ||
      name === "close-filled" ||
      name === "pause-filled" ||
      name === "octagon-alert-filled" ||
      name === "preview-fill" ||
      name === "play-fill"
  ),
  Logos: [
    "google-colour", "google-gray", "ft-colour", "ft-gray", "airtel", "jio",
    "vodafone", "bsnl", "mtnl", "tata", "gmail-logo", "whatsapp", "streetview",
    "one-drive", "google-drive",
  ],
};

export function buildIconsSpec(): string {
  return [
    "# FT Design System — Icons",
    `TOTAL: ${iconNames.length}`,
    'IMPORT: import { Icon } from "ft-design-system";',
    'USAGE: <Icon name="icon-name" size={24} />',
    "",
    "## All Icon Names",
    iconNames.join(", "),
    "",
    "## By Category",
    ...Object.entries(iconCategories).map(
      ([cat, names]) => `### ${cat}\n${names.join(", ")}`
    ),
    "",
    "## By Style",
    ...Object.entries(iconStyleCategories).map(
      ([style, names]) => `### ${style}\n${(names as readonly string[]).join(", ")}`
    ),
  ].join("\n");
}
