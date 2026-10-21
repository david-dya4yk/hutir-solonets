import type { Locale } from "@/locales/config";

export type BlogSection = {
  readonly h?: string;
  readonly p: readonly string[];
};

export type BlogText = {
  readonly title: string;
  readonly excerpt: string;
  readonly body: readonly BlogSection[];
};

export type BlogPost = {
  readonly slug: string;
  readonly date: string;
  readonly cover: string;
} & Readonly<Record<Locale, BlogText>>;

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "spa-in-any-weather",
    date: "2026-10-20",
    cover: "/assets/pool-indoor-1.jpg",
    uk: {
      title: "СПА в будь-яку погоду: басейни, джакузі та чан на дровах",
      excerpt:
        "Два криті басейни, відкритий басейн, джакузі, чан і сауна — розповідаємо, як влаштувати собі справжній день відновлення на хуторі.",
      body: [
        {
          p: [
            "Погода в Карпатах змінюється швидко, тому відпочинок у «Хуторі Солонець» від неї не залежить. СПА-зона відкрита для всіх гостей комплексу, і кожен знайде в ній свій ритм — від ранкового запливу до вечора в гарячій воді під зорями.",
          ],
        },
        {
          h: "Два криті басейни",
          p: [
            "Теплі басейни працюють щодня з 08:00 до 22:00. Великі вікна дивляться на ліс і терасу, тож можна плавати й спостерігати, як змінюються пори року. Увечері вмикається м’яка підсвітка — дітям особливо подобається.",
          ],
        },
        {
          h: "Відкритий басейн",
          p: [
            "Влітку це головне місце дня: шезлонги вздовж дерев’яної тераси, сонце і запах смерек довкола. Котеджі 01 і 02 розташовані поруч, тож до води — кілька кроків.",
          ],
        },
        {
          h: "Джакузі, чан і сауна",
          p: [
            "Після прогулянки лісом — тепла вода з гідромасажем у джакузі. Чан на дровах найкращий увечері й у перший сніг, коли над водою піднімається пара. А сауна з сухим жаром і запахом дерева чудово поєднується з контрастом: парна, басейн, свіже повітря — і знову в тепло.",
          ],
        },
        {
          h: "Порада",
          p: [
            "Найспокійніше в басейнах уранці та в будні дні. Якщо хочеться тиші, плануйте приїзд із неділі по четвер — на будні діє окрема знижка.",
          ],
        },
      ],
    },
    en: {
      title: "Spa in any weather: pools, jacuzzi and a wood-fired hot tub",
      excerpt:
        "Two indoor pools, an outdoor pool, a jacuzzi, a hot tub and a sauna — here is how to plan a proper day of rest at the farmstead.",
      body: [
        {
          p: [
            "Weather in the Carpathians changes quickly, so a stay at Hutir Solonets doesn’t depend on it. The spa area is open to every guest of the complex, and everyone finds their own rhythm — from a morning swim to an evening in hot water under the stars.",
          ],
        },
        {
          h: "Two indoor pools",
          p: [
            "The warm pools are open daily from 08:00 to 22:00. Large windows look out onto the forest and the terrace, so you can swim and watch the seasons change. In the evening soft lighting comes on — children love it.",
          ],
        },
        {
          h: "Outdoor pool",
          p: [
            "In summer it is the heart of the day: loungers along the wooden deck, sunshine and the scent of spruce all around. Cottages 01 and 02 stand right next to it, just a few steps from the water.",
          ],
        },
        {
          h: "Jacuzzi, hot tub and sauna",
          p: [
            "After a forest walk, warm hydromassage water in the jacuzzi. The wood-fired hot tub is best in the evening and at the first snow, when steam rises above the water. The sauna, with its dry heat and smell of wood, pairs perfectly with contrast: steam, pool, fresh air — and back into the warmth.",
          ],
        },
        {
          h: "A tip",
          p: [
            "The pools are quietest in the morning and on weekdays. If you’re after silence, plan your stay from Sunday to Thursday — weekdays come with a separate discount.",
          ],
        },
      ],
    },
  },
  {
    slug: "how-to-choose-a-cottage",
    date: "2026-10-14",
    cover: "/assets/home-cottages.jpg",
    uk: {
      title: "Як обрати котедж на хуторі: короткий путівник",
      excerpt:
        "Біля басейну, на краю лісу чи з панорамою на гори — підказуємо, який із семи котеджів підійде саме вашій компанії.",
      body: [
        {
          p: [
            "У «Хуторі Солонець» сім котеджів, і кожен має свій характер. Усі вони — з обладнаною кухнею, сервірованим обіднім столом, безкоштовним паркінгом поруч і автономним живленням, тож затишно буде за будь-яких умов. Різниця — у розташуванні, стилі та кількості гостей.",
          ],
        },
        {
          h: "Поруч із басейном — котеджі 01 і 02",
          p: [
            "Двоповерхові будинки в традиційному українському гірському стилі. Котедж 02 стоїть безпосередньо біля відкритого басейну, котедж 01 — трохи збоку від основної зони відпочинку. Добрий вибір для родин із дітьми, які проводять біля води весь день.",
          ],
        },
        {
          h: "Тиша й ліс — котедж 03",
          p: [
            "Розташований у найвищій точці комплексу, майже серед лісу. Віддаленість від основної зони відпочинку дає більше тиші та приватності — для тих, хто їде по спокій.",
          ],
        },
        {
          h: "Для великої компанії — котеджі 04, 05 і 06",
          p: [
            "Котедж 04 — найбільший у комплексі, розрахований на велику родину або дві сім’ї, з окремою мангальною зоною. Котеджі 05 і 06 — у стилі скандинавського мінімалізму, з п’ятьма спальнями, кожна з власним санвузлом, великою вітальнею зі столом на 12 гостей, власною терасою та мангалом.",
          ],
        },
        {
          h: "Краєвид на гори — котедж 07",
          p: [
            "Єдиний котедж з однорівневим плануванням: він займає другий поверх будівлі з окремим входом і дивиться вікнами на гори. На першому поверсі — критий басейн, доступний усім гостям.",
          ],
        },
        {
          h: "Не можете визначитися?",
          p: [
            "Залиште заявку з датами — ми підкажемо, які будинки вільні, і допоможемо обрати той, що найкраще пасує вашій компанії.",
          ],
        },
      ],
    },
    en: {
      title: "How to choose a cottage at the farmstead: a short guide",
      excerpt:
        "By the pool, at the edge of the forest or with a mountain panorama — here is which of the seven cottages suits your group best.",
      body: [
        {
          p: [
            "Hutir Solonets has seven cottages, each with its own character. All of them have a fully equipped kitchen, a set dining table, free parking nearby and an independent power supply, so they stay cosy whatever happens. The difference is in location, style and the number of guests.",
          ],
        },
        {
          h: "By the pool — cottages 01 and 02",
          p: [
            "Two-storey houses in the traditional Ukrainian mountain style. Cottage 02 stands right by the outdoor pool, cottage 01 slightly to the side of the main leisure area. A good choice for families with children who spend the whole day by the water.",
          ],
        },
        {
          h: "Silence and forest — cottage 03",
          p: [
            "Located at the highest point of the complex, almost in the forest. Its distance from the main leisure area means more silence and privacy — for those who come for peace and quiet.",
          ],
        },
        {
          h: "For a large group — cottages 04, 05 and 06",
          p: [
            "Cottage 04 is the largest in the complex, made for a big family or two families, with its own barbecue area. Cottages 05 and 06 are in a Scandinavian minimalist style, with five bedrooms, each with its own bathroom, a large living room with a table for 12, a private terrace and a barbecue.",
          ],
        },
        {
          h: "Mountain views — cottage 07",
          p: [
            "The only single-level cottage: it occupies the upper floor of the building with a separate entrance and looks out onto the mountains. On the ground floor there is an indoor pool open to all guests.",
          ],
        },
        {
          h: "Can’t decide?",
          p: [
            "Send us a request with your dates — we’ll tell you which houses are free and help you choose the one that suits your group best.",
          ],
        },
      ],
    },
  },
  {
    slug: "holiday-with-pets",
    date: "2026-10-07",
    cover: "/assets/home-about.jpg",
    uk: {
      title: "Відпочинок із домашнім улюбленцем: що варто знати",
      excerpt:
        "«Хутір Солонець» — pet-friendly. Розповідаємо про умови для чотирилапих гостей і про те, як зробити поїздку комфортною для всіх.",
      body: [
        {
          p: [
            "Нехай ніхто не залишається вдома: наша гостинність поширюється і на маленьких пухнастих гостей. Ліс довкола, свіже повітря й простора територія — улюбленцям тут подобається не менше, ніж господарям.",
          ],
        },
        {
          h: "Умови",
          p: [
            "Ми раді гостям із чотирилапими друзями вагою до 5 кг. Додаткова плата за перебування з улюбленцем — 300 грн. Будь ласка, попередьте нас про тварину під час бронювання.",
          ],
        },
        {
          h: "Правила",
          p: [
            "Просимо дбати про чистоту в котеджах і на території комплексу. Перебування тварин у басейнах заборонено — це правило діє для комфорту всіх гостей.",
          ],
        },
        {
          h: "Що взяти з собою",
          p: [
            "Звичний корм і миски, підстилку чи лежанку, повідець для прогулянок лісом і пакети для прибирання. Знайомі речі допоможуть улюбленцю швидше освоїтися на новому місці.",
          ],
        },
      ],
    },
    en: {
      title: "Holidays with a pet: what you should know",
      excerpt:
        "Hutir Solonets is pet-friendly. Here are the conditions for four-legged guests and how to make the trip comfortable for everyone.",
      body: [
        {
          p: [
            "No one should stay at home: our hospitality extends to small furry guests too. The forest all around, fresh air and plenty of space — pets enjoy it here as much as their owners.",
          ],
        },
        {
          h: "Conditions",
          p: [
            "We welcome guests with four-legged friends weighing up to 5 kg. The extra charge for a stay with a pet is UAH 300. Please let us know about your pet when booking.",
          ],
        },
        {
          h: "Rules",
          p: [
            "Please keep the cottages and grounds clean. Pets are not allowed in the pools — this rule is there for the comfort of all guests.",
          ],
        },
        {
          h: "What to bring",
          p: [
            "Their usual food and bowls, a blanket or bed, a lead for forest walks and bags for cleaning up. Familiar things help a pet settle into a new place faster.",
          ],
        },
      ],
    },
  },
];

export const blogPath = (slug?: string): string => (slug === undefined ? "/blog" : `/blog/${slug}`);

export const findPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);
