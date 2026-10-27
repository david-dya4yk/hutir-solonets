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
    slug: "new-year-carpathians",
    date: "2026-10-28",
    cover: "/assets/hero.jpg",
    uk: {
      title: "Новий рік у Карпатах 2027: як обрати котедж для компанії",
      excerpt:
        "Свій будинок для 8–14 гостей, басейни, чан на дровах і лижі поруч. Розповідаємо, як зустріти Новий рік у Буковинських Карпатах і коли бронювати.",
      body: [
        {
          p: [
            "Новий рік у Карпатах — це сніг за вікном, ялинка у вітальні, гаряча вода в чані під зорями і жодного поспіху. Але щоб усе вдалося, котедж на свята варто шукати заздалегідь: найкращі будинки на 31 грудня бронюють ще восени. Розповідаємо, на що звернути увагу і чому Мигове в Буковинських Карпатах — добрий вибір для новорічної компанії.",
          ],
        },
        {
          h: "Чому котедж, а не готель",
          p: [
            "Новий рік — свято для своїх. В окремому котеджі ніхто не заважає сусідам і ніхто не заважає вам: можна накрити великий стіл, засидітися до ранку, увімкнути свою музику і не підлаштовуватися під розклад ресторану. Кухня, обідній стіл на всю компанію, мангал і тераса з видом на гори — усе вже є в будинку.",
            "У «Хуторі Солонець» котедж орендується повністю, а постільна білизна, рушники й паркінг уже входять у вартість. Будинки розраховані на 8–14 гостей, тож можна їхати великою родиною, кількома сім’ями або компанією друзів.",
          ],
        },
        {
          h: "Як обрати котедж під свою компанію",
          p: [
            "Почніть із кількості гостей: на хуторі є будинки на 8, 10, 12 і 14 людей. Якщо їдете з дітьми, зручніше обрати котедж біля басейнів. Якщо хочеться тиші — будинок на краю лісу. Для великої компанії підійдуть котеджі з п’ятьма спальнями і столом на 12 гостей.",
            "Детальніше про кожен будинок ми розповіли в статті «Як обрати котедж на хуторі». А якщо сумніваєтеся, просто залиште заявку з датами — підкажемо, що вільне.",
          ],
        },
        {
          h: "Що робити в новорічні дні",
          p: [
            "Перший день року найкраще почати повільно: сніданок, басейн, прогулянка засніженим лісом. Криті басейни працюють щодня з 08:00 до 22:00, а ввечері можна розтопити чан на дровах — мабуть, найатмосферніший спосіб зустріти новий рік у горах.",
            "Хто хоче активності — у селі працює гірськолижний курорт Мигове з трасами для новачків і дітей, вечірнім катанням, тюбінгом і ковзанкою. Про ціни та траси ми писали окремо в статті «Мигове взимку».",
          ],
        },
        {
          h: "Світло й тепло без сюрпризів",
          p: [
            "Важливе питання для зимових свят — електрика. Котеджі хутора мають автономне живлення, тож ялинка світиться, а в будинку тепло незалежно від графіків відключень.",
          ],
        },
        {
          h: "Коли бронювати і що врахувати",
          p: [
            "Новорічні та різдвяні дати — найпопулярніші за весь рік, тому радимо визначитися з датами вже в листопаді. На святкові дати діють окремі умови бронювання та скасування, тож обов’язково уточніть їх під час заявки.",
            "Бронювання підтверджується передоплатою. Друзі, які приїдуть лише на святкову вечерю без ночівлі, можуть приєднатися за окрему плату — у вартість входить користування басейнами та рушники.",
          ],
        },
        {
          h: "Як забронювати",
          p: [
            "Залиште заявку на сайті, напишіть у месенджер або зателефонуйте. Вкажіть дати, кількість гостей і побажання — ми самі підберемо котедж і розповімо про умови на новорічні дні.",
          ],
        },
      ],
    },
    en: {
      title: "New Year in the Carpathians 2027: how to choose a cottage for your group",
      excerpt:
        "A house of your own for 8–14 guests, pools, a wood-fired hot tub and skiing nearby. Here is how to celebrate New Year in the Bukovynian Carpathians and when to book.",
      body: [
        {
          p: [
            "New Year in the Carpathians means snow outside the window, a tree in the living room, hot water in a wood-fired tub under the stars and no rush at all. To get it right, start looking early: the best houses for 31 December are booked in autumn. Here is what to look for and why Myhove in the Bukovynian Carpathians is a good choice for a New Year group.",
          ],
        },
        {
          h: "Why a cottage, not a hotel",
          p: [
            "New Year is a celebration for your own people. In a private cottage you don’t disturb neighbours and nobody disturbs you: set a big table, stay up until morning, play your own music and forget about a restaurant’s schedule. A kitchen, a dining table for the whole group, a barbecue and a terrace with mountain views are all in the house.",
            "At Hutir Solonets you rent the whole cottage, and bed linen, towels and parking are already included. The houses sleep 8 to 14 guests, so you can come as a big family, several families or a group of friends.",
          ],
        },
        {
          h: "How to choose a cottage for your group",
          p: [
            "Start with the number of guests: there are houses for 8, 10, 12 and 14 people. With children, a cottage near the pools is most convenient. If you want silence, choose a house at the edge of the forest. For a large group, the cottages with five bedrooms and a table for 12 are a good fit.",
            "We describe each house in our article “How to choose a cottage at the farmstead”. If you are unsure, just send a request with your dates and we will tell you what is available.",
          ],
        },
        {
          h: "What to do over the holidays",
          p: [
            "The first day of the year is best started slowly: breakfast, the pool, a walk in the snowy forest. The indoor pools are open daily from 08:00 to 22:00, and in the evening you can heat the wood-fired hot tub — perhaps the most atmospheric way to see in the new year in the mountains.",
            "For something more active, the village has the Myhove ski resort with runs for beginners and children, evening skiing, tubing and an ice rink. We covered runs and prices in our article “Myhove in winter”.",
          ],
        },
        {
          h: "Light and heat with no surprises",
          p: [
            "Electricity matters during the winter holidays. The cottages have backup power, so the tree stays lit and the house stays warm whatever the outage schedule.",
          ],
        },
        {
          h: "When to book and what to keep in mind",
          p: [
            "New Year and Christmas dates are the most popular of the year, so we recommend settling on dates in November. Separate booking and cancellation terms apply to holiday dates, so be sure to ask about them when you send a request.",
            "A booking is confirmed by prepayment. Friends who join only for the festive dinner without staying overnight can come for an extra fee, which includes use of the pools and towels.",
          ],
        },
        {
          h: "How to book",
          p: [
            "Send a request on the website, message us or call. Tell us your dates, the number of guests and any wishes — we will find a cottage for you and explain the terms for the New Year period.",
          ],
        },
      ],
    },
  },
  {
    slug: "malanka-bukovyna",
    date: "2026-10-28",
    cover: "/assets/home-offer.jpg",
    uk: {
      title: "Різдво та Маланка на Буковині: де побачити свято і що варто знати",
      excerpt:
        "Маланка — одне з найяскравіших зимових свят України, і відбувається воно зовсім поруч із Мигове. Розповідаємо, що це, коли і де його побачити.",
      body: [
        {
          p: [
            "Зимові свята на Буковині — це не лише ялинка і застілля. У ніч з 13 на 14 січня села та містечка краю перетворюються на вуличний театр: ряджені ходять від хати до хати, співають, танцюють і жартують із господарями. Це Маланка, яку в 2022 році внесли до Національного переліку нематеріальної культурної спадщини України.",
          ],
        },
        {
          h: "Що таке Маланка",
          p: [
            "Маланкування — давній новорічний обряд із щедрівками, танцями і яскравими костюмами. Традиційно в ньому беруть участь чоловіки й хлопці, які збираються в гурти і разом обходять двори, вітаючи господарів із Новим роком і бажаючи здоров’я та достатку.",
            "Серед персонажів — дід і баба, ведмеді, пан і пані, роми, лікарі, поліцейські та інші герої, кожен зі своєю роллю і жартами. Костюми готують тижнями, а ведмежі шуби з соломи чи хутра — окрема гордість кожного гурту.",
          ],
        },
        {
          h: "Де побачити Маланку поруч із Мигове",
          p: [
            "Найвідоміші місця — Красноїльськ на кордоні з Румунією та місто Вашківці. Традиція також жива в селах Вижницького, Чернівецького та Дністровського районів, тож, зупинившись у Мигове, ви опиняєтеся в самому серці маланкового краю.",
            "У Вашківцях маланкувати починають увечері 13 січня, а 14 січня гурти ходять своїми кутами. Після центрального дійства учасники часто влаштовують «купанку» біля водойми і бризкають водою на глядачів — будьте готові.",
          ],
        },
        {
          h: "Маланка у воєнний час",
          p: [
            "Після початку повномасштабного вторгнення масові святкування обмежували, і кілька років гурти ходили лише своїми кутами. У січні 2025 року у Вашківцях центральне дійство вперше за цей час знову провели в центрі міста. Формат свята щороку може змінюватися, тому перед поїздкою варто перевірити оголошення місцевої громади.",
          ],
        },
        {
          h: "Різдво в Карпатах",
          p: [
            "Від 2023 року в Україні Різдво відзначають 25 грудня. Для зимової поїздки це зручно: можна приїхати на Різдво, залишитися на Новий рік і, якщо дозволяє відпустка, дочекатися Маланки в середині січня.",
            "Різдвяні дні в горах найкраще проводити неспішно: святкова вечеря у своєму котеджі, прогулянка засніженим лісом, басейн і чан на дровах увечері.",
          ],
        },
        {
          h: "Як спланувати поїздку на Маланку",
          p: [
            "Найкраще приїхати 12 або 13 січня і залишитися щонайменше на дві ночі: одного вечора поїхати на Маланку, а наступний день присвятити відпочинку на хуторі. Вдягайтеся тепло і візьміть зручне взуття — свято відбувається просто неба, а ходити доводиться багато.",
            "Січневі дати після свят зазвичай спокійніші за новорічні, і знайти вільний котедж простіше. Залиште заявку — ми підкажемо, які будинки вільні в середині січня.",
          ],
        },
      ],
    },
    en: {
      title: "Christmas and Malanka in Bukovyna: where to see the festival and what to know",
      excerpt:
        "Malanka is one of Ukraine’s most colourful winter festivals, and it happens right next to Myhove. Here is what it is, when it takes place and where to see it.",
      body: [
        {
          p: [
            "Winter holidays in Bukovyna are not only about the tree and the feast. On the night of 13 to 14 January, towns and villages across the region turn into street theatre: costumed groups go from house to house, singing, dancing and joking with the hosts. This is Malanka, added in 2022 to Ukraine’s National List of Intangible Cultural Heritage.",
          ],
        },
        {
          h: "What Malanka is",
          p: [
            "Malanka is an ancient New Year ritual with carols, dances and bright costumes. Traditionally men and boys take part: they form groups and go from yard to yard, greeting the hosts with the New Year and wishing them health and prosperity.",
            "The characters include an old man and an old woman, bears, a lord and a lady, Roma, doctors, police officers and others, each with their own role and jokes. Costumes take weeks to make, and the bear suits of straw or fur are every group’s pride.",
          ],
        },
        {
          h: "Where to see Malanka near Myhove",
          p: [
            "The best-known places are Krasnoilsk on the Romanian border and the town of Vashkivtsi. The tradition is also alive in villages of the Vyzhnytsia, Chernivtsi and Dnistrovskyi districts, so staying in Myhove puts you right in the heart of Malanka country.",
            "In Vashkivtsi the celebration starts on the evening of 13 January, and on 14 January the groups go around their own neighbourhoods. After the main performance participants often head to the water for a “bathing” and splash the audience — be prepared.",
          ],
        },
        {
          h: "Malanka in wartime",
          p: [
            "After the full-scale invasion began, mass celebrations were restricted, and for several years groups went only around their own neighbourhoods. In January 2025, Vashkivtsi held the main performance in the town centre for the first time since then. The format can change from year to year, so check local community announcements before you travel.",
          ],
        },
        {
          h: "Christmas in the Carpathians",
          p: [
            "Since 2023 Ukraine has celebrated Christmas on 25 December. That makes a winter trip easy to plan: come for Christmas, stay for New Year and, if your holiday allows, wait for Malanka in mid-January.",
            "Christmas days in the mountains are best spent slowly: a festive dinner in your own cottage, a walk in the snowy forest, the pool and a wood-fired hot tub in the evening.",
          ],
        },
        {
          h: "How to plan a trip for Malanka",
          p: [
            "Arrive on 12 or 13 January and stay at least two nights: spend one evening at Malanka and the next day relaxing at the farmstead. Dress warmly and wear comfortable shoes — the festival takes place outdoors and involves a lot of walking.",
            "Mid-January dates are usually calmer than New Year, and finding a free cottage is easier. Send us a request and we will tell you which houses are available.",
          ],
        },
      ],
    },
  },
  {
    slug: "corporate-carpathians",
    date: "2026-10-28",
    cover: "/assets/home-territory.jpg",
    uk: {
      title: "Корпоратив у Карпатах: як організувати виїзд команди в Мигове",
      excerpt:
        "Сім котеджів на одній території, басейни, чан і ліс довкола. Розповідаємо, як провести корпоратив або тімбілдинг у Буковинських Карпатах для команди від 10 до 70 людей.",
      body: [
        {
          p: [
            "Найкращий корпоратив — той, після якого команда повертається відпочилою, а не втомленою. Виїзд у гори дає саме це: зміну обстановки, спільний час без офісного поспіху і враження, про які говорять ще місяцями. Розповідаємо, як організувати корпоратив або тімбілдинг у Мигове.",
          ],
        },
        {
          h: "Чому котеджі, а не готель",
          p: [
            "Котеджі дають команді і спільний простір, і можливість відпочити окремо. На території «Хутора Солонець» сім будинків на 8–14 гостей кожен, тож можна забронювати один котедж для невеликого відділу або кілька будинків поруч для всієї компанії. Разом котеджі вміщують до 72 гостей.",
            "У кожному будинку кухня, обідній стіл, мангал і тераса. Вечеря всією командою, гра в настільні ігри чи розмови біля мангалу проходять у затишній атмосфері без чужих людей довкола.",
          ],
        },
        {
          h: "Що робити команді",
          p: [
            "Взимку — гірськолижний курорт Мигове в тому ж селі: траси для новачків, лижна школа, тюбінг і ковзанка. Навіть ті, хто ніколи не стояв на лижах, за кілька годин з інструктором отримають море емоцій.",
            "У теплу пору року — короткі маршрути лісом на годину-дві, Вижницький національний парк і центр зубрів у Берегометі. А цілий рік — SPA-зона хутора: два криті басейни, відкритий басейн, джакузі та чан на дровах. Спільне вечірнє парення в чані часто стає найтеплішим спогадом виїзду.",
          ],
        },
        {
          h: "Робота теж можлива",
          p: [
            "Якщо в програмі є стратегічна сесія чи планування, велика вітальня котеджу легко перетворюється на робочий простір. Автономне живлення означає, що ноутбуки, світло й тепло не залежать від графіків відключень.",
          ],
        },
        {
          h: "Як спланувати корпоратив",
          p: [
            "Оптимальний формат — дві ночі. Перший день: заїзд після 14:00, заселення, вечеря і SPA. Другий день: активність зранку — лижі чи похід, після обіду робоча сесія або вільний час, увечері спільне свято. Третій день: сніданок і виїзд до 11:00.",
            "Колеги, які приїдуть лише на вечірню частину без ночівлі, можуть приєднатися за окрему плату, у яку входить користування басейнами та рушники.",
          ],
        },
        {
          h: "Новорічний корпоратив",
          p: [
            "Грудень — найпопулярніший місяць для корпоративів, тому дати в другій половині місяця розбирають першими. Якщо плануєте новорічний виїзд команди, бронюйте вже зараз. На святкові дати діють окремі умови, які ми розповімо під час заявки.",
          ],
        },
        {
          h: "Як забронювати",
          p: [
            "Напишіть нам кількість учасників, бажані дати й формат — відпочинок, тімбілдинг чи робоча сесія. Ми підберемо котеджі поруч один з одним і розповімо про умови для групи.",
          ],
        },
      ],
    },
    en: {
      title: "A corporate retreat in the Carpathians: how to plan a team trip to Myhove",
      excerpt:
        "Seven cottages on one site, pools, a wood-fired hot tub and forest all around. Here is how to run a corporate party or team-building trip in the Bukovynian Carpathians for 10 to 70 people.",
      body: [
        {
          p: [
            "The best corporate event is the one your team comes back from rested, not exhausted. A trip to the mountains gives exactly that: a change of scene, time together away from office pressure and memories people talk about for months. Here is how to organise a corporate party or team-building trip in Myhove.",
          ],
        },
        {
          h: "Why cottages, not a hotel",
          p: [
            "Cottages give a team both shared space and room to rest apart. Hutir Solonets has seven houses for 8 to 14 guests each, so you can book one cottage for a small department or several neighbouring houses for the whole company. Together the cottages sleep up to 72 guests.",
            "Every house has a kitchen, a dining table, a barbecue and a terrace. A team dinner, board games or conversations by the grill happen in a cosy setting with no strangers around.",
          ],
        },
        {
          h: "What the team can do",
          p: [
            "In winter, the Myhove ski resort is in the same village: beginner runs, a ski school, tubing and an ice rink. Even those who have never skied will have a great time after a few hours with an instructor.",
            "In the warmer months there are short forest trails of an hour or two, the Vyzhnytskyi National Park and the bison centre in Berehomet. All year round there is the farmstead’s spa area: two indoor pools, an outdoor pool, a jacuzzi and a wood-fired hot tub. An evening together in the hot tub often becomes the warmest memory of the trip.",
          ],
        },
        {
          h: "Work is possible too",
          p: [
            "If the programme includes a strategy session or planning, a cottage’s large living room easily becomes a workspace. Backup power means laptops, light and heat do not depend on outage schedules.",
          ],
        },
        {
          h: "How to plan the trip",
          p: [
            "Two nights is the ideal format. Day one: check in after 14:00, settle in, dinner and spa. Day two: an activity in the morning — skiing or a hike — then a work session or free time, and a celebration in the evening. Day three: breakfast and check-out by 11:00.",
            "Colleagues who come only for the evening without staying overnight can join for an extra fee, which includes use of the pools and towels.",
          ],
        },
        {
          h: "A New Year corporate party",
          p: [
            "December is the most popular month for corporate events, so dates in the second half of the month go first. If you are planning a New Year team trip, book now. Separate terms apply to holiday dates, and we will explain them when you send a request.",
          ],
        },
        {
          h: "How to book",
          p: [
            "Tell us the number of participants, your preferred dates and the format — rest, team building or a work session. We will find cottages next to each other and explain the group terms.",
          ],
        },
      ],
    },
  },
  {
    slug: "myhove-guide",
    date: "2026-10-28",
    cover: "/assets/cottage-4-terrace-view.jpg",
    uk: {
      title: "Відпочинок у Мигове: що робити в будь-яку пору року",
      excerpt:
        "Лижі й ковзанка взимку, гриби й ліс восени, маршрути й басейн улітку. Повний гід по Мигове — гірському селу в Буковинських Карпатах.",
      body: [
        {
          p: [
            "Мигове — село у Вижницькому районі Чернівецької області, яке часто називають ще Мигово. Його знають насамперед як гірськолижний курорт, але насправді сюди варто їхати цілий рік: Буковинські Карпати спокійніші за туристичні центри, ліс починається просто за порогом, а до Чернівців — лише близько 63 км.",
          ],
        },
        {
          h: "Взимку: лижі, ковзанка, тюбінг",
          p: [
            "Із грудня до березня в селі працює гірськолижний курорт: п’ять трас загальною довжиною близько 3,3 км, вечірнє катання, лижна школа, траса для тюбінгу та ковзанка, де одночасно можуть кататися до 100 людей. Схили пологі, тому Мигове особливо зручне для дітей і новачків. Детальніше — у нашій статті «Мигове взимку».",
          ],
        },
        {
          h: "Навесні: тиша і перша зелень",
          p: [
            "Весна — найспокійніший сезон. Ліс прокидається, на схилах з’являється перша зелень, а людей на стежках майже немає. Це найкращий час, щоб просто відпочити: прогулянки, чан на дровах увечері, довгі сніданки на терасі з видом на гори.",
          ],
        },
        {
          h: "Улітку: маршрути, водоспади і відкритий басейн",
          p: [
            "Біля села є три короткі марковані стежки на годину-дві: «Стіжок», «Слідами графа Василька» та «До вартових Недеї». За кілька кілометрів, у Берегометі, — Вижницький національний природний парк і центр відтворення зубрів. Близько 16 км до водоспаду Сіручок, а трохи далі — Буковинські водоспади в Розтоках.",
            "Після походу найкраще охолонути в басейні. На хуторі влітку працює відкритий басейн із шезлонгами вздовж дерев’яної тераси.",
          ],
        },
        {
          h: "Восени: гриби і золотий ліс",
          p: [
            "Осінь у Мигове — пора грибників. Із серпня до жовтня в буковинських лісах збирають білі, опеньки, лисички й рижики. А золоті буки на схилах і ранкові тумани над долиною — найкрасивіше, що можна побачити в Карпатах у цей час.",
          ],
        },
        {
          h: "Цілий рік: SPA посеред лісу",
          p: [
            "Що б ви не планували, вечір найкраще завершити в теплі. На «Хуторі Солонець» є два криті басейни, які працюють щодня з 08:00 до 22:00, відкритий басейн, джакузі та чан на дровах. А в котеджах — кухня, мангал і тераса, тож можна відпочивати своєю компанією, нікуди не поспішаючи.",
          ],
        },
        {
          h: "Де зупинитися в Мигове",
          p: [
            "«Хутір Солонець» розташований у тихій частині села, в урочищі, яке здавна називають Солонцем. Сім котеджів на 8–14 гостей, автономне живлення, безкоштовний паркінг біля кожного будинку і pet-friendly умови для невеликих улюбленців. Залиште заявку — підберемо котедж і дати під вашу компанію.",
          ],
        },
      ],
    },
    en: {
      title: "A holiday in Myhove: what to do in every season",
      excerpt:
        "Skiing and skating in winter, mushrooms and forest in autumn, trails and a pool in summer. A complete guide to Myhove, a mountain village in the Bukovynian Carpathians.",
      body: [
        {
          p: [
            "Myhove, sometimes spelled Mygovo, is a village in the Vyzhnytsia district of Chernivtsi region. It is best known as a ski resort, but it is worth visiting all year round: the Bukovynian Carpathians are calmer than the big tourist hubs, the forest starts right at the door, and Chernivtsi is only about 63 km away.",
          ],
        },
        {
          h: "Winter: skiing, skating, tubing",
          p: [
            "From December to March the village has a working ski resort: five runs totalling about 3.3 km, evening skiing, a ski school, a tubing track and an ice rink for up to 100 people at a time. The slopes are gentle, which makes Myhove especially good for children and beginners. More in our article “Myhove in winter”.",
          ],
        },
        {
          h: "Spring: quiet and first green",
          p: [
            "Spring is the calmest season. The forest wakes up, the slopes turn green and the trails are almost empty. It is the best time simply to rest: walks, a wood-fired hot tub in the evening, long breakfasts on a terrace with mountain views.",
          ],
        },
        {
          h: "Summer: trails, waterfalls and an outdoor pool",
          p: [
            "Near the village there are three short marked trails of an hour or two: Stizhok, In the Footsteps of Count Wassilko and To the Guardians of Nedeia. A few kilometres away in Berehomet are the Vyzhnytskyi National Nature Park and a bison breeding centre. The Siruchok waterfall is about 16 km away, and a little further are the Bukovynian waterfalls in Roztoky.",
            "After a hike, cool off in the pool. In summer the farmstead’s outdoor pool is open, with loungers along a wooden deck.",
          ],
        },
        {
          h: "Autumn: mushrooms and a golden forest",
          p: [
            "Autumn in Myhove is mushroom season. From August to October people pick porcini, honey fungus, chanterelles and saffron milk caps in the Bukovynian forests. Golden beeches on the slopes and morning mist over the valley are the most beautiful sights of the Carpathian autumn.",
          ],
        },
        {
          h: "All year: a spa in the forest",
          p: [
            "Whatever you plan, the evening is best ended in warmth. Hutir Solonets has two indoor pools open daily from 08:00 to 22:00, an outdoor pool, a jacuzzi and a wood-fired hot tub. The cottages have a kitchen, a barbecue and a terrace, so you can relax with your own group without hurrying anywhere.",
          ],
        },
        {
          h: "Where to stay in Myhove",
          p: [
            "Hutir Solonets is in a quiet part of the village, in an area long known as Solonets. Seven cottages for 8 to 14 guests, backup power, free parking by every house and pet-friendly terms for small pets. Send us a request and we will find a cottage and dates for your group.",
          ],
        },
      ],
    },
  },
  {
    slug: "myhove-or-bukovel",
    date: "2026-10-28",
    cover: "/assets/cottage-7-exterior.jpg",
    uk: {
      title: "Мигове чи Буковель: де краще відпочити в Карпатах",
      excerpt:
        "Великий курорт із десятками трас чи спокійне гірське село з SPA і лісом довкола? Чесно порівнюємо, кому підійде Буковель, а кому — Мигове.",
      body: [
        {
          p: [
            "Коли мова заходить про зимові Карпати, більшість одразу думає про Буковель. Це справді найбільший і найвідоміший курорт країни. Але він підходить не всім, і для багатьох компаній спокійніше гірське село виявляється кращим вибором. Порівнюємо чесно — без реклами одного проти іншого.",
          ],
        },
        {
          h: "Катання: масштаб проти спокою",
          p: [
            "Якщо ви досвідчений лижник і хочете щодня нові складні траси, Буковель поза конкуренцією: там значно більше спусків, витягів і варіантів для катання. Мигове значно менший — п’ять трас загальною довжиною близько 3,3 км, пологі схили, траси для новачків і дітей.",
            "Зате в Мигове немає довгих черг на витягах і натовпів на схилі. Для сімей із дітьми, новачків і тих, хто катається кілька годин на день, а решту часу відпочиває, це часто важливіше, ніж кількість кілометрів трас.",
          ],
        },
        {
          h: "Атмосфера",
          p: [
            "Буковель — це курортне містечко з ресторанами, клубами й насиченим вечірнім життям. Мигове — справжнє буковинське село: ліс, тиша, сніг, який ніхто не встиг витоптати, і місцеві традиції. Якщо хочеться тусовки — обирайте Буковель. Якщо хочеться видихнути — Мигове.",
          ],
        },
        {
          h: "Ціни",
          p: [
            "У невеликих курортах скіпаси, як правило, дешевші, ніж на найпопулярніших курортах країни. У Мигове торік денний скіпас коштував від 850 грн у будні. Ціни на житло залежать від сезону, але оренда цілого котеджу на велику компанію часто виходить вигідніше, ніж кілька окремих номерів у готелі.",
          ],
        },
        {
          h: "Дорога",
          p: [
            "Для жителів Чернівців, Буковини та прилеглих областей Мигове значно ближче: від Чернівців до села близько 63 км. Тим, хто їде з Києва чи центру України, теж зручно добиратися через Чернівці.",
          ],
        },
        {
          h: "Кому що підійде",
          p: [
            "Буковель — для досвідчених лижників, любителів активного вечірнього життя і тих, хто хоче максимум інфраструктури в одному місці. Мигове — для сімей із дітьми, новачків, компаній друзів, корпоративів і всіх, хто їде в гори по тишу, ліс і відпочинок без натовпу.",
          ],
        },
        {
          h: "Відпочинок у Мигове з SPA",
          p: [
            "«Хутір Солонець» — сім котеджів на 8–14 гостей у тихій частині Мигового з двома критими басейнами, відкритим басейном, джакузі та чаном на дровах. Покаталися на лижах зранку — увечері відпочиваєте в теплій воді серед лісу. Залиште заявку, і ми підберемо котедж під вашу компанію.",
          ],
        },
      ],
    },
    en: {
      title: "Myhove or Bukovel: where to holiday in the Carpathians",
      excerpt:
        "A large resort with dozens of runs or a quiet mountain village with a spa and forest all around? An honest comparison of who Bukovel suits and who Myhove suits.",
      body: [
        {
          p: [
            "When people think of the winter Carpathians, most think of Bukovel straight away. It really is the country’s largest and best-known resort. But it does not suit everyone, and for many groups a quieter mountain village turns out to be the better choice. Here is an honest comparison — no ads for one against the other.",
          ],
        },
        {
          h: "Skiing: scale versus calm",
          p: [
            "If you are an experienced skier who wants new, demanding runs every day, Bukovel has no competition: it has far more slopes, lifts and options. Myhove is much smaller — five runs totalling about 3.3 km, gentle slopes and runs for beginners and children.",
            "On the other hand, Myhove has no long lift queues and no crowded slopes. For families with children, beginners and people who ski a few hours a day and rest the rest of the time, this often matters more than kilometres of pistes.",
          ],
        },
        {
          h: "Atmosphere",
          p: [
            "Bukovel is a resort town with restaurants, clubs and a busy nightlife. Myhove is a real Bukovynian village: forest, silence, snow nobody has trampled yet and local traditions. If you want a party, choose Bukovel. If you want to breathe out, choose Myhove.",
          ],
        },
        {
          h: "Prices",
          p: [
            "At smaller resorts ski passes are usually cheaper than at the country’s most popular ones. In Myhove last season a day pass cost from UAH 850 on weekdays. Accommodation prices depend on the season, but renting a whole cottage for a large group often works out better than several separate hotel rooms.",
          ],
        },
        {
          h: "Getting there",
          p: [
            "For people from Chernivtsi, Bukovyna and nearby regions, Myhove is much closer: the village is about 63 km from Chernivtsi. Travellers from Kyiv or central Ukraine can also conveniently get there via Chernivtsi.",
          ],
        },
        {
          h: "Who suits which",
          p: [
            "Bukovel is for experienced skiers, nightlife lovers and anyone who wants maximum infrastructure in one place. Myhove is for families with children, beginners, groups of friends, corporate trips and everyone who comes to the mountains for silence, forest and rest without crowds.",
          ],
        },
        {
          h: "A spa holiday in Myhove",
          p: [
            "Hutir Solonets has seven cottages for 8 to 14 guests in a quiet part of Myhove, with two indoor pools, an outdoor pool, a jacuzzi and a wood-fired hot tub. Ski in the morning and rest in warm water in the forest in the evening. Send us a request and we will find a cottage for your group.",
          ],
        },
      ],
    },
  },
  {
    slug: "how-to-get-to-myhove",
    date: "2026-10-28",
    cover: "/assets/cottage-5-exterior.jpg",
    uk: {
      title: "Як дістатися до Мигового: з Чернівців, Києва, Львова та Івано-Франківська",
      excerpt:
        "Мигове — за 63 км від Чернівців. Розповідаємо, як доїхати до села автомобілем, потягом і автобусом, і що врахувати в дорозі взимку.",
      body: [
        {
          p: [
            "Мигове розташоване у Вижницькому районі Чернівецької області, приблизно за 63 км від Чернівців і за 26 км від Вижниці. Головний орієнтир для будь-якої поїздки — Чернівці: туди зручно діставатися з усієї України, а від міста до села близько години дороги автомобілем.",
          ],
        },
        {
          h: "Автомобілем — найзручніше",
          p: [
            "Власне авто дає найбільше свободи: можна взяти з собою все потрібне, а на місці доїхати до схилу чи водоспаду. Біля кожного котеджу «Хутора Солонець» є безкоштовне місце для паркування. Для навігатора вводьте «Мигове, вулиця Солоницька» — на сайті хутора є кнопка «Прокласти маршрут», яка відкриває точку в Google Maps.",
            "Орієнтовно від Києва до Чернівців — понад 500 км, від Львова — приблизно 270 км, від Івано-Франківська — близько 140 км. Точний час у дорозі залежить від маршруту та стану доріг, тож перевіряйте навігатор перед виїздом.",
          ],
        },
        {
          h: "Потягом до Чернівців",
          p: [
            "До Чернівців курсують потяги з Києва та інших великих міст, зокрема нічні — зручно виїхати ввечері і бути на місці зранку. Від вокзалу до Мигового можна доїхати таксі або автобусом у напрямку Вижниці чи Берегомета. Розклад і квитки варто перевірити заздалегідь, особливо на свята.",
            "Найближча до села залізнична станція — Берегомет, приблизно за 6 км.",
          ],
        },
        {
          h: "Автобусом",
          p: [
            "З автовокзалу Чернівців ходять маршрутки та автобуси в бік Вижниці й Берегомета. Це найбюджетніший варіант, але з багажем і лижами незручний, тому для зимової поїздки компанією краще авто або таксі.",
          ],
        },
        {
          h: "Дорога взимку",
          p: [
            "Узимку в горах дорогу може засипати снігом, тому зимова гума обов’язкова. Не завадять ланцюги, щітка для скла і повний бак. Плануйте приїзд засвітла, особливо якщо їдете вперше: гірські дороги ввечері вимагають більше уваги.",
          ],
        },
        {
          h: "Коли приїжджати",
          p: [
            "Заїзд у котеджі хутора — з 14:00, виїзд — до 11:00. Якщо приїжджаєте раніше чи хочете залишитися довше, напишіть нам: коли будинок вільний, домовимося про ранній заїзд або пізній виїзд.",
          ],
        },
        {
          h: "Потрібна допомога з маршрутом?",
          p: [
            "Зателефонуйте або напишіть нам у месенджер — підкажемо найкращу дорогу з вашого міста та розповімо, як знайти хутір на місці.",
          ],
        },
      ],
    },
    en: {
      title: "How to get to Myhove from Chernivtsi, Kyiv, Lviv and Ivano-Frankivsk",
      excerpt:
        "Myhove is 63 km from Chernivtsi. Here is how to reach the village by car, train and bus, and what to keep in mind on winter roads.",
      body: [
        {
          p: [
            "Myhove is in the Vyzhnytsia district of Chernivtsi region, about 63 km from Chernivtsi and 26 km from Vyzhnytsia. Chernivtsi is the key reference point for any trip: it is easy to reach from all over Ukraine, and from the city the village is about an hour away by car.",
          ],
        },
        {
          h: "By car — the most convenient",
          p: [
            "Your own car gives the most freedom: you can bring everything you need and drive to the slope or a waterfall once you are here. Every cottage at Hutir Solonets has a free parking space next to it. For navigation, enter “Myhove, Solonytska Street” — the farmstead’s website has a “Get directions” button that opens the location in Google Maps.",
            "Roughly, Kyiv to Chernivtsi is over 500 km, Lviv about 270 km and Ivano-Frankivsk about 140 km. Exact travel time depends on the route and road conditions, so check your navigator before you set off.",
          ],
        },
        {
          h: "By train to Chernivtsi",
          p: [
            "Trains run to Chernivtsi from Kyiv and other major cities, including overnight services — leave in the evening and arrive in the morning. From the station you can reach Myhove by taxi or by bus towards Vyzhnytsia or Berehomet. Check timetables and tickets in advance, especially for the holidays.",
            "The nearest railway station to the village is Berehomet, about 6 km away.",
          ],
        },
        {
          h: "By bus",
          p: [
            "Minibuses and buses run from Chernivtsi bus station towards Vyzhnytsia and Berehomet. It is the cheapest option but awkward with luggage and skis, so for a winter trip with a group a car or taxi is better.",
          ],
        },
        {
          h: "Winter roads",
          p: [
            "In winter mountain roads can be covered with snow, so winter tyres are a must. Chains, a snow brush and a full tank are a good idea. Plan to arrive in daylight, especially on your first visit: mountain roads need more attention after dark.",
          ],
        },
        {
          h: "When to arrive",
          p: [
            "Check-in at the cottages is from 14:00, check-out until 11:00. If you arrive earlier or want to stay longer, message us: when the house is free, we can arrange an early check-in or late check-out.",
          ],
        },
        {
          h: "Need help with the route?",
          p: [
            "Call us or message us — we will suggest the best route from your city and explain how to find the farmstead once you are in the village.",
          ],
        },
      ],
    },
  },
  {
    slug: "chan-guide",
    date: "2026-10-28",
    cover: "/assets/spa-chan-2.jpg",
    uk: {
      title: "Чан на дровах у Карпатах: що це і як правильно паритися",
      excerpt:
        "Гаряча вода просто неба, пара над лісом і сніг довкола. Розповідаємо, що таке чан, чим він приємний і як отримати від нього максимум без шкоди здоров’ю.",
      body: [
        {
          p: [
            "Чан — одна з найулюбленіших карпатських розваг, заради якої гості їдуть у гори навіть без лиж. Це велика металева купіль, під якою розпалюють вогонь, а вода нагрівається до приємної температури. Сидиш у гарячій воді просто неба, довкола ліс або сніг, над тобою зорі — і час ніби зупиняється.",
          ],
        },
        {
          h: "Що таке чан",
          p: [
            "Класичний чан — це широка ємність, найчастіше чавунна чи сталева, розрахована на кількох людей одночасно. Під нею розташована топка, де горять дрова, тож вода гріється поступово і довго тримає тепло. У воду часто додають трави, гілочки ялиці чи сушені квіти — від цього з’являється особливий аромат.",
          ],
        },
        {
          h: "Чим приємний чан",
          p: [
            "Гаряча вода розслабляє м’язи після прогулянки чи катання на лижах, а контраст із холодним повітрям бадьорить. Але головне — атмосфера. Взимку над водою піднімається пара, сніжинки тануть, не долітаючи до поверхні, а влітку можна лежати в теплій воді і дивитися на нічне небо. Це найкращий спосіб відпочити компанією чи вдвох.",
          ],
        },
        {
          h: "Як правильно паритися",
          p: [
            "Не засиджуйтеся надовго: оптимально 10–15 хвилин за раз, потім перерва, прохолодний напій і, за бажання, ще один захід. Пийте воду або трав’яний чай — у гарячій воді організм втрачає рідину швидше, ніж здається.",
            "Тримайте голову над водою і не пірнайте. Після чану одразу вдягніться тепло, особливо взимку. Не варто паритися на повний шлунок — зачекайте годину-дві після вечері.",
          ],
        },
        {
          h: "Кому варто бути обережними",
          p: [
            "Гаряча вода — навантаження на серце й судини. Якщо у вас підвищений тиск, серцеві захворювання, вагітність чи інші протипоказання, порадьтеся з лікарем перед тим, як паритися. Не поєднуйте чан з алкоголем: це різко підвищує навантаження на організм. Діти можуть купатися лише під наглядом дорослих і недовго.",
          ],
        },
        {
          h: "Коли найкраще в чані",
          p: [
            "Найатмосферніше — увечері, після заходу сонця, і в перший сніг. Взимку чан особливо приємний після дня на схилі: м’язи розслабляються, а холод на обличчі і тепло в тілі створюють неповторний контраст.",
          ],
        },
        {
          h: "Чан на «Хуторі Солонець»",
          p: [
            "На хуторі чан на дровах — частина SPA-зони разом із двома критими басейнами, відкритим басейном і джакузі. Усе розташоване за кілька кроків від котеджів, тож після чану ви за хвилину вже в теплому будинку. Побажання щодо чану можна вказати в коментарі до заявки на бронювання — ми розповімо, як усе влаштовано.",
          ],
        },
      ],
    },
    en: {
      title: "A wood-fired hot tub in the Carpathians: what it is and how to enjoy it",
      excerpt:
        "Hot water under the open sky, steam over the forest and snow all around. Here is what a Carpathian hot tub (chan) is, why people love it and how to enjoy it safely.",
      body: [
        {
          p: [
            "The chan, a wood-fired hot tub, is one of the Carpathians’ favourite pleasures — guests come to the mountains for it even without skis. It is a large metal tub with a fire lit beneath it that heats the water to a pleasant temperature. You sit in hot water under the open sky, with forest or snow around and stars above, and time seems to stop.",
          ],
        },
        {
          h: "What a chan is",
          p: [
            "A classic chan is a wide tub, usually cast iron or steel, big enough for several people at once. Beneath it is a firebox where wood burns, so the water heats gradually and holds its warmth for a long time. Herbs, fir twigs or dried flowers are often added to the water for a special aroma.",
          ],
        },
        {
          h: "Why people love it",
          p: [
            "Hot water relaxes muscles after a walk or a day of skiing, and the contrast with cold air is invigorating. But the main thing is the atmosphere. In winter steam rises from the water and snowflakes melt before they reach the surface; in summer you can lie in warm water and watch the night sky. It is the best way to unwind with friends or as a couple.",
          ],
        },
        {
          h: "How to enjoy it properly",
          p: [
            "Don’t stay in too long: 10 to 15 minutes at a time is ideal, then a break, a cool drink and, if you like, another round. Drink water or herbal tea — in hot water your body loses fluid faster than you think.",
            "Keep your head above the water and don’t dive. After the tub, dress warmly straight away, especially in winter. Avoid the tub on a full stomach — wait an hour or two after dinner.",
          ],
        },
        {
          h: "Who should be careful",
          p: [
            "Hot water puts a load on the heart and blood vessels. If you have high blood pressure, a heart condition, are pregnant or have other contraindications, talk to a doctor first. Don’t combine the tub with alcohol: it sharply increases the strain on the body. Children should bathe only briefly and under adult supervision.",
          ],
        },
        {
          h: "The best time for a chan",
          p: [
            "It is most atmospheric in the evening after sunset and at the first snow. In winter the tub is especially good after a day on the slopes: muscles relax, and cold air on your face with warmth in your body makes an unforgettable contrast.",
          ],
        },
        {
          h: "The chan at Hutir Solonets",
          p: [
            "At the farmstead the wood-fired hot tub is part of the spa area, together with two indoor pools, an outdoor pool and a jacuzzi. Everything is a few steps from the cottages, so a minute after the tub you are back in a warm house. You can mention your wishes about the tub in the comment to your booking request and we will explain how it all works.",
          ],
        },
      ],
    },
  },
  {
    slug: "carpathians-with-kids-winter",
    date: "2026-10-28",
    cover: "/assets/pool-indoor-2.jpg",
    uk: {
      title: "Карпати з дітьми взимку: чим зайнятися в Мигове",
      excerpt:
        "Пологі траси й лижна школа, тюбінг, ковзанка і теплі басейни. Розповідаємо, як спланувати зимовий відпочинок у Карпатах з дітьми, щоб сподобалося всім.",
      body: [
        {
          p: [
            "Зимова поїздка з дітьми в гори — це завжди трохи більше речей і трохи більше планування, але й вдвічі більше радості. Головне — обрати місце, де дітям є чим зайнятися, а батькам — де відпочити. Мигове в Буковинських Карпатах якраз таке: невеликий курорт без натовпів і все потрібне для сімейних канікул поруч.",
          ],
        },
        {
          h: "Перші лижі",
          p: [
            "Гірськолижний курорт Мигове чудово підходить для першого знайомства з лижами. Тут є зелена траса на 600 метрів для початківців, навчальний майданчик з мультиліфтом і лижна школа з інструкторами, які працюють і з дорослими, і з дітьми. Схили пологі й передбачувані, тож за дітей спокійніше.",
            "Порада: для малечі достатньо однієї-двох годин на схилі на день. Краще закінчити, поки дитині ще весело, ніж довести до втоми і сліз.",
          ],
        },
        {
          h: "Тюбінг і ковзанка",
          p: [
            "Якщо лижі поки не для вашої дитини, на курорті є окрема траса для тюбінгу — спуск на надувних «ватрушках», який подобається і дітям, і дорослим. А ще ковзанка, де одночасно можуть кататися до 100 людей. Ці розваги не потребують підготовки, тож підходять навіть найменшим під наглядом батьків.",
          ],
        },
        {
          h: "Прогулянки й природа",
          p: [
            "Біля села є короткі лісові стежки на годину, наприклад «Слідами графа Василька» з невеликим набором висоти. А в Берегометі, за кілька кілометрів, працює центр відтворення зубрів — шанс показати дітям цих великих тварин. Перед поїздкою уточніть години роботи.",
          ],
        },
        {
          h: "Басейни, коли холодно",
          p: [
            "Найкращий план на морозний чи сніжний день — басейн. На «Хуторі Солонець» два криті басейни працюють щодня з 08:00 до 22:00, а ввечері в них вмикається м’яка підсвітка, яку діти особливо люблять. Поки малеча плаває, дорослі можуть відпочити в джакузі.",
          ],
        },
        {
          h: "Що взяти з собою",
          p: [
            "Теплий одяг на кілька шарів, запасні рукавиці та шкарпетки, термоси, улюблені іграшки і настільні ігри на вечір. Для схилу — шолом і маску, а для басейну — купальник і шапочку. Не забудьте крем від сонця і вітру: у горах обличчя обвітрюється швидко.",
          ],
        },
        {
          h: "Де зупинитися",
          p: [
            "Із дітьми зручніше жити в окремому котеджі: свій простір, кухня, де можна приготувати звичну їжу, і ніхто не заважає денному сну. Котеджі хутора розраховані на 8–14 гостей, тож можна поїхати двома-трьома сім’ями. А котедж біля басейнів дозволяє відпускати старших дітей плавати буквально за кілька кроків. Залиште заявку, і ми підкажемо, який будинок зручніший для сім’ї.",
          ],
        },
      ],
    },
    en: {
      title: "The Carpathians with children in winter: what to do in Myhove",
      excerpt:
        "Gentle slopes and a ski school, tubing, an ice rink and warm pools. Here is how to plan a winter holiday in the Carpathians with children that everyone will enjoy.",
      body: [
        {
          p: [
            "A winter trip to the mountains with children always means a bit more luggage and a bit more planning, but twice the fun. The key is to choose a place where children have plenty to do and parents can rest. Myhove in the Bukovynian Carpathians is exactly that: a small resort without crowds and everything a family holiday needs nearby.",
          ],
        },
        {
          h: "First skis",
          p: [
            "The Myhove ski resort is great for a first try at skiing. There is a 600-metre green run for beginners, a training area with a multi-lift and a ski school whose instructors teach both adults and children. The slopes are gentle and predictable, so you can relax a little about the kids.",
            "Tip: an hour or two on the slope a day is enough for little ones. It is better to stop while your child is still having fun than to push on until tiredness and tears.",
          ],
        },
        {
          h: "Tubing and an ice rink",
          p: [
            "If skiing is not for your child yet, the resort has a separate tubing track — rides down on inflatable rings that children and adults both love. There is also an ice rink for up to 100 people at a time. These activities need no training, so even the youngest can join in under parents’ supervision.",
          ],
        },
        {
          h: "Walks and nature",
          p: [
            "Near the village there are short forest trails of about an hour, such as In the Footsteps of Count Wassilko with only a small climb. A few kilometres away in Berehomet there is a bison breeding centre — a chance to show children these big animals. Check opening hours before you go.",
          ],
        },
        {
          h: "Pools when it’s cold",
          p: [
            "The best plan for a frosty or snowy day is the pool. At Hutir Solonets two indoor pools are open daily from 08:00 to 22:00, and in the evening soft lighting comes on, which children especially love. While the kids swim, adults can relax in the jacuzzi.",
          ],
        },
        {
          h: "What to bring",
          p: [
            "Warm clothes in layers, spare gloves and socks, thermoses, favourite toys and board games for the evenings. For the slope — a helmet and goggles; for the pool — swimwear and a cap. Don’t forget sun and wind cream: faces get weather-beaten quickly in the mountains.",
          ],
        },
        {
          h: "Where to stay",
          p: [
            "With children a private cottage is more convenient: your own space, a kitchen to cook familiar food and nobody disturbing nap time. The farmstead’s cottages sleep 8 to 14 guests, so two or three families can travel together. A cottage near the pools lets older children go swimming just a few steps away. Send us a request and we will suggest the most family-friendly house.",
          ],
        },
      ],
    },
  },
  {
    slug: "hikes-near-myhove",
    date: "2026-10-28",
    cover: "/assets/home-faq-hammock.jpg",
    uk: {
      title: "Маршрути біля Мигового: короткі походи, нацпарк і водоспади",
      excerpt:
        "Три марковані стежки на годину-дві, Вижницький національний парк, зубри в Берегометі та водоспади Буковини. Обираємо прогулянки для відпочинку в Мигове.",
      body: [
        {
          p: [
            "Щоб відчути Карпати, не обов’язково йти в багатоденний похід із наметом. Довкола Мигового є маршрути, які можна пройти за годину-дві навіть без досвіду, а за пів години автомобілем — водоспади й вершини. Зібрали найкращі прогулянки для гостей хутора.",
          ],
        },
        {
          h: "Еко-стежка «Стіжок»",
          p: [
            "3,5 км і близько півтори години прогулянки. Набір висоти — близько 330 метрів, тож стежка дає трохи навантаження, але залишається доступною для більшості. Маршрут пролягає лісом поблизу Вижницького національного природного парку.",
          ],
        },
        {
          h: "«Слідами графа Василька»",
          p: [
            "Найлегший маршрут: 3,3 км, близько години ходу і лише 112 метрів набору висоти. Підходить для прогулянки з дітьми чи старшими родичами, а назва нагадує про історію краю, пов’язану з родом графів Васильків.",
          ],
        },
        {
          h: "«До вартових Недеї»",
          p: [
            "Найдовша з трьох стежок — 5,4 км, близько двох годин і понад 430 метрів набору висоти. Для тих, хто хоче відчути справжній гірський підйом і отримати нагороду у вигляді краєвидів.",
          ],
        },
        {
          h: "Вижницький національний парк і зубри",
          p: [
            "Вижницький національний природний парк створили в 1995 році, він займає понад 11 тисяч гектарів. Тут живуть близько 3000 видів рослин і тварин, 62 з них занесені до Червоної книги. Офіс парку розташований у Берегометі, за кілька кілометрів від Мигового, а поруч працює центр відтворення зубрів. Перед візитом уточніть години роботи — у вихідні центр може не приймати відвідувачів.",
          ],
        },
        {
          h: "Водоспади Буковини",
          p: [
            "Найближчий — водоспад Сіручок, приблизно за 16 км від села. Для довшої поїздки варто обрати Розтоки, де поруч розташовані водоспад Сич висотою близько 10 метрів, Середній Гук і каскад Буковинських (Смугарських) водоспадів. Найповноводніші вони навесні та після дощів, а взимку часто замерзають у красиві крижані скульптури.",
          ],
        },
        {
          h: "Вершини поблизу",
          p: [
            "Для досвідчених туристів — Магура (Шепіт) висотою 1313 метрів, приблизно за 23 км, і Лунгул, 1377 метрів, приблизно за 25 км. Це вже повноцінні походи на день, тож плануйте їх зранку і з урахуванням погоди.",
          ],
        },
        {
          h: "Поради для прогулянок",
          p: [
            "Вдягайтеся шарами і беріть дощовик — погода в горах змінюється швидко. Зручне взуття з протектором, вода, перекус і заряджений телефон обов’язкові. Перевіряйте, чи немає обмежень на відвідування лісу, і повідомляйте рідним, куди йдете.",
            "А після прогулянки на вас чекає SPA-зона «Хутора Солонець»: басейни, джакузі та чан на дровах — найкращий спосіб дати відпочинок ногам. Залиште заявку, і ми підкажемо, які маршрути найкращі саме в ваш сезон.",
          ],
        },
      ],
    },
    en: {
      title: "Trails near Myhove: short hikes, a national park and waterfalls",
      excerpt:
        "Three marked trails of an hour or two, the Vyzhnytskyi National Park, bison in Berehomet and the waterfalls of Bukovyna. Our pick of walks for a stay in Myhove.",
      body: [
        {
          p: [
            "You don’t need a multi-day hike with a tent to feel the Carpathians. Around Myhove there are trails you can walk in an hour or two even without experience, and within half an hour’s drive there are waterfalls and peaks. Here are the best walks for guests of the farmstead.",
          ],
        },
        {
          h: "Stizhok nature trail",
          p: [
            "3.5 km and about an hour and a half of walking. The climb is around 330 metres, so it gives you some exercise while staying accessible for most people. The route runs through the forest near the Vyzhnytskyi National Nature Park.",
          ],
        },
        {
          h: "In the Footsteps of Count Wassilko",
          p: [
            "The easiest route: 3.3 km, about an hour and only 112 metres of climbing. Good for a walk with children or older relatives, and its name recalls the region’s history linked to the Wassilko family of counts.",
          ],
        },
        {
          h: "To the Guardians of Nedeia",
          p: [
            "The longest of the three trails: 5.4 km, about two hours and more than 430 metres of climbing. For those who want a real mountain ascent rewarded with views.",
          ],
        },
        {
          h: "Vyzhnytskyi National Park and bison",
          p: [
            "The Vyzhnytskyi National Nature Park was created in 1995 and covers more than 11,000 hectares. It is home to about 3,000 species of plants and animals, 62 of them in Ukraine’s Red Book. The park office is in Berehomet, a few kilometres from Myhove, and a bison breeding centre operates nearby. Check opening hours before visiting — the centre may be closed at weekends.",
          ],
        },
        {
          h: "The waterfalls of Bukovyna",
          p: [
            "The nearest is the Siruchok waterfall, about 16 km from the village. For a longer trip, head to Roztoky, where the Sych waterfall, about 10 metres high, the Srednyi Huk waterfall and the cascade of the Bukovynian (Smugar) waterfalls are close together. They are fullest in spring and after rain, and in winter they often freeze into beautiful ice sculptures.",
          ],
        },
        {
          h: "Peaks nearby",
          p: [
            "For experienced hikers there is Mahura (Shepit), 1,313 metres, about 23 km away, and Lunhul, 1,377 metres, about 25 km away. These are full-day hikes, so start in the morning and keep an eye on the weather.",
          ],
        },
        {
          h: "Tips for your walks",
          p: [
            "Dress in layers and bring a raincoat — mountain weather changes quickly. Comfortable shoes with a good tread, water, a snack and a charged phone are essential. Check for any restrictions on visiting the forest and tell someone where you are going.",
            "After your walk, the Hutir Solonets spa is waiting: pools, a jacuzzi and a wood-fired hot tub — the best way to rest your legs. Send us a request and we will suggest the best trails for your season.",
          ],
        },
      ],
    },
  },
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
