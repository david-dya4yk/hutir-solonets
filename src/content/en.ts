import type { LocalContent } from "./types";

export const en: LocalContent = {
  cottages: [
    {
      shot: "terrace and meadow",
      tagline: "Closest to the pools.",
      desc: "The closest cottage to the pools. A large terrace opens onto a meadow where the sun lingers late into the evening.",
    },
    {
      shot: "balcony with a ridge view",
      tagline: "A view of the ridges.",
      desc: "Set on the slope, with mountain ridges visible from the balconies. The spacious living room brings the whole group together.",
    },
    {
      shot: "forest edge, morning mist",
      tagline: "The quietest morning.",
      desc: "A secluded cottage at the edge of the forest. It is quietest here in the morning, when mist drifts over the grass.",
    },
    {
      shot: "facade and barbecue area",
      tagline: "For two families.",
      desc: "The largest in the complex — for a big family or two families together. A private barbecue area is right next to it.",
    },
    {
      shot: "terrace by the playground",
      tagline: "Next to the playground.",
      desc: "The playground is right next door: sip coffee on the terrace while watching the kids play.",
    },
    {
      shot: "panoramic windows, mountains",
      tagline: "Mountains in the window.",
      desc: "Two floors of light and wood. The panoramic living-room windows look straight out at the mountains.",
    },
    {
      shot: "path to the hot tub",
      tagline: "A few steps to the hot tub.",
      desc: "Deep in the grounds, closer to the hot tub. A great fit for a group of friends.",
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
      eyebrow: "Indoor pools",
      title: "Two indoor pools",
      text: "The warm pools are open in any weather. Large windows look out onto the forest — swim and watch the leaves fall.",
      slides: [
        "indoor pool, windows onto the forest",
        "indoor pool and loungers",
        "pool in the evening light",
        "relaxing by the pool edge",
      ],
      images: [
        {
          src: "/assets/spa-indoor-1.jpg",
          alt: "A guest with a glass in the indoor pool by panoramic windows",
          position: "center 68%",
        },
        {
          src: "/assets/spa-indoor-2.jpg",
          alt: "Indoor pool with a forest view through large windows",
          position: "center 48%",
        },
        {
          src: "/assets/spa-indoor-3.jpg",
          alt: "Indoor pool in the evening, light lines on the ceiling and wicker lamps",
          position: "center 52%",
        },
        {
          src: "/assets/spa-indoor-4.jpg",
          alt: "A guest resting at the edge of the indoor pool",
          position: "center 72%",
        },
      ],
    },
    {
      eyebrow: "Outdoor pool",
      title: "Outdoor pool",
      text: "In summer it is the heart of the day. Sun loungers, sunshine and the scent of spruce all around.",
      slides: [
        "outdoor pool and cottage, summer",
        "outdoor pool in the forest",
        "loungers by the pool",
      ],
      images: [
        {
          src: "/assets/spa-outdoor-3.jpg",
          alt: "Outdoor pool on a wooden deck next to a cottage, with the forest behind",
          position: "center 70%",
        },
        {
          src: "/assets/spa-outdoor-1.jpg",
          alt: "Outdoor pool with a wooden deck and loungers in the forest",
          position: "center 68%",
        },
        {
          src: "/assets/spa-outdoor-2.jpg",
          alt: "Loungers and a parasol by the outdoor pool",
          position: "center 82%",
        },
      ],
    },
    {
      eyebrow: "Jacuzzi",
      title: "Jacuzzi",
      text: "Warm water with hydromassage after a forest walk. Best in the evening, when everything around falls quiet.",
      slides: [
        "jacuzzi, evening light",
        "jacuzzi with a forest view",
        "towels and tea by the jacuzzi",
      ],
      images: [
        {
          src: "/assets/spa-jacuzzi-1.jpg",
          alt: "A guest relaxing in the jacuzzi on a terrace among spruces",
          position: "center 62%",
        },
        {
          src: "/assets/spa-jacuzzi-2.jpg",
          alt: "A couple in the jacuzzi on a winter night, steam rising over the water",
          position: "center 45%",
        },
        {
          src: "/assets/spa-jacuzzi-3.jpg",
          alt: "The lit jacuzzi during a snowfall",
          position: "center 70%",
        },
      ],
    },
    {
      eyebrow: "Hot tub",
      title: "Wood-fired hot tub",
      text: "Hot water under the open sky, steam over the surface and the dark forest all around. Especially beautiful in the evening and at the first snow.",
      slides: [
        "steam over the hot tub, evening",
        "hot tub and golden leaves",
        "hot tub in the first snow",
      ],
      images: [
        {
          src: "/assets/spa-chan-1.jpg",
          alt: "Guests in the hot tub among steam, candles and fire beneath",
          position: "center 18%",
        },
        {
          src: "/assets/spa-chan-2.jpg",
          alt: "The hot tub gazebo in the autumn garden",
          position: "center 52%",
        },
        {
          src: "/assets/spa-chan-3.jpg",
          alt: "The hot tub gazebo in winter, firewood by the stove",
          position: "center 34%",
        },
      ],
    },
    {
      eyebrow: "Sauna",
      title: "Finnish sauna",
      text: "Dry heat, the scent of wood and silence. After the steam room — into the pool or out into the fresh air, then back into the warmth.",
      slides: ["sauna, wooden benches"],
      images: [
        {
          src: "/assets/spa-sauna.jpg",
          alt: "A guest relaxing in the wooden sauna",
          position: "center 28%",
        },
      ],
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
      a: "Yes, we are pet-friendly! 🐾 Hutir Solonets welcomes guests with four-legged friends weighing up to 5 kg. The pet fee is UAH 300.\n\nPlease help keep the cottages and grounds clean. Pets are not allowed in the pools.",
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
  reviews: [
    "We woke up to silence. We haven't had a morning like that in a long time",
    "The hot tub under the stars — the best thing about this autumn",
    "The kids never left the pool, and we finally got some rest",
    "We came as a group of twelve — there was room for everyone",
    "A cottage, the forest and no city noise at all. We'll be back in winter",
    "We brought our dog — and she loved it here as much as we did",
    "The terrace, the barbecue and an evening we didn't want to end",
    "The power was on the whole time, even when the village had an outage",
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
