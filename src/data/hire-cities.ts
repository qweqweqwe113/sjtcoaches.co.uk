import hireLiverpool from "@/assets/hire-liverpool.jpg";
import hireLondon from "@/assets/hire-london.jpg";
import hireManchester from "@/assets/hire-manchester.jpg";
import hireEdinburgh from "@/assets/hire-edinburgh.jpg";
import hireBelfast from "@/assets/hire-belfast.jpg";
import hireBirmingham from "@/assets/hire-birmingham.jpg";
import hireBradford from "@/assets/hire-bradford.jpg";
import hireBristol from "@/assets/hire-bristol.jpg";
import hireCardiff from "@/assets/hire-cardiff.jpg";
import hireGlasgow from "@/assets/hire-glasgow.jpg";
import hireLeeds from "@/assets/hire-leeds.jpg";
import hireNewcastle from "@/assets/hire-newcastle.jpg";
import hireSheffield from "@/assets/hire-sheffield.jpg";
import hireUkInbound from "@/assets/hire-uk-inbound-tours.jpg";
import hireOther from "@/assets/hire-other-locations.jpg";
import hireDefault from "@/assets/hire-default.jpg";

export type HirePlace = {
  name: string;
  description: string;
};

export type HireCity = {
  slug: string;
  name: string;
  hero: string;
  intro: string;
  tagline: string;
  places: HirePlace[];
};

const CITY_IMAGES: Record<string, string> = {
  liverpool: hireLiverpool,
  london: hireLondon,
  manchester: hireManchester,
  edinburgh: hireEdinburgh,
  belfast: hireBelfast,
  birmingham: hireBirmingham,
  bradford: hireBradford,
  bristol: hireBristol,
  cardiff: hireCardiff,
  glasgow: hireGlasgow,
  leeds: hireLeeds,
  newcastle: hireNewcastle,
  sheffield: hireSheffield,
  "uk-inbound-tours": hireUkInbound,
  "other-locations": hireOther,
};

const PLACES: Record<string, HirePlace[]> = {
  liverpool: [
    { name: "Anfield Stadium", description: "Home of Liverpool FC and one of the country's largest football grounds." },
    { name: "The Beatles Story", description: "Award-winning museum charting the legacy of the Fab Four." },
    { name: "Royal Albert Dock", description: "Historic waterfront with galleries, restaurants and the Tate Liverpool." },
    { name: "Liverpool Cathedral", description: "Britain's largest cathedral, dominating the city skyline." },
    { name: "Mersey Ferries", description: "Iconic river crossings with panoramic views of the waterfront." },
    { name: "World Museum", description: "Free-entry museum spanning natural history, archaeology and space." },
  ],
  london: [
    { name: "Tower of London", description: "Historic fortress on the Thames, home to the Crown Jewels." },
    { name: "Buckingham Palace", description: "The official residence of the British monarch." },
    { name: "The British Museum", description: "World-class collection of art and antiquities, free to visit." },
    { name: "Westminster & Big Ben", description: "Houses of Parliament and the world's most famous clock tower." },
    { name: "London Eye", description: "Giant observation wheel with sweeping views over the Thames." },
    { name: "Wembley Stadium", description: "England's national stadium for football and major events." },
  ],
  manchester: [
    { name: "Old Trafford", description: "Theatre of Dreams, home to Manchester United." },
    { name: "Etihad Stadium", description: "Home of Manchester City FC and major concerts." },
    { name: "Manchester Arena", description: "One of the UK's largest indoor arenas." },
    { name: "Science and Industry Museum", description: "Exhibits celebrating Manchester's industrial heritage." },
    { name: "Salford Quays & MediaCity", description: "Modern waterfront with The Lowry and BBC studios." },
    { name: "Trafford Centre", description: "Landmark shopping and leisure destination." },
  ],
  edinburgh: [
    { name: "Edinburgh Castle", description: "Iconic fortress overlooking the Scottish capital." },
    { name: "Royal Mile", description: "Historic street linking the castle to Holyrood Palace." },
    { name: "Arthur's Seat", description: "Ancient volcano with panoramic views of the city." },
    { name: "Princes Street Gardens", description: "Central green space below the castle rock." },
    { name: "Holyrood Palace", description: "The King's official residence in Scotland." },
    { name: "Murrayfield Stadium", description: "Home of Scottish rugby and major events." },
  ],
};

const FALLBACK_PLACES: HirePlace[] = [
  { name: "City Centre", description: "Pickup and drop-off in the heart of the city for shopping and sightseeing." },
  { name: "Stadiums & Arenas", description: "Group transport for matchdays, concerts and major events." },
  { name: "Universities & Colleges", description: "Reliable transfers for students, staff and visiting groups." },
  { name: "Airport & Stations", description: "Punctual airport and rail station transfers, day or night." },
  { name: "Conference Venues", description: "Corporate group transfers to local exhibition centres." },
  { name: "Heritage & Cultural Sites", description: "Guided day trips to museums, galleries and landmarks." },
];

export const HIRE_CITY_LIST = [
  "Belfast",
  "Birmingham",
  "Bradford",
  "Bristol",
  "Cardiff",
  "Edinburgh",
  "Glasgow",
  "Leeds",
  "Liverpool",
  "London",
  "Manchester",
  "Newcastle",
  "Sheffield",
  "UK Inbound Tours",
  "Other Locations",
] as const;

export function citySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getHireCity(slug: string): HireCity {
  const match = HIRE_CITY_LIST.find((c) => citySlug(c) === slug);
  const name = match ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const key = match ? citySlug(match) : slug;
  return {
    slug: key,
    name,
    hero: CITY_IMAGES[key] ?? hireDefault,
    tagline: `Coach Hire ${name} with a great track record in transporting passengers safely and punctually.`,
    intro: `SJT Coaches offers first-rate transport services at competitive prices for groups of all sizes in ${name}. With years of experience and a fleet across multiple depots, we can quickly send the right coach to wherever you are. Choose from standard, executive and VIP class — all driven by professional, CPC-certified chauffeurs.`,
    places: PLACES[key] ?? FALLBACK_PLACES,
  };
}

export const HIRE_SERVICES = [
  { name: "8 Seat Standard MPV", capacity: "8 seats" },
  { name: "9–16 Seat Standard Minibus", capacity: "9–16 seats" },
  { name: "10–16 Seat Executive Minibus", capacity: "10–16 seats" },
  { name: "9–16 Seat Luxury VIP Coach", capacity: "9–16 seats" },
  { name: "17–25 Seat Midi Coach", capacity: "17–25 seats" },
  { name: "17–36 Seat Luxury VIP Coach", capacity: "17–36 seats" },
  { name: "26–37 Seat Midi Coach", capacity: "26–37 seats" },
  { name: "38–49 Seat Coach", capacity: "38–49 seats" },
  { name: "50–53 Seat Coach", capacity: "50–53 seats" },
  { name: "54–61 Seat Coach", capacity: "54–61 seats" },
  { name: "62–70 Seat Standard Coach", capacity: "62–70 seats" },
  { name: "71+ Seat Double Decker Coach", capacity: "71+ seats" },
] as const;

export const STANDARD_FEATURES = [
  "Comfortable, reclining seats",
  "Full air-conditioning",
  "PA / stereo sound system",
  "Generous luggage storage",
];

export const OPTIONAL_FEATURES = [
  "Wi-Fi",
  "On-board WC",
  "TV screens",
  "Seat-back tables",
  "USB charging points",
  "On-board kitchens",
];
