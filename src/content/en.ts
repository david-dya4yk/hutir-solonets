import type { Room } from "./site";
import type { LocalContent } from "./types";

const BEDROOM_1_2 = ["Double bed", "Two chairs and a table", "Wardrobe"];

const ROOMS_1_2: readonly Room[] = [
  {
    title: "Living room",
    shot: "studio living room with kitchen",
    text: "A spacious 32.3 m² studio living room with a kitchen, an electric fireplace and a set dining table.",
    items: [
      "Sofa bed",
      "Electric fireplace",
      "TV",
      "Set dining table",
      "Gas hob",
      "Microwave",
      "Electric kettle",
      "Sink",
      "Extra dishes",
      "Bottled drinking water",
    ],
  },
  {
    title: "Bedroom 1",
    shot: "bedroom 1",
    text: "A 15 m² bedroom. The 5 m² bathroom is entered from the hallway.",
    items: BEDROOM_1_2,
  },
  {
    title: "Bedroom 2",
    shot: "bedroom 2",
    text: "A 16.1 m² bedroom with its own 5 m² bathroom.",
    items: [...BEDROOM_1_2, "En-suite bathroom"],
  },
  {
    title: "Bedroom 3",
    shot: "bedroom 3",
    text: "A 16.1 m² bedroom with its own 5 m² bathroom.",
    items: [...BEDROOM_1_2, "En-suite bathroom"],
  },
  {
    title: "Bedroom 4",
    shot: "bedroom 4",
    text: "A 15 m² bedroom with a 5.4 m² bathroom.",
    items: [...BEDROOM_1_2, "Bathroom"],
  },
  {
    title: "Terrace",
    shot: "terrace",
    text: "A spot for morning coffee and evening talks in the fresh air.",
    items: ["Table", "Sofa"],
  },
];

const BEDROOM_3 = ["Double bed", "Bedside bench", "Clothes rack", "En-suite bathroom"];

const ROOMS_3: readonly Room[] = [
  {
    title: "Living room",
    shot: "studio living room with kitchen",
    text: "A studio living room with a kitchen and a set dining table.",
    items: [
      "Sofa bed",
      "Coffee table",
      "TV",
      "Set dining table",
      "Electric hob",
      "Microwave",
      "Electric kettle",
      "Sink",
      "Extra dishes",
    ],
  },
  {
    title: "Bedroom 1",
    shot: "bedroom 1",
    text: "A bedroom with a double bed and an extra sofa.",
    items: ["Double bed", "Sofa"],
  },
  {
    title: "Bathroom",
    shot: "bathroom",
    text: "A bathroom with a shower and a water heater.",
    items: ["Shower", "Toilet", "Washbasin", "Water heater"],
  },
  {
    title: "Bedroom 2",
    shot: "bedroom 2",
    text: "A bedroom with its own bathroom.",
    items: BEDROOM_3,
  },
  {
    title: "Bedroom 3",
    shot: "bedroom 3",
    text: "A bedroom with its own bathroom.",
    items: BEDROOM_3,
  },
];

const BEDROOM_5_6 = [
  "Double bed",
  "Wardrobe",
  "Bedside bench",
  "Bedside tables",
  "Armchair",
  "Lamp",
  "En-suite bathroom",
];

const ROOMS_5_6: readonly Room[] = [
  {
    title: "Living room",
    shot: "living room with kitchen",
    text: "A large 51 m² living room with a kitchen and a set dining table for 12 guests.",
    items: [
      "Sofa bed",
      "TV",
      "Set dining table",
      "12 chairs",
      "Gas hob",
      "Microwave",
      "Electric kettle",
      "Fridge",
      "Extra dishes",
      "Toilet",
    ],
  },
  {
    title: "Bedroom 1",
    shot: "bedroom 1",
    text: "A 16.7 m² ground-floor bedroom with its own 3.8 m² bathroom.",
    items: BEDROOM_5_6,
  },
  {
    title: "Bedroom 2",
    shot: "bedroom 2",
    text: "A 17 m² bedroom with its own 3 m² bathroom.",
    items: BEDROOM_5_6,
  },
  {
    title: "Bedroom 3",
    shot: "bedroom 3",
    text: "A 17 m² bedroom with its own bathroom.",
    items: BEDROOM_5_6,
  },
  {
    title: "Bedroom 4",
    shot: "bedroom 4",
    text: "A 10.6 m² bedroom with its own bathroom.",
    items: BEDROOM_5_6,
  },
  {
    title: "Bedroom 5",
    shot: "bedroom 5",
    text: "A 14.3 m² bedroom with its own bathroom.",
    items: BEDROOM_5_6,
  },
];

export const en: LocalContent = {
  cottages: [
    {
      shot: "terrace and meadow",
      tagline: "Closest to the pool.",
      desc: "A two-storey cottage in the traditional Ukrainian mountain style, set right next to the outdoor pool. The windows look out over the pool, the grounds and the forest. Parking is close by.",
      rooms: ROOMS_1_2,
    },
    {
      shot: "balcony with a ridge view",
      tagline: "Next to the pool.",
      desc: "A two-storey cottage with distinctive Ukrainian mountain architecture, set near the outdoor pool, slightly aside from the main poolside area. The windows look out over the grounds and the surrounding forest.",
      rooms: ROOMS_1_2,
    },
    {
      shot: "forest edge, morning mist",
      tagline: "Closest to the forest.",
      desc: "A two-storey cottage in the traditional mountain style, set at the highest point of the complex, almost in the forest. Being away from the main leisure area means more quiet and privacy, and the windows look out over the forest and the grounds.",
      rooms: ROOMS_3,
    },
    {
      shot: "facade and barbecue area",
      tagline: "For two families.",
      desc: "The largest in the complex — for a big family or two families together. A private barbecue area is right next to it.",
    },
    {
      shot: "terrace by the playground",
      tagline: "Closer to nature.",
      desc: "A two-storey cottage in Scandinavian minimalist style, set in the modern part of the complex, closest to the forest. It has its own terrace overlooking the forest and a barbecue area. The windows look out over the forest and the grounds.",
      rooms: ROOMS_5_6,
    },
    {
      shot: "panoramic windows, mountains",
      tagline: "Overlooking the meadow.",
      desc: "A two-storey cottage in Scandinavian minimalist style, set at the far left of the modern part of the complex. It has its own terrace overlooking a green meadow and a barbecue area. The windows look out over nature and the grounds.",
      rooms: ROOMS_5_6,
    },
    {
      shot: "path to the hot tub",
      tagline: "With a panoramic mountain view.",
      desc: "A special cottage in Scandinavian minimalist style, on the upper floor of the building with a separate entrance. The only single-level cottage in the complex. The windows open onto a picturesque view of the mountains and the grounds of Hutir Solonets. The ground floor of the building houses the indoor pool, open to all guests.",
    },
  ],
  features: [
    {
      num: "01",
      title: "Pet friendly",
      text: "Nobody has to stay at home. Our hospitality extends to small furry guests too.",
    },
    {
      num: "02",
      title: "SPA area",
      text: "Two indoor pools, an outdoor pool, a jacuzzi and a wood-fired hot tub — everything you need to unwind.",
    },
    {
      num: "03",
      title: "Free parking",
      text: "A parking spot right next to your cottage, at no extra cost.",
    },
    {
      num: "04",
      title: "Comfort in any conditions",
      text: "Your stay does not depend on power outage schedules. Thanks to backup power, the cottages are always cosy, bright and warm.",
    },
  ],
  rooms: [
    {
      title: "Bedroom",
      shot: "bedroom in warm natural tones",
      text: "Bright and spacious, in warm natural tones. In the morning — silence and the scent of the forest through the open window.",
      items: ["Double bed", "Bedside tables", "Wardrobe", "TV", "Air conditioning"],
    },
    {
      title: "Kitchen",
      shot: "kitchen, large wooden table",
      text: "A fully equipped kitchen with a big table that seats the whole group.",
      items: [
        "Electric kettle",
        "Large fridge",
        "Induction hob",
        "Microwave",
        "Dishes",
        "Coffee machine",
        "Large table",
      ],
    },
    {
      title: "Living room",
      shot: "living room in the evening light",
      text: "A place for long conversations, board games and a film after a walk.",
      items: ["Lounge area", "TV"],
    },
    {
      title: "Bathroom",
      shot: "bathroom, stone and wood",
      text: "Stone, wood and soft light. Fresh towels are waiting for every guest.",
      items: ["Shower", "Towels", "Hair dryer", "Toiletries"],
    },
    {
      title: "Terrace",
      shot: "terrace, forest and mountains in the evening",
      text: "This is where you have breakfast, dinner and watch the sun set over the mountains.",
      items: ["Dining table", "Armchairs", "Access to the barbecue", "Forest and mountain view"],
    },
    {
      title: "Grounds",
      shot: "terrace, barbecue and a mountain view",
      text: "Everything around the cottage: your own terrace, a barbecue, space for kids and free parking.",
      items: [
        "Balconies",
        "Terrace",
        "Barbecue access",
        "Lounge area",
        "Mountain view",
        "Playground",
        "Free parking",
      ],
    },
  ],
  spa: [
    {
      title: "Two indoor pools",
      text: "The warm pools are open in any weather. Large windows look out onto the forest — swim and watch the leaves fall.",
      slides: [
        "indoor pool, windows onto the garden",
        "a walk along the pool",
        "kids in the lit pool",
        "friends at the pool edge",
        "the pool in the evening",
        "the second indoor pool",
        "the second pool, windows onto the forest",
      ],
      images: [
        {
          src: "/assets/pool-indoor-1.jpg",
          alt: "Indoor pool with light lines on the ceiling, wicker lamps and floor-to-ceiling windows onto the garden",
          position: "center 55%",
        },
        {
          src: "/assets/pool-indoor-2.jpg",
          alt: "A guest walking along the indoor pool past the large windows",
          position: "center 45%",
        },
        {
          src: "/assets/pool-indoor-3.jpg",
          alt: "A family in the indoor pool with violet hydromassage lights",
          position: "center 55%",
        },
        {
          src: "/assets/pool-indoor-4.jpg",
          alt: "Three friends leaning on the edge of the indoor pool",
          position: "center 40%",
        },
        {
          src: "/assets/pool-indoor-5.jpg",
          alt: "Two guests in the indoor pool lit for the evening",
          position: "center 65%",
        },
        {
          src: "/assets/pool-indoor-6.jpg",
          alt: "The second indoor pool with mosaic tiles and a lounger by the windows",
          position: "center 55%",
        },
        {
          src: "/assets/pool-indoor-7.jpg",
          alt: "The second indoor pool with the terrace and forest through the windows",
          position: "center 55%",
        },
      ],
    },
    {
      title: "Outdoor pool",
      text: "In summer it is the heart of the day. Sun loungers, sunshine and the scent of spruce all around.",
      slides: [
        "outdoor pool and guests on sun loungers",
        "outdoor pool by the cottage",
        "by the pool in summer",
        "the pool from the terrace above",
        "water and cottages",
      ],
      images: [
        {
          src: "/assets/pool-outdoor-1.jpg",
          alt: "The outdoor pool and guests on sun loungers along the wooden deck",
          position: "center 58%",
        },
        {
          src: "/assets/pool-outdoor-2.jpg",
          alt: "The outdoor pool on a wooden deck by a cottage, forest behind",
          position: "center 62%",
        },
        {
          src: "/assets/pool-outdoor-3.jpg",
          alt: "Two guests sitting on the edge of the outdoor pool",
          position: "center 55%",
        },
        {
          src: "/assets/pool-outdoor-4.jpg",
          alt: "The outdoor pool and sun loungers seen from a cottage terrace above",
          position: "center 62%",
        },
        {
          src: "/assets/pool-outdoor-5.jpg",
          alt: "Blue water of the outdoor pool with the wooden cottages behind",
          position: "center 50%",
        },
      ],
    },
    {
      title: "Jacuzzi",
      text: "Warm water with hydromassage after a forest walk. Best in the evening, when everything around falls quiet.",
      slides: [
        "jacuzzi, evening light",
        "jacuzzi with a forest view",
        "towels and tea by the jacuzzi",
      ],
    },
    {
      title: "Wood-fired hot tub",
      text: "Hot water under the open sky, steam over the surface and the dark forest all around. Especially beautiful in the evening and at the first snow.",
      slides: [
        "steam over the hot tub, evening",
        "hot tub and golden leaves",
        "hot tub in the first snow",
      ],
    },
    {
      title: "Finnish sauna",
      text: "Dry heat, the scent of wood and silence. After the steam room — into the pool or out into the fresh air, then back into the warmth.",
      slides: ["sauna, wooden benches"],
    },
  ],
  faq: [
    {
      q: "What are the check-in and check-out times?",
      a: "Check-in is from 14:00, check-out is until 11:00. If the cottage is free, we can arrange an early check-in or a late check-out.",
    },
    {
      q: "How do I book a cottage?",
      a: "A booking requires a prepayment of UAH 2,000 for each night of your stay. Once we receive the prepayment, the booking is confirmed.",
    },
    {
      q: "Can I invite guests who will not stay overnight?",
      a: "Yes, during your stay you can invite friends or family who will not stay overnight. Each additional guest is charged UAH 500, regardless of how long they stay.",
    },
    {
      q: "Can I bring pets?",
      a: "Yes, we are pet-friendly! Hutir Solonets welcomes guests with four-legged friends weighing up to 5 kg. The pet fee is UAH 300.\n\nPlease help keep the cottages and grounds clean. Pets are not allowed in the pools.",
    },
    {
      q: "Can I cancel a booking and get my prepayment back?",
      a: "Yes, the refund depends on when you cancel:\n\n• 14 or more days before check-in — we refund 90% of the prepayment.\n• 7–13 days before — 50% of the prepayment.\n• Less than 7 days before — the prepayment is non-refundable.\n\nBooking dates can be changed no later than 10 days before check-in. Separate terms apply to holidays and New Year.",
    },
  ],
  offers: [
    {
      title: "Deals",
      items: [
        {
          tag: "On now",
          title: "−UAH 1,000 for two nights or more",
          text: "Book a cottage for two nights or more and we will take UAH 1,000 off the price.",
          shot: "autumn forest by the cottage",
          cta: "Book now",
          cert: false,
        },
        {
          tag: "Sunday — Thursday",
          title: "Weekdays in the forest",
          text: "15% off weekday stays. Quieter pools, more forest for you.",
          shot: "empty pool in the morning",
          cta: "Book now",
          cert: false,
        },
      ],
    },
    {
      title: "Seasonal offers",
      items: [
        {
          tag: "October — November",
          title: "Autumn in the Carpathians",
          text: "Forest walks, mushrooms, the hot tub at sunset and long evenings on the terrace.",
          shot: "golden leaves, forest path",
          cta: "Book now",
          cert: false,
        },
        {
          tag: "30 December — 2 January",
          title: "New Year in the forest",
          text: "Ring in the new year in a warm cottage among snow-covered spruces. Bookings are already open.",
          shot: "cottage in the evening, fairy lights",
          cta: "Book now",
          cert: false,
        },
      ],
    },
    {
      title: "Gift certificates",
      items: [
        {
          tag: "UAH 14,000",
          title: "A night at the hutir",
          text: "A certificate for one night in a cottage for a group of up to 12 guests. Valid for one year from purchase.",
          shot: "certificate in a kraft envelope",
          cta: "Order a certificate",
          cert: true,
        },
        {
          tag: "From UAH 3,000",
          title: "Gift amount certificate",
          text: "You choose the amount, the recipient chooses the dates and the cottage. It can be used in parts.",
          shot: "card on a wooden table",
          cta: "Order a certificate",
          cert: true,
        },
      ],
    },
  ],
  planAmenities: [
    "Indoor pools",
    "Outdoor pool",
    "Jacuzzi",
    "Hot tub",
    "Barbecue areas",
    "Playground",
    "Parking",
    "Restaurant · coming soon",
  ],
  homeCottageDots: ["Kitchen", "Terrace", "Barbecue", "Mountain view"],
  homeSpaDots: ["Indoor pools", "Outdoor pool", "Jacuzzi", "Hot tub"],
  legal: {
    privacy: {
      title: "Privacy Policy",
      tab: "Privacy",
      lead: "We take care of your data. Here we explain what data we collect, why, and how you can manage it.",
      items: [
        [
          "Who processes the data",
          "The data controller is sole proprietor Surname I. P. (tax ID 0000000000), Hutir Solonets complex, Solonytska St., Myhove village. Contact for data questions: hello@solonets.com.ua.",
        ],
        [
          "What data we collect",
          "The name, phone number, check-in and check-out dates, number of guests and comment you leave in our forms. Automatically — technical data: IP address, device and browser type, pages viewed.",
        ],
        [
          "Why",
          "To process your request and confirm the booking by phone, to improve the website and, with your consent, to show relevant ads on Facebook and Instagram.",
        ],
        [
          "Meta Pixel",
          "With your consent, the website uses Meta Pixel by Meta Platforms Ireland Ltd. It records page visits and request submissions so we can measure ad performance. Meta processes this data under its own privacy policy.",
        ],
        [
          "Legal basis",
          "Your consent (request forms, analytics and advertising cookies) and steps taken before entering into an accommodation contract — under the Law of Ukraine “On Personal Data Protection” and the GDPR.",
        ],
        [
          "Retention period",
          "We keep request data for up to 3 years after your last visit, and analytics and advertising cookies for up to 180 days.",
        ],
        [
          "Who we share it with",
          "We do not sell data to third parties. Only our administrators and the services that run the website and ads (hosting, Meta) have access.",
        ],
        [
          "Your rights",
          "You can find out what data we hold, correct or delete it, withdraw your consent at any time, or file a complaint with the Ukrainian Parliament Commissioner for Human Rights. Write to us at hello@solonets.com.ua.",
        ],
      ],
    },
    cookies: {
      title: "Cookie Policy",
      tab: "Cookies",
      lead: "Cookies are small files that a website stores in your browser. We use analytics and advertising cookies only with your consent.",
      items: [
        [
          "Necessary",
          "They remember your cookie choice and site language. The site will not work properly without them, so they are always active.",
        ],
        [
          "Analytics",
          "They help us understand which pages are most useful and make the site more convenient. The data is anonymised.",
        ],
        [
          "Advertising (Meta Pixel)",
          "_fbp and _fbc from Meta — to measure ads on Facebook and Instagram and show offers to people who have already shown interest in the hutir. They last up to 90 days.",
        ],
        [
          "How to change your choice",
          "Click “Cookie settings” at the bottom of the site or clear cookies in your browser settings.",
        ],
      ],
    },
    terms: {
      title: "Booking Terms",
      tab: "Booking terms",
      lead: "A short guide to how booking works at Hutir Solonets. We confirm the final terms by phone.",
      items: [
        [
          "Request",
          "A request on the website is not a final booking. We will call you back, clarify the details and confirm the dates.",
        ],
        [
          "Prepayment",
          "A prepayment may be required to secure the dates — we will tell you the amount and payment method during the call. There is no online payment on the website.",
        ],
        [
          "Cancellation",
          "90% of the prepayment is refunded if you cancel 14 or more days before check-in, 50% if you cancel 7–13 days before. Less than 7 days before, the prepayment is non-refundable.",
        ],
        [
          "Check-in and check-out",
          "Check-in is from 14:00, check-out is until 11:00. An identity document is required at check-in.",
        ],
        [
          "House rules",
          "Quiet hours are from 23:00 to 08:00. Smoking is not allowed in the cottages. Please let us know about pets in advance.",
        ],
      ],
    },
  },
};
