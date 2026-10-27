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
    slug: "myhove-winter",
    date: "2026-10-28",
    cover: "/assets/spa-chan-1.jpg",
    uk: {
      title: "Мигове взимку: лижі, ковзанка і SPA в Буковинських Карпатах",
      excerpt:
        "Траси для новачків і дітей, вечірнє катання, тюбінг і ковзанка, а після — басейн і чан на дровах. Розповідаємо, як провести зимові вихідні в Мигове.",
      body: [
        {
          p: [
            "Мигове — гірськолижне село у Вижницькому районі Чернівецької області, приблизно за 63 км від Чернівців. Тут немає натовпів і черг, як на великих курортах, зате є все, що потрібно для спокійного зимового відпочинку: доглянуті траси, вечірнє катання, ковзанка й ліс довкола. «Хутір Солонець» розташований у тихій частині цього ж села, тож день на схилі легко завершити в теплому басейні.",
          ],
        },
        {
          h: "Траси Мигового: для кого вони",
          p: [
            "На курорті п’ять трас загальною довжиною близько 3,3 км. Найдовша — червона, приблизно 1,3 км середньої складності. Поруч синя на 1,1 км, легка, і зелена на 600 м для тих, хто тільки стає на лижі. Ще є навчальний майданчик біля мультиліфта і окрема траса для тюбінгу.",
            "Схили тут пологі й передбачувані, без різких перепадів і трамплінів. Саме тому Мигове люблять родини з дітьми, новачки та компанії, які хочуть покататися кілька годин, а решту дня відпочивати. Якщо ви досвідчений лижник і шукаєте довгі складні спуски, чесно скажемо: тут вам може бути замало. А от для першого сезону чи легкого катання без стресу — те, що треба.",
          ],
        },
        {
          h: "Витяги, сезон і вечірнє катання",
          p: [
            "На схилах працюють два бугельні витяги — на 1100 і 600 метрів — та два мультиліфти по 150 метрів: на навчальному майданчику й на тюбінгу. Сезон зазвичай триває з грудня до березня, а коли природного снігу мало, допомагають снігогармати й ратраки.",
            "Окрема родзинка — вечірнє катання під освітленням, орієнтовно з 18:00 до 21:00. Вдень можна погуляти лісом чи провести час у басейні, а ввечері вийти на схил, коли людей ще менше.",
          ],
        },
        {
          h: "Скільки коштує катання",
          p: [
            "Торік скіпаси в Мигове коштували так: один підйом — 80–100 грн, абонемент на годину — 300–500 грн, на три години — 500–800 грн, денний — від 850 грн у будні до 1150 грн у святковий період, вечірнє катання — 500–600 грн. За магнітну картку беруть заставу 50 грн.",
            "Ціни на сезон 2026/27 курорт оголошує ближче до відкриття, тож перед поїздкою варто їх уточнити. Загальне правило не змінюється: у будні дешевше, ніж у вихідні, а найдорожче — з кінця грудня до середини січня.",
          ],
        },
        {
          h: "Лижна школа і прокат",
          p: [
            "У Мигове працює лижна школа з інструкторами, які вміють навчати і дорослих, і дітей. Для новачка кілька занять — найшвидший спосіб упевнено з’їхати з синьої траси вже за вихідні. Спорядження можна взяти в прокаті на місці, тож везти власні лижі не обов’язково.",
          ],
        },
        {
          h: "Якщо не катаєтесь на лижах",
          p: [
            "Зима в Мигове цікава й без лиж. На курорті є ковзанка, де одночасно можуть кататися до 100 людей, і траса для тюбінгу — найвеселіша розвага для дітей і компаній. Поруч — короткі марковані стежки лісом на годину-дві, а за кілька кілометрів, у Берегометі, Вижницький національний природний парк і центр відтворення зубрів.",
          ],
        },
        {
          h: "Лижі зранку — чан увечері",
          p: [
            "Найкращий зимовий день у горах закінчується теплом. У «Хуторі Солонець» гостей чекають два криті басейни, які працюють щодня з 08:00 до 22:00, джакузі та чан на дровах. Після катання м’язи відпочивають у гарячій воді, а над чаном у морозний вечір піднімається пара — заради цього варто приїхати.",
            "У котеджах — кухня, мангал і тераса з видом на гори, а завдяки автономному живленню світло й тепло не залежать від графіків відключень. Будинки розраховані на компанії від 8 до 14 гостей, тому їхати можна родиною, з друзями або двома сім’ями разом.",
          ],
        },
        {
          h: "Часті питання про Мигове взимку",
          p: [
            "Чи підходить Мигове для дітей? Так. Пологі зелена й синя траси, навчальний майданчик з мультиліфтом, інструктори в лижній школі, тюбінг і ковзанка роблять курорт одним із найзручніших у Карпатах для сімейного відпочинку з малечею.",
            "Коли в Мигове найкращий сніг? Найстабільніше — у січні та лютому. На початку сезону, у грудні, схили часто готують за допомогою снігогармат, тому перед поїздкою варто перевірити, які траси вже відкриті.",
            "Чи потрібна машина? Найзручніше їхати власним авто: до Мигового близько 63 км від Чернівців, а біля котеджів хутора є безкоштовний паркінг. Найближча залізнична станція — Берегомет, приблизно за 6 км від села.",
          ],
        },
        {
          h: "Як спланувати поїздку",
          p: [
            "Оптимально — дві-три ночі: першого дня заселення і вечір у SPA, другого — схил зранку і вечірнє катання, третього — прогулянка лісом і дорога додому. Заїзд у котеджі з 14:00, виїзд до 11:00.",
            "Новорічні та різдвяні дати бронюють найшвидше, тому якщо плануєте зиму в Мигове, краще визначитися з датами вже зараз. Залиште заявку — ми підкажемо, які котеджі вільні, і допоможемо обрати будинок для вашої компанії.",
          ],
        },
      ],
    },
    en: {
      title: "Myhove in winter: skiing, skating and a spa in the Bukovynian Carpathians",
      excerpt:
        "Gentle slopes for beginners and kids, evening skiing, tubing and an ice rink — then a warm pool and a wood-fired hot tub. Here is how to spend a winter weekend in Myhove.",
      body: [
        {
          p: [
            "Myhove is a small ski village in the Vyzhnytsia district of Chernivtsi region, about 63 km from Chernivtsi. There are no crowds or long lift queues like at the big resorts, yet it has everything a relaxed winter break needs: groomed slopes, evening skiing, an ice rink and forest all around. Hutir Solonets sits in a quiet part of the same village, so a day on the slopes can easily end in a warm pool.",
          ],
        },
        {
          h: "The slopes of Myhove: who they suit",
          p: [
            "The resort has five runs totalling about 3.3 km. The longest is a red run of roughly 1.3 km, of intermediate difficulty. Next to it are an easy blue run of 1.1 km and a 600 m green run for those just starting out. There is also a training area by the multi-lift and a separate tubing track.",
            "The slopes are gentle and predictable, with no steep drops or jumps. That is why Myhove is loved by families with children, beginners and groups who want a few hours of skiing and a relaxed rest of the day. If you are an experienced skier looking for long, demanding descents, we will be honest: it may not be enough for you. For a first season or easy, stress-free skiing, it is just right.",
          ],
        },
        {
          h: "Lifts, season and evening skiing",
          p: [
            "The slopes are served by two T-bar lifts of 1,100 and 600 metres and two 150-metre multi-lifts on the training area and the tubing track. The season usually runs from December to March, and when natural snow is scarce, snow cannons and groomers help out.",
            "A highlight is evening skiing under floodlights, roughly from 18:00 to 21:00. You can walk in the forest or spend time in the pool during the day and head to the slope in the evening, when it is even quieter.",
          ],
        },
        {
          h: "How much skiing costs",
          p: [
            "Last season, ski passes in Myhove cost: a single ride UAH 80–100, a one-hour pass UAH 300–500, a three-hour pass UAH 500–800, a day pass from UAH 850 on weekdays to UAH 1,150 during the holidays, and evening skiing UAH 500–600. There is a UAH 50 deposit for the magnetic card.",
            "The resort announces 2026/27 prices closer to opening, so check them before your trip. The general rule stays the same: weekdays are cheaper than weekends, and the most expensive period runs from late December to mid-January.",
          ],
        },
        {
          h: "Ski school and rental",
          p: [
            "Myhove has a ski school with instructors who teach both adults and children. For a beginner, a few lessons are the quickest way to ride a blue run confidently within a weekend. Equipment is available for rent on site, so you do not need to bring your own skis.",
          ],
        },
        {
          h: "If you don’t ski",
          p: [
            "Winter in Myhove is fun without skis too. The resort has an ice rink for up to 100 people at a time and a tubing track — the most fun option for kids and groups. Nearby are short marked forest trails of an hour or two, and a few kilometres away in Berehomet are the Vyzhnytskyi National Nature Park and a bison breeding centre.",
          ],
        },
        {
          h: "Skiing in the morning, a hot tub at night",
          p: [
            "The best winter day in the mountains ends in warmth. At Hutir Solonets guests have two indoor pools open daily from 08:00 to 22:00, a jacuzzi and a wood-fired hot tub. After skiing, your muscles rest in hot water, and on a frosty evening steam rises over the tub — reason enough to come.",
            "The cottages have a kitchen, a barbecue and a terrace with mountain views, and thanks to backup power, light and heat do not depend on outage schedules. The houses sleep groups of 8 to 14, so you can come as a family, with friends or as two families together.",
          ],
        },
        {
          h: "Frequently asked questions about Myhove in winter",
          p: [
            "Is Myhove good for children? Yes. Gentle green and blue runs, a training area with a multi-lift, ski school instructors, tubing and an ice rink make it one of the most convenient resorts in the Carpathians for a family holiday with little ones.",
            "When is the snow best in Myhove? Most reliably in January and February. Early in the season, in December, the slopes are often prepared with snow cannons, so check which runs are open before you travel.",
            "Do I need a car? Driving is the easiest option: Myhove is about 63 km from Chernivtsi, and there is free parking next to the cottages. The nearest railway station is Berehomet, about 6 km from the village.",
          ],
        },
        {
          h: "How to plan your trip",
          p: [
            "Two or three nights is ideal: check in and spend the evening in the spa on day one, ski in the morning and again in the evening on day two, then take a forest walk and head home on day three. Check-in is from 14:00, check-out until 11:00.",
            "New Year and Christmas dates are booked first, so if you are planning a winter in Myhove, it is best to settle on dates now. Send us a request — we will tell you which cottages are free and help you choose the right house for your group.",
          ],
        },
      ],
    },
  },
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
