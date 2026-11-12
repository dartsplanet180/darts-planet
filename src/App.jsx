import { useEffect, useMemo, useRef, useState } from "react";

/* ═════════ SITE SETTINGS – change these ═════════ */
const SITE_NAME = "ONEEIGHTY.GAMES";
const CONTACT_EMAIL = "dartsplanet180@gmail.com";

/* ═════════ 1. PLAYERS (used for autocomplete) ═════════
   Every PDC World Championship player. Just names – add new ones at the end. */
const PLAYERS = [
  "Dennis Priestley", "Jocky Wilson", "John Lowe", "Larry Butler", "Rod Harrington", "Sean Downs",
  "Jerry Umberger", "Peter Evison", "Gerald Verrier", "Bob Anderson", "Phil Taylor", "Jim Watkins",
  "Steve (US) Brown", "Kevin Spiolek", "Cliff Lazarenko", "Alan Warriner-Little",
  "Graeme Stoddart", "Tom Kirby", "Eric Bristow", "Kevin Burrows", "Dave Kelly", "Jamie Harvey",
  "Keith Deller", "Ritchie Gardner", "Shayne Burgess", "Dennis Smith", "Steve Raw",
  "Nigel Justice", "Gary Mawson", "Chris Mason", "Paul Lim", "John Ferrell", "Peter Manley",
  "Harry Robinson", "John Part", "Mick Manning", "Alex Roy", "Scott Cummings", "Dean Allsop",
  "Dan Lauby", "Reg Harding", "Braulio Roncero", "Colin Lloyd", "Dave Askew", "Richie Burnett",
  "Denis Ovens", "Les Fitton", "Gary Spedding", "Gayl King", "Roland Scholten", "Kevin Painter",
  "Ronnie Baxter", "Andy Jenkins", "Steve Beaton", "Paul Williams", "Matt Chapman", "David Platt",
  "Mark Robinson", "Mark Holden", "Dave Smith", "Simon Whitlock", "Arjan Moen", "Ray Carver",
  "Wayne Mardle", "Al Hedman", "Lee Palfreyman", "Ritchie Buckle", "Jan van der Rassel",
  "Erik Clarys", "Toru Sano", "Wayne Atwood", "Colin McGarry", "Rory Orvis", "Robbie Widdows",
  "Henry O’Neill", "Alex Mackay", "Barry Jouannet Jr", "Steve Maish", "Tony Payne", "Steve Smith",
  "Norman Madhoo", "Mark Walsh", "Lionel Sams", "Mark Dudbridge", "Simon Whatley", "Jason Clark",
  "Yasuhiko Matsunaga", "Tang Jun", "Gerry Convery", "Anthony Forde", "John Verwey", "Darin Young",
  "Josephus Schenk", "James Wade", "Alan Reynolds", "Mark Landers", "Wayne Jones", "Andy Hamilton",
  "Mark Thomson", "Alan Caves", "Wes Newton", "Terry Jenkins", "Steve Alker", "Adrian Lewis",
  "Dave Honey", "Chengan Liu", "Darren Webster", "Erwin Extercatte", "Warren Parry", "Mark Salmon",
  "John Kuczynski", "Patrick Bulen", "Dave Whitcombe", "Gary Welding", "Geoff Wylie",
  "John MaGowan", "Jimmy Mann", "Ken Woods", "Matt Clark", "Brian Roach", "Tomas Seyler",
  "Winston Cadogan", "Andy Smith", "Colin Monk", "Alan Tabern", "Dale Newton", "Steve Hine",
  "Andree Welge", "Adrian Gray", "Wynand Havenga", "Mark Lawrence", "Mick McGowan", "Alan Green",
  "Anton Pein", "Dave Jowett", "Rico Vonck", "Barrie Bates", "Brian Cyr", "Raymond van Barneveld",
  "Mitchell Clegg", "Anthony Fleet", "Ian Branks", "Dave Ladley", "Per Laursen", "Warren French",
  "Martin Burchell", "Shi Yongsheng", "Tetsuya Wada", "Bill Davis", "Ron Miller", "Colin Osborne",
  "Toon Greebe", "Michael van Gerwen", "Mervyn King", "Michael Rosenaur", "Akihiro Nagakawa",
  "Miloslav Navrátil", "Rizal S Barellano Jr", "Jamie Caven", "Jason Barry", "Kirk Shepherd",
  "Steve (ENG) Brown", "Ashfaque Sayed", "Alan Bolton", "Tony Eccles", "Leroy Kwadijk",
  "Jelle Klaasen", "Vincent van der Voort", "Mensur Suljović", "Steve Evans", "Dan Olson",
  "Steve MacArthur", "Charles Losper", "Carlos Rodriguez", "Robert Thornton", "Co Stompé",
  "Hannes Schnier", "David Fatum", "Shane O’Connor", "Felix McBrearty", "Steve Grubb",
  "Kevin McDine", "Sudesh Fitzgerald", "Remco van Eijden", "Anastasia Dobromyslova",
  "Nick Fullwell", "Michael Barnard", "Mark Stephenson", "Marko Kantele", "Lourence Ilagan",
  "Russell Stewart", "Tony Ayres", "Paul Nicholson", "Brendan Dolan", "Nándor Bezzeg",
  "Jyhan Artut", "Christian Perez", "Jarkko Komula", "Roman Konchikov", "Scott Burnett",
  "Les Francis", "Aodhagan O’Neill", "Ken MacNeil", "Mark Webster", "Phillip Hazel",
  "Osmann Kijamet", "Gary Anderson", "Dylan Duo", "Haruki Muramatsu", "Krzysztof Kciuk",
  "Magnus Caris", "Francisco Ruiz", "Peter Wright", "Steve Farmer", "Juanito Gionzon",
  "Mark Hylton", "Veijo Viinikka", "Matt Padgett", "Morihiro Hashimoto", "Boris Krčmar",
  "Nigel Heydon", "Scott MacKenzie", "Toni Alcinas", "Mickey Mansell", "Joe Cullen",
  "Preston Ridd", "Chris Thompson", "Devon Petersen", "Shane Tichowitsch", "Dietmar Burger",
  "Justin Pipe", "Bernd Roith", "Paul Barham", "Sean Reed", "Dennis Nilsson", "Michael Smith",
  "Kurt Van de Rijck", "Ian White", "Lee Choon Peng", "Kevin Munch", "Kim Huybrechts",
  "Connie Finnan", "Dave Chisnall", "James Richardson", "Petri Korte", "Geoff Kime", "Arron Monk",
  "Oliver Ferenc", "John Henderson", "Scott Rand", "José de Sousa", "Chun Nam Leung", "Gino Vos",
  "Jerry Hendriks", "Robert Marijanović", "Daryl Gurney", "James Hubbard", "Charl Pietersen",
  "Max Hopp", "Mark (W.Mids) Jones", "Jani Haavisto", "John Bowles", "Peter Hudson",
  "Kyle Anderson", "Jamie Lewis", "Johnny Haines", "Dean Winstanley", "Dave Harrington",
  "Mohd Latif Sapup", "Stuart Kellett", "Mareno Michels", "Rob Szabo", "Ian Moss", "Julio Barbero",
  "Dennis Lindskjold", "Ricky Evans", "Ronny Huybrechts", "Beau Anderson", "Zoran Lerchbacher",
  "Ben Ward", "Ross Smith", "Royden Lam", "Keegan Brown", "Cristo Reyes", "Christian Kist",
  "Dave Richardson", "Kim Viljanen", "Sascha Stein", "Gerwyn Price", "Laurence Ryder",
  "Andrew Gilding", "Scott Kirchner", "Mark McGrath", "John Weber", "Benito van de Pas",
  "Boris Koltsov", "Ron Meulenkamp", "John Michael", "Ryan de Vreede", "Jason Hogg", "Alex Hon",
  "Nolan Arendse", "Rowby-John Rodriguez", "Jermaine Wattimena", "David Pallett",
  "Stephen Bunting", "Andy Boulton", "Qiang Sun", "René Eidams", "Thanawat Gaweenuntavong",
  "Sven Groen", "Koha Kokiri", "Dimitri Van den Bergh", "Alex Tagarao", "Keita Ono",
  "Michael Rasztovits", "Joe Murnan", "Aleksandr Oreshkin", "Dirk van Duijvenbode",
  "Warwick Scheffer", "Alan Norris", "Jeffrey de Zwaan", "Jan Dekker", "Mark Frost",
  "Jonny Clayton", "Masumi Chino", "Tengku Shah", "Josh Payne", "Ross Snook", "Kevin Simm",
  "Gilbert Ulang", "Chris Dobey", "Corey Cadby", "Steve West", "Dragutin Horvat", "Robbie Green",
  "Simon Stevenson", "Jeffrey de Graaf", "James Wilson", "William O’Connor", "Krzysztof Ratajski",
  "Ted Evetts", "Seigo Asada", "Gordon Mathers", "Rob Cross", "Alan Ljubić", "Jeff Smith",
  "Luke Humphries", "Kenny Neyens", "Peter Jacques", "Cody Harris", "Willard Bruguier",
  "Kai Fan Leung", "Richard North", "Xiaochen Zong", "Bernie Smith", "Steve Lennon",
  "Martin Schindler", "Diogo Portela", "Nitin Kumar", "Lisa Ashton", "Raymond Smith",
  "Kevin Burness", "Jim Long", "Danny Noppert", "Craig Ross", "Ryan Searle", "Stephen Burton",
  "Karel Sedlacek", "Gabriel Clemens", "Aden Kirk", "Yordi Meeuwisse", "Yuanjun Liu", "Adam Hunt",
  "Matthew Edgar", "Darius Labanauskas", "Ryan Joyce", "Daniel Larsson", "James Bailey",
  "Chuck Puleo", "Nathan Aspinall", "Geert Nentjes", "Noel Malicdem", "Ryan Meikle", "Yuki Yamada",
  "Luke Woodhouse", "Matt Campbell", "Mark McGeeney", "Jamie Hughes", "Ciaran Teehan",
  "José Justicia", "Daniel Baggish", "Mikuru Suzuki", "Callan Rydz", "Keane Barry", "Robbie King",
  "Ritchie Edhouse", "Damon Heta", "Fallon Sherrock", "Ben Robb", "Madars Razma", "Harry Ward",
  "Nico Kurz", "Benjamin Pratnemer", "Glen Durrant", "Amit Gilitwala", "David Evans",
  "Niels Zonneveld", "Toru Suzuki", "Mike De Decker", "Edward Foulkes", "Ryan Murray",
  "Danny Lauby", "Huapai Puha", "Bradley Brooks", "Scott Waites", "Di Zhuang", "Deta Hedman",
  "Derk Telnekes", "Nick Kenny", "Jason Lowe", "Dmitriy Gorbunov", "Maik Kuivenhoven",
  "Cameron Carolissen", "Chris Landman", "Scott Mitchell", "Chas Barstow", "John Norman Jr",
  "Fabian Schmutzler", "Roman Benecky", "William Borland", "Jim Williams", "Ky Smith",
  "Jason Heaver", "Florian Hempel", "Alan Soutar", "Martijn Kleermaker", "Rusty-Jake Rodriguez",
  "Toyokazu Shibata", "Lewy Williams", "Grant Sampson", "Nathan Rafferty", "Mal Cuming",
  "Beau Greaves", "Martin Lukeman", "Nobuhiro Yamamoto", "Adam Gawlas", "Josh Rock",
  "Cameron Menzies", "Prakash Jiwa", "Vladyslav Omelchenko", "Scott Williams", "Robert Owen",
  "Paolo Nebrida", "Danny Jansen", "Leonard Gates", "David Cameron", "Danny van Trijp",
  "Sebastian Bialecki", "Jimmy Hendriks", "John O'Shea", "Xicheng Han", "Kevin Doets",
  "Stowe Buntz", "Sandro Eric Sosing", "Lee Evans", "Connor Scutt", "Darren Penhall",
  "Jules van Dongen", "Reynaldo Rivera", "Simon Adams", "Dylan Slevin", "Mario Vandenbogaerde",
  "Thibault Tricole", "Gian van Veen", "Man Lok Leung", "Tomoyo Goto", "Wessel Nijman",
  "Ricardo Pietreczko", "Radek Szaganski", "Owen Bates", "Bhav Patel", "Alex Spellman",
  "Richard Veenstra", "Luke Littler", "Berry van Peer", "Joe Comito", "Stefan Bellmont",
  "Wesley Plaisier", "Ryusei Azemoto", "Kai Gotthardt", "James Hurrell", "Noa-Lynn van Leuven",
  "Rashad Sweeting", "Lok Yin Lee", "Romeo Grbavac", "Niko Springer", "Alexander Merkx",
  "Rhys Griffin", "Alexis Toylo", "Arno Merk", "Jamai van den Herik", "Cor Dekker",
  "Andreas Harrysson", "David Davies", "Cam Crabtree", "Jonny Tata", "Dom Taylor",
  "Oskar Lukasiak", "Lukas Wenig", "Darren Beveridge", "Tavis Dudeney", "Charlie Manby",
  "Andy Baetens", "Adam Lipscombe", "Teemu Harju", "Justin Hood", "Jurjen van der Velde",
  "Adam Sevada", "Patrik Kovacs", "Motomu Sakai", "David Munyua", "Dominik Gruellich",
  "Mitsuhiko Tatsunami", "Matthew Dennant", "Jesus Salate", "Gemma Hayter", "Tim Pusey", "Darryl Pilgrim", "Henry Coates", "Jimmy van Schie",
  "Rob Owen", "Tom Bissell", "Tom Sykes", "Joe Hunt", "Thomas Lovely", "Leon Weber",
  "Tommy Morris", "Viktor Tingstrom", "Marvin van Velzen", "Shane McGuirk", "Greg Ritchie",
  "Adam Paxton", "David Sharp", "Martijn Dragt", "Dennie Olde Kalter", "Adam Warner",
  "Jeffrey Sparidaans", "Tyler Thorpe", "Tommy Lishman", "Niall Culleton", "Sietse Lap",
  "Jack Tweddell", "Adam Leek", "Maximilian Czerwinski", "Derek Coulson", "Stephen Rosney",
  "Nathan Potter", "Stefaan Henderyck", "Tytus Kanik", "Carl Sneyd", "Samuel Price",
  "Daniel Klose", "Daniel Ayres", "Yorick Hofkens", "Lewis Pride", "Pascal Rupprecht",
  "Marvin Kraft", "Paul Krohne", "Jonas Masalin", "Michael Unterbuchner", "Jan Schmidt",
  "Pero Ljubic", "Christopher Wickenden", "Johan Engstrom", "Nandor Major", "Marcel Hausotter",
  "Jack Aldridge", "Archie Self",
];

/* ═════════ 2. QUESTIONS (one per day) ═════════
   date    = "YYYY-MM-DD" – shown in the menu as e.g. "12 October 2026"
   title   = the question shown once the game starts
   answers = the 10 correct players IN ORDER (1st place first).
             Each name must match a name in PLAYERS above.
   To add a day, copy one block and add it to the end of the list.
   You can add questions for future dates ahead of time – they stay hidden
   until that date arrives. */
const QUESTIONS = [
  {
    date: "2026-10-20",
    title: "2015 Premier League of Darts lineup",
    answers: [
      "Michael van Gerwen", "Phil Taylor", "Gary Anderson", "Adrian Lewis", "Peter Wright",
      "James Wade", "Dave Chisnall", "Kim Huybrechts", "Raymond van Barneveld", "Stephen Bunting",
    ],
  },
  {
    date: "2026-10-28",
    title: "Last 10 players to lose a PDC World Championship semi-final",
    answers: [
      "Ryan Searle", "Gary Anderson", "Chris Dobey", "Stephen Bunting", "Rob Cross",
      "Scott Williams", "Gabriel Clemens", "Dimitri Van den Bergh", "James Wade", "Dave Chisnall",
    ],
  },
  {
    date: "2026-10-19",
    title: "Last 10 PDC European Tour winners",
    answers: [
      "Niels Zonneveld", "Jonny Clayton", "James Wade", "Luke Littler", "Ross Smith",
      "Krzysztof Ratajski", "Wessel Nijman", "Luke Woodhouse", "Josh Rock", "Gerwyn Price",
    ],
  },
  {
    date: "2026-10-21",
    title: "Highest checkout % since AFTER the 2026 PDC World Darts Championship in PDC TV Ranking events (Min 90 throws)",
    answers: [
      "Ryan Joyce", "Jonny Clayton", "Gian van Veen", "Gerwyn Price", "Wessel Nijman",
      "Gary Anderson", "Martin Lukeman", "Darryl Pilgrim", "Keane Barry", "Luke Littler",
    ],
  },
  {
    date: "2026-10-22",
    title: "All winners of the PDC European Darts Championship",
    answers: [
      "Gian van Veen", "Ritchie Edhouse", "Peter Wright", "Ross Smith", "Rob Cross",
      "James Wade", "Michael van Gerwen", "Adrian Lewis", "Simon Whitlock", "Phil Taylor",
    ],
  },
  {
    date: "2026-10-27",
    title: "Players with the most 140s recorded the last 365 days in PDC televised ranking events",
    answers: [
      "Luke Littler", "Gerwyn Price", "Luke Humphries", "Gian van Veen", "James Wade",
      "Gary Anderson", "Josh Rock", "Jonny Clayton", "Nathan Aspinall", "Stephen Bunting",
    ],
  },
  {
    date: "2026-10-23",
    title: "Highest averages from the first day of the 2026 European Darts Championship",
    answers: [
      "Kim Huybrechts", "Gerwyn Price", "Luke Woodhouse", "Ryan Searle", "James Wade",
      "Gian van Veen", "Cameron Menzies", "Andrew Gilding", "Damon Heta", "Ross Smith",
    ],
  },
  {
    date: "2026-10-25",
    title: "Last 10 players to beat Littler in televised PDC events (not including World Masters or the Premier League) (after today’s morning session)",
    answers: [
      "Krzysztof Ratajski", "Luke Woodhouse", "Jonny Clayton", "Niels Zonneveld", "James Wade",
      "Danny Noppert", "Gian van Veen", "Luke Humphries", "Andrew Gilding", "Rob Cross",
    ],
  },
  {
    date: "2026-10-26",
    title: "Last 10 losing finalists of the European Darts Championship",
    answers: [
      "Martin Schindler", "Luke Humphries", "Jermaine Wattimena", "James Wade", "Michael Smith",
      "Michael van Gerwen", "Gerwyn Price", "Simon Whitlock", "Rob Cross", "Mensur Suljović",
    ],
  },
  {
    date: "2026-10-30",
    title: "Last 10 winners of a PDC Players Championship",
    answers: [
      "Chris Dobey", "Charlie Manby", "Karel Sedlacek", "Cameron Menzies", "Luke Humphries",
      "Jermaine Wattimena", "Sebastian Bialecki", "Henry Coates", "Gabriel Clemens", "Rob Cross",
    ],
  },
  {
    date: "2026-11-02",
    title: "Top 10 Highest Ranked players in the PDC Order of Merit that are sponsored by Target Darts",
    answers: [
      "Luke Littler", "Josh Rock", "Nathan Aspinall", "Stephen Bunting", "Chris Dobey",
      "Kevin Doets", "Rob Cross", "Jeffrey de Graaf", "Scott Williams", "Raymond van Barneveld",
    ],
  },
  {
    date: "2026-11-03",
    title: "Last 10 players to win a PDC major title",
    answers: [
      "Ross Smith", "Luke Humphries", "Luke Littler", "Gian van Veen", "Michael van Gerwen",
      "Ritchie Edhouse", "Mike De Decker", "Dimitri Van den Bergh", "Stephen Bunting", "Andrew Gilding",
    ],
  },
  {
    date: "2026-11-10",
    title: "Highest averages across the 2026 PDC Players Championship campaign",
    answers: [
      "Gerwyn Price", "Luke Humphries", "Chris Dobey", "Gary Anderson", "Wessel Nijman",
      "Luke Littler", "Ross Smith", "Kevin Doets", "Michael van Gerwen", "Dirk van Duijvenbode",
    ],
  },
  {
    date: "2026-11-09",
    title: "Players with most 180s on the PDC European Tour in 2026",
    answers: [
      "Ross Smith", "Niels Zonneveld", "Kevin Doets", "Wessel Nijman", "Gian van Veen",
      "Danny Noppert", "Nathan Aspinall", "Dirk van Duijvenbode", "Josh Rock", "Damon Heta",
    ],
  },
  {
    date: "2026-11-11",
    title: "First 10 different winners of a PDC European Tour event",
    answers: [
      "Justin Pipe", "Phil Taylor", "Raymond van Barneveld", "Adrian Lewis", "Simon Whitlock",
      "John Part", "Wes Newton", "Michael van Gerwen", "Dave Chisnall", "Steve Beaton",
    ],
  },
];

/* ═════════ HELPERS ═════════ */
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/’/g, "'").toLowerCase();
const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/* ═════════ AUTOCOMPLETE ═════════ */
function SearchBox({ onPick, disabled, exclude, options = PLAYERS }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef(null);

  const matches = useMemo(() => {
    const t = norm(text.trim());
    if (!t) return [];
    return options.filter((n) => !exclude.has(n) && norm(n).includes(t)).slice(0, 6);
  }, [text, exclude, options]);

  const pick = (name) => {
    if (!name) return;
    onPick(name);
    setText("");
    setOpen(false);
    setHi(0);
    ref.current?.focus();
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); pick(matches[hi]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <input
        ref={ref}
        value={text}
        disabled={disabled}
        onChange={(e) => { setText(e.target.value); setOpen(true); setHi(0); }}
        onKeyDown={onKey}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder={disabled ? "Round finished" : "Type a player name…"}
        className="w-full rounded-lg border-2 border-stone-600 bg-stone-900 px-4 py-3 text-lg text-stone-100 placeholder-stone-500 focus:border-emerald-500 focus:outline-none disabled:opacity-50"
      />
      {open && matches.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-stone-600 bg-stone-900 shadow-xl">
          {matches.map((n, i) => (
            <li
              key={n}
              onMouseDown={() => pick(n)}
              onMouseEnter={() => setHi(i)}
              className={`cursor-pointer px-4 py-2 ${i === hi ? "bg-emerald-700 text-white" : "text-stone-200"}`}
            >
              {n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ═════════ THE GAME ═════════ */
function TopTen({ q, onBack }) {
  const [found, setFound] = useState(new Set());
  const [tried, setTried] = useState(new Set());
  const [lives, setLives] = useState(3);
  const [msg, setMsg] = useState(null);
  const [revealed, setRevealed] = useState(false); // answers shown after a loss
  const [closed, setClosed] = useState(false); // end-of-game popup dismissed

  const total = q.answers.length; // 10
  const won = found.size === total;
  const perfect = won && lives === 3; // no wrong answers = whitewash
  const lost = lives === 0;
  const over = won || lost;

  const guess = (name) => {
    setTried((s) => new Set(s).add(name));
    const idx = q.answers.indexOf(name);
    if (idx >= 0) {
      setFound((s) => new Set(s).add(name));
      setMsg({ ok: true, text: `${name} is number ${idx + 1}!` });
    } else {
      setLives((l) => l - 1);
      setMsg({ ok: false, text: `${name} isn't on the list.` });
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <h1 className="text-center text-2xl font-extrabold leading-tight sm:text-3xl">{q.title}</h1>
      <p className="mt-1 text-center text-stone-400">Name all {total}. Three wrong answers and you're out.</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5" aria-label={`${lives} lives left`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-4 w-4 rounded-full border-2 ${i < lives ? "border-red-500 bg-red-500" : "border-stone-600"}`} />
          ))}
        </div>
        <span className="font-semibold text-emerald-400">{found.size} / {total}</span>
      </div>

      <ol className="mt-4 space-y-1.5">
        {q.answers.map((name, i) => {
          const isFound = found.has(name);
          const missed = lost && revealed && !isFound;
          return (
            <li
              key={name}
              className={`flex items-center gap-3 rounded-lg border-2 px-3 py-2.5 ${
                isFound ? "border-emerald-500 bg-emerald-900/50" : missed ? "border-red-500/60 bg-red-950/40" : "border-stone-700 bg-stone-900"
              }`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isFound ? "bg-emerald-500 text-stone-950" : missed ? "bg-red-500 text-white" : "bg-stone-700 text-stone-300"}`}>
                {i + 1}
              </span>
              <span className={`flex-1 font-semibold ${isFound ? "text-stone-50" : missed ? "text-red-200" : "text-stone-600"}`}>
                {isFound || missed ? name : "—"}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 min-h-[1.5rem] text-center font-medium" role="status">
        {msg && <span className={msg.ok ? "text-emerald-400" : "text-red-400"}>{msg.text}</span>}
      </div>

      <div className="mt-2">
        <SearchBox onPick={guess} disabled={over} exclude={tried} />
      </div>

      {over && !closed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div
            className={`w-full max-w-sm rounded-2xl border-2 bg-stone-900 p-8 text-center shadow-2xl ${
              perfect ? "border-amber-400" : won ? "border-emerald-500" : "border-red-500"
            }`}
          >
            {perfect ? (
              <>
                <p className="text-5xl font-black text-amber-400">🎯 Whitewash!</p>
                <p className="mt-2 text-stone-300">{total}/{total} without losing a single life.</p>
              </>
            ) : won ? (
              <>
                <p className="text-4xl font-black text-emerald-400">You win!</p>
                <p className="mt-2 text-stone-300">You got {found.size}/{total}.</p>
              </>
            ) : (
              <>
                <p className="text-4xl font-black text-red-400">Game over</p>
                <p className="mt-2 text-stone-300">You got {found.size}/{total}.</p>
              </>
            )}

            <div className="mt-6 flex flex-col gap-2">
              {lost ? (
                <button
                  onClick={() => { setRevealed(true); setClosed(true); }}
                  className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-500"
                >
                  Reveal answers
                </button>
              ) : (
                <button onClick={() => setClosed(true)} className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-500">
                  View board
                </button>
              )}
              <button onClick={onBack} className="rounded-lg border border-stone-600 px-5 py-2 font-semibold text-stone-300 hover:bg-stone-800">
                Back to questions
              </button>
            </div>
          </div>
        </div>
      )}

      {over && closed && (
        <div className="mt-5 text-center">
          <button onClick={onBack} className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500">
            Back to questions
          </button>
        </div>
      )}
    </div>
  );
}

/* ═════════ MENUS ═════════ */
/* ═════════ HIGHER OR LOWER – ORDER OF MERIT DATA ═════════
   Players in order, rank 1 → 150. A leading "=" means the SAME rank as the
   player above (a tie). Update LAST_UPDATED and this list whenever the
   Order of Merit changes. */
const LAST_UPDATED = "As of: November 5, 2026. Updated after PC34.";
const OOM_RAW = [
  "Luke Littler", "Luke Humphries", "Gian van Veen", "Gerwyn Price", "Jonny Clayton", "Ross Smith",
  "James Wade", "Josh Rock", "Stephen Bunting", "Danny Noppert", "Michael van Gerwen",
  "=Nathan Aspinall", "Wessel Nijman", "Gary Anderson", "Ryan Searle", "Chris Dobey",
  "Luke Woodhouse", "Jermaine Wattimena", "Krzysztof Ratajski", "Martin Schindler",
  "Dirk van Duijvenbode", "=Damon Heta", "Kevin Doets", "Rob Cross", "Ryan Joyce",
  "Cameron Menzies", "Andrew Gilding", "Niels Zonneveld", "William O'Connor", "=Daryl Gurney",
  "Dave Chisnall", "Joe Cullen", "Mike De Decker", "Niko Springer", "Peter Wright",
  "Ricardo Pietreczko", "Michael Smith", "Justin Hood", "Jeffrey de Graaf", "Callan Rydz",
  "Mickey Mansell", "Karel Sedlacek", "Martin Lukeman", "Kim Huybrechts", "Scott Williams",
  "James Hurrell", "Raymond van Barneveld", "Brendan Dolan", "Madars Razma", "Connor Scutt",
  "Sebastian Bialecki", "Ricky Evans", "Gabriel Clemens", "Ritchie Edhouse", "Mensur Suljovic",
  "Keane Barry", "Ian White", "Richard Veenstra", "Bradley Brooks", "Dimitri Van den Bergh",
  "Alan Soutar", "Rob Owen", "Lukas Wenig", "Nick Kenny", "Cristo Reyes", "Max Hopp",
  "Ryan Meikle", "Mario Vandenbogaerde", "Cam Crabtree", "Wesley Plaisier", "Maik Kuivenhoven",
  "Thibault Tricole", "Tom Bissell", "Beau Greaves", "Adam Lipscombe", "Darryl Pilgrim",
  "Charlie Manby", "Cor Dekker", "Dominik Gruellich", "Christian Kist", "Tom Sykes",
  "Tommy Morris", "=Andy Boulton", "Jim Long", "Oskar Lukasiak", "Joe Hunt", "Darius Labanauskas",
  "=Jimmy van Schie", "Thomas Lovely", "Leon Weber", "Viktor Tingstrom", "Shane McGuirk",
  "Marvin van Velzen", "Alexander Merkx", "Owen Bates", "Henry Coates", "=Tavis Dudeney",
  "Adam Gawlas", "Jurjen van der Velde", "Greg Ritchie", "Jeffrey De Zwaan", "Kai Gotthardt",
  "Adam Paxton", "David Sharp", "Stephen Burton", "Chris Landman", "Mervyn King",
  "Benjamin Pratnemer", "Martijn Dragt", "Dennie Olde Kalter", "=Adam Warner", "Tyler Thorpe",
  "=Jeffrey Sparidaans", "Tommy Lishman", "Sietse Lap", "Derek Coulson", "=Niall Culleton",
  "Adam Leek", "=Stefan Bellmont", "=Scott Waites", "Steve Lennon", "Jack Tweddell", "Arno Merk",
  "Maximilian Czerwinski", "Stephen Rosney", "Rhys Griffin", "Stefaan Henderyck", "Nathan Potter",
  "Carl Sneyd", "Harry Ward", "Tytus Kanik", "Samuel Price", "Daniel Klose", "Jack Aldridge",
  "Daniel Ayres", "Yorick Hofkens", "Lewis Pride", "=Pascal Rupprecht", "Marvin Kraft",
  "=Andy Baetens", "Rusty-Jake Rodriguez", "Paul Krohne", "Boris Krcmar", "Jonas Masalin",
  "=Michael Unterbuchner", "Jan Schmidt", "=Patrik Kovacs", "Pero Ljubic", "Archie Self",
  "=Christopher Wickenden", "Johan Engstrom",
];
const OOM = (() => {
  let rank = 0;
  return OOM_RAW.map((n, i) => {
    const tie = n.startsWith("=");
    if (!tie) rank = i + 1;
    return { name: tie ? n.slice(1) : n, rank };
  });
})();

/* ═════════ HIGHER OR LOWER – THE GAME ═════════ */
const randomFrom = (exclude) => {
  let pool = OOM.filter((p) => !exclude.includes(p.name));
  if (pool.length === 0) pool = OOM;
  return pool[Math.floor(Math.random() * pool.length)];
};

const newGame = () => {
  const a = randomFrom([]);
  const b = randomFrom([a.name]);
  return { a, b, used: [a.name, b.name], score: 0, picked: null };
};

const loadBest = () => { try { return Number(localStorage.getItem("oom-best")) || 0; } catch { return 0; } };
const saveBest = (n) => { try { localStorage.setItem("oom-best", String(n)); } catch { /* ignore */ } };

function PlayerCard({ player, showRank, state }) {
  const border = state === "right" ? "border-emerald-500" : state === "wrong" ? "border-red-500" : "border-stone-700";
  return (
    <div className={`flex-1 rounded-2xl border-2 bg-stone-900 p-4 text-center ${border}`}>
      <p className="min-h-[3rem] text-lg font-bold leading-tight sm:text-xl">{player.name}</p>
      <p className="mt-3 text-xs uppercase tracking-widest text-stone-500">Order of Merit</p>
      <p className={`text-5xl font-black ${showRank ? "text-amber-400" : "text-stone-600"}`}>{showRank ? `#${player.rank}` : "?"}</p>
    </div>
  );
}

function HigherLower({ onBack }) {
  const [game, setGame] = useState(newGame);
  const [best, setBest] = useState(loadBest);
  const { a, b, score, picked } = game;
  const over = picked && !picked.correct;

  const guess = (g) => {
    if (picked) return;
    // "Higher" = ranked higher in the table (closer to #1). Equal ranks always count as correct.
    const correct = b.rank === a.rank || (g === "higher" ? b.rank < a.rank : b.rank > a.rank);
    const newScore = correct ? score + 1 : score;
    if (newScore > best) { setBest(newScore); saveBest(newScore); }
    setGame((s) => ({ ...s, picked: { g, correct }, score: newScore }));
  };

  const next = () => {
    setGame((s) => {
      const c = randomFrom(s.used);
      return { a: s.b, b: c, used: [...s.used, c.name], score: s.score, picked: null };
    });
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <h1 className="text-center text-3xl font-black">Higher or Lower</h1>
      <p className="mt-1 text-center text-sm font-semibold text-amber-400">{LAST_UPDATED}</p>
      <p className="mt-3 text-center text-stone-400">
        Is the player on the right ranked <b className="text-stone-200">higher</b> or <b className="text-stone-200">lower</b> than the player on the left in the PDC Order of Merit?
      </p>

      <div className="mt-4 flex justify-between font-semibold">
        <span className="text-emerald-400">Streak: {score}</span>
        <span className="text-stone-400">Best: {best}</span>
      </div>

      <div className="mt-3 flex items-stretch gap-3">
        <PlayerCard player={a} showRank />
        <PlayerCard player={b} showRank={!!picked} state={picked ? (picked.correct ? "right" : "wrong") : undefined} />
      </div>

      <div className="mt-5 min-h-[1.5rem] text-center font-medium" role="status">
        {picked?.correct && (
          <span className="text-emerald-400">
            {b.rank === a.rank ? "Same rank – counts as correct!" : "Correct!"}
          </span>
        )}
      </div>

      {!picked && (
        <div className="mt-2 grid grid-cols-2 gap-3">
          <button onClick={() => guess("higher")} className="rounded-xl bg-emerald-600 px-4 py-4 text-lg font-bold text-white hover:bg-emerald-500">▲ Higher</button>
          <button onClick={() => guess("lower")} className="rounded-xl bg-red-600 px-4 py-4 text-lg font-bold text-white hover:bg-red-500">▼ Lower</button>
        </div>
      )}

      {picked?.correct && (
        <button onClick={next} className="mt-2 w-full rounded-xl bg-emerald-600 px-4 py-4 text-lg font-bold text-white hover:bg-emerald-500">Next player →</button>
      )}

      {over && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-red-500 bg-stone-900 p-8 text-center shadow-2xl">
            <p className="text-4xl font-black text-red-400">Game over</p>
            <p className="mt-2 text-stone-300">
              {b.name} is #{b.rank}, {a.name} is #{a.rank}.
            </p>
            <p className="mt-2 text-xl font-bold">Your streak: {score}</p>
            <div className="mt-6 flex flex-col gap-2">
              <button onClick={() => setGame(newGame())} className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-500">Play again</button>
              <button onClick={onBack} className="rounded-lg border border-stone-600 px-5 py-2 font-semibold text-stone-300 hover:bg-stone-800">Back to menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═════════ GUESS THE PLAYER (daily mystery player) ═════════
   Add a player by adding "Name": "Country" below. His rank comes from the
   Order of Merit list above (he must be in OOM_RAW with exactly this spelling). */
const COUNTRY = {
  "Luke Littler": "England", "Gian van Veen": "Netherlands", "Luke Humphries": "England",
  "Gerwyn Price": "Wales", "Jonny Clayton": "Wales", "Ross Smith": "England",
  "James Wade": "England", "Josh Rock": "N. Ireland", "Stephen Bunting": "England",
  "Nathan Aspinall": "England", "Danny Noppert": "Netherlands", "Wessel Nijman": "Netherlands",
  "Michael van Gerwen": "Netherlands", "Gary Anderson": "Scotland", "Ryan Searle": "England",
  "Chris Dobey": "England", "Luke Woodhouse": "England", "Jermaine Wattimena": "Netherlands",
  "Krzysztof Ratajski": "Poland", "Martin Schindler": "Germany", "Damon Heta": "Australia",
  "Dirk van Duijvenbode": "Netherlands", "Cameron Menzies": "Scotland", "Rob Cross": "England",
  "Ryan Joyce": "England", "Kevin Doets": "Netherlands", "Andrew Gilding": "England",
  "Niels Zonneveld": "Netherlands", "Daryl Gurney": "N. Ireland", "William O'Connor": "Ireland",
  "Dave Chisnall": "England", "Joe Cullen": "England", "Mike De Decker": "Belgium",
  "Niko Springer": "Germany", "Peter Wright": "Scotland", "Michael Smith": "England",
  "Ricardo Pietreczko": "Germany", "Callan Rydz": "England", "Justin Hood": "England",
  "Jeffrey de Graaf": "Sweden", "Mickey Mansell": "Ireland", "Karel Sedlacek": "Czechia",
  "Martin Lukeman": "England", "James Hurrell": "England", "Madars Razma": "Latvia",
  "Kim Huybrechts": "Belgium", "Scott Williams": "England", "Raymond van Barneveld": "Netherlands",
  "Connor Scutt": "England", "Brendan Dolan": "Ireland", "Sebastian Bialecki": "Poland",
  "Ricky Evans": "England", "Gabriel Clemens": "Germany", "Mensur Suljovic": "Austria",
  "Ritchie Edhouse": "England", "Keane Barry": "Ireland", "Ian White": "England",
  "Richard Veenstra": "Netherlands", "Dimitri Van den Bergh": "Belgium", "Bradley Brooks": "England",
  "Alan Soutar": "Scotland", "Rob Owen": "Wales",
};
const GP_POOL = OOM.filter((p) => COUNTRY[p.name]).map((p) => ({ ...p, country: COUNTRY[p.name] }));
const GP_NAMES = GP_POOL.map((p) => p.name);
const MAX_GUESSES = 8;

const dailyTarget = () => {
  const key = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return GP_POOL[h % GP_POOL.length];
};
const randomTarget = () => GP_POOL[Math.floor(Math.random() * GP_POOL.length)];

const initialsOf = (name) => {
  const [first, ...rest] = name.split(" ");
  return [first[0].toUpperCase(), rest.join(" ")[0].toUpperCase()];
};

function compareGuess(g, t) {
  const [gf, gs] = initialsOf(g.name);
  const [tf, ts] = initialsOf(t.name);
  return {
    sameCountry: g.country === t.country,
    rankDir: g.rank === t.rank ? "same" : t.rank < g.rank ? "up" : "down",
    rankClose: Math.abs(g.rank - t.rank) <= 5,
    initialHits: (gf === tf ? 1 : 0) + (gs === ts ? 1 : 0),
    initials: `${gf}. ${gs}.`,
  };
}

const chip = (level) =>
  level === "good" ? "bg-emerald-700 text-white" : level === "close" ? "bg-amber-600 text-white" : "bg-stone-800 text-stone-300";

function GuessPlayer({ onBack }) {
  const [target, setTarget] = useState(dailyTarget);
  const [daily, setDaily] = useState(true);
  const [guesses, setGuesses] = useState([]);

  const won = guesses.some((g) => g.name === target.name);
  const lost = !won && guesses.length >= MAX_GUESSES;
  const over = won || lost;

  const guess = (name) => {
    const p = GP_POOL.find((x) => x.name === name);
    if (p) setGuesses((g) => [...g, p]);
  };
  const again = () => { setTarget(randomTarget()); setDaily(false); setGuesses([]); };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <h1 className="text-center text-3xl font-black">Guess the Player</h1>
      <p className="mt-1 text-center text-sm font-semibold text-amber-400">{daily ? "Today's mystery player" : "Practice round"}</p>
      <p className="mt-3 text-center text-stone-400">
        A mystery player from the PDC Order of Merit top {GP_POOL.length}. You have {MAX_GUESSES} guesses.
      </p>

      <p className="mt-4 text-right text-sm font-semibold text-stone-400">Guesses: {guesses.length}/{MAX_GUESSES}</p>

      <ul className="mt-2 space-y-2">
        {guesses.map((g) => {
          const c = compareGuess(g, target);
          return (
            <li key={g.name} className="rounded-xl border-2 border-stone-700 bg-stone-900 p-3">
              <p className="font-bold">{g.name}</p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm font-semibold">
                <span className={`rounded-lg px-2 py-1.5 ${chip(c.sameCountry ? "good" : "none")}`}>{g.country}</span>
                <span className={`rounded-lg px-2 py-1.5 ${chip(c.rankDir === "same" ? "good" : c.rankClose ? "close" : "none")}`}>
                  #{g.rank} {c.rankDir === "same" ? "✓" : c.rankDir === "up" ? "▲" : "▼"}
                </span>
                <span className={`rounded-lg px-2 py-1.5 ${chip(c.initialHits === 2 ? "good" : c.initialHits === 1 ? "close" : "none")}`}>{c.initials}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        <SearchBox
          onPick={guess}
          disabled={over}
          exclude={new Set(guesses.map((g) => g.name))}
          options={GP_NAMES}
        />
      </div>

      <div className="mt-4 rounded-lg bg-stone-900 p-3 text-sm text-stone-400">
        <p><b className="text-stone-200">Country:</b> green if it matches.</p>
        <p><b className="text-stone-200">Rank:</b> ▲ means the mystery player is ranked higher (closer to #1), ▼ lower. Amber = within 5 places.</p>
        <p><b className="text-stone-200">Initials:</b> green = both match, amber = one matches.</p>
      </div>

      {over && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className={`w-full max-w-sm rounded-2xl border-2 bg-stone-900 p-8 text-center shadow-2xl ${won ? "border-emerald-500" : "border-red-500"}`}>
            <p className={`text-4xl font-black ${won ? "text-emerald-400" : "text-red-400"}`}>{won ? "You got it!" : "Out of guesses"}</p>
            <p className="mt-2 text-stone-300">
              {won ? `The player was ${target.name}. You needed ${guesses.length} ${guesses.length === 1 ? "guess" : "guesses"}.` : `The player was ${target.name}.`}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button onClick={again} className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-500">Play a random player</button>
              <button onClick={onBack} className="rounded-lg border border-stone-600 px-5 py-2 font-semibold text-stone-300 hover:bg-stone-800">Back to menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═════════ LINE THEM UP ═════════
   Five random players – tap them from highest to lowest in the Order of Merit.
   Uses the same OOM_RAW list as Higher or Lower, so it updates with it. */
const newLineup = () => [...OOM].sort(() => Math.random() - 0.5).slice(0, 5);
const loadLineBest = () => { try { return Number(localStorage.getItem("lineup-best")) || 0; } catch { return 0; } };
const saveLineBest = (n) => { try { localStorage.setItem("lineup-best", String(n)); } catch { /* ignore */ } };

function LineUp({ onBack }) {
  const [players, setPlayers] = useState(newLineup);
  const [picked, setPicked] = useState([]); // names, in the order tapped
  const [lives, setLives] = useState(3);
  const [cleared, setCleared] = useState(0);
  const [msg, setMsg] = useState(null);
  const [best, setBest] = useState(loadLineBest);

  const remaining = players.filter((p) => !picked.includes(p.name));
  const done = remaining.length === 0;
  const dead = lives === 0;

  const tap = (p) => {
    if (done || dead) return;
    const topRank = Math.min(...remaining.map((r) => r.rank)); // equal ranks are both fine
    if (p.rank === topRank) {
      setPicked((s) => [...s, p.name]);
      setMsg({ ok: true, text: `${p.name} – #${p.rank}` });
      if (remaining.length === 1) {
        const n = cleared + 1;
        setCleared(n);
        if (n > best) { setBest(n); saveLineBest(n); }
      }
    } else {
      setLives((l) => l - 1);
      setMsg({ ok: false, text: `Not ${p.name} – someone left is ranked higher.` });
    }
  };

  const nextRound = () => { setPlayers(newLineup()); setPicked([]); setMsg(null); };
  const restart = () => { setPlayers(newLineup()); setPicked([]); setLives(3); setCleared(0); setMsg(null); };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <h1 className="text-center text-3xl font-black">Line Them Up</h1>
      <p className="mt-1 text-center text-sm font-semibold text-amber-400">{LAST_UPDATED}</p>
      <p className="mt-3 text-center text-stone-400">
        Tap the players in order, from <b className="text-stone-200">highest ranked</b> to <b className="text-stone-200">lowest ranked</b> in the PDC Order of Merit. Three lives.
      </p>

      <div className="mt-4 flex items-center justify-between font-semibold">
        <div className="flex gap-1.5" aria-label={`${lives} lives left`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-4 w-4 rounded-full border-2 ${i < lives ? "border-red-500 bg-red-500" : "border-stone-600"}`} />
          ))}
        </div>
        <span className="text-emerald-400">Rounds: {cleared}</span>
        <span className="text-stone-400">Best: {best}</span>
      </div>

      <ol className="mt-4 space-y-1.5">
        {players.map((_, i) => {
          const p = picked[i] ? players.find((x) => x.name === picked[i]) : null;
          return (
            <li key={i} className={`flex items-center gap-3 rounded-lg border-2 px-3 py-2.5 ${p ? "border-emerald-500 bg-emerald-900/50" : "border-stone-700 bg-stone-900"}`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${p ? "bg-emerald-500 text-stone-950" : "bg-stone-700 text-stone-300"}`}>{i + 1}</span>
              <span className={`flex-1 font-semibold ${p ? "text-stone-50" : "text-stone-600"}`}>{p ? p.name : "—"}</span>
              {p && <span className="text-sm font-bold text-amber-400">#{p.rank}</span>}
            </li>
          );
        })}
      </ol>

      <div className="mt-4 min-h-[1.5rem] text-center font-medium" role="status">
        {msg && <span className={msg.ok ? "text-emerald-400" : "text-red-400"}>{msg.text}</span>}
      </div>

      {!done && !dead && (
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {remaining.map((p) => (
            <button key={p.name} type="button" onClick={() => tap(p)} className="rounded-xl border-2 border-stone-600 bg-stone-800 px-4 py-3 text-lg font-bold hover:border-emerald-500 hover:bg-stone-700">
              {p.name}
            </button>
          ))}
        </div>
      )}

      {done && !dead && (
        <button onClick={nextRound} className="mt-2 w-full rounded-xl bg-emerald-600 px-4 py-4 text-lg font-bold text-white hover:bg-emerald-500">
          Round cleared! Next round →
        </button>
      )}

      {dead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-red-500 bg-stone-900 p-8 text-center shadow-2xl">
            <p className="text-4xl font-black text-red-400">Game over</p>
            <p className="mt-2 text-xl font-bold">Rounds cleared: {cleared}</p>
            <p className="mt-4 text-xs uppercase tracking-widest text-stone-500">The correct order was</p>
            <ol className="mt-1 text-left text-stone-300">
              {[...players].sort((a, b) => a.rank - b.rank).map((p) => (
                <li key={p.name} className="flex justify-between"><span>{p.name}</span><span className="font-bold text-amber-400">#{p.rank}</span></li>
              ))}
            </ol>
            <div className="mt-6 flex flex-col gap-2">
              <button onClick={restart} className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-500">Play again</button>
              <button onClick={onBack} className="rounded-lg border border-stone-600 px-5 py-2 font-semibold text-stone-300 hover:bg-stone-800">Back to menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═════════ 501 – PLAY A LEG OF DARTS ═════════
   Tap the board to choose where to aim. The crosshair wobbles around your aim
   point – press THROW when it is on target. Finish on a double. Fewest darts wins. */
const B_CX = 220, B_CY = 220, B_K = 190 / 170; // board centre and scale (pixels per mm)
const SECTORS = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
const RING_BOOST = 1.05; // trebles and doubles are 5% wider than a standard board
const BR = {
  bull: 6.35 * B_K, outerBull: 15.9 * B_K,
  trebleIn: (103 - 4 * RING_BOOST) * B_K, trebleOut: (103 + 4 * RING_BOOST) * B_K,
  doubleIn: (170 - 8 * RING_BOOST) * B_K, doubleOut: 170 * B_K,
};
const DIFFS = {
  hard: { label: "Hard", sub: "Finals night nerves", wobble: 45, speed: 1.54 },
};

const polar = (r, deg) => { const a = (deg * Math.PI) / 180; return [B_CX + r * Math.sin(a), B_CY - r * Math.cos(a)]; };
const arcPath = (r1, r2, a1, a2) => {
  const [x1, y1] = polar(r2, a1), [x2, y2] = polar(r2, a2), [x3, y3] = polar(r1, a2), [x4, y4] = polar(r1, a1);
  return `M${x1} ${y1}A${r2} ${r2} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r1} ${r1} 0 0 0 ${x4} ${y4}Z`;
};

function dartScore(x, y) {
  const dx = x - B_CX, dy = y - B_CY, r = Math.hypot(dx, dy);
  if (r <= BR.bull) return { value: 50, dbl: true, label: "Bull" };
  if (r <= BR.outerBull) return { value: 25, dbl: false, label: "25" };
  if (r > BR.doubleOut) return { value: 0, dbl: false, label: "Miss" };
  let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
  if (deg < 0) deg += 360;
  const n = SECTORS[Math.floor(((deg + 9) % 360) / 18)];
  if (r >= BR.trebleIn && r <= BR.trebleOut) return { value: 3 * n, dbl: false, label: `T${n}` };
  if (r >= BR.doubleIn) return { value: 2 * n, dbl: true, label: `D${n}` };
  return { value: n, dbl: false, label: `S${n}` };
}

function buildBoard() {
  const parts = [];
  parts.push(<circle key="bg" cx={B_CX} cy={B_CY} r={BR.doubleOut + 4} fill="#0c0a09" />);
  SECTORS.forEach((n, i) => {
    const a1 = i * 18 - 9, a2 = i * 18 + 9;
    const single = i % 2 === 0 ? "#171717" : "#e8dcc0";
    const ring = i % 2 === 0 ? "#c62828" : "#2e7d32";
    const s = { stroke: "#0c0a09", strokeWidth: 0.6 };
    parts.push(
      <path key={`a${i}`} d={arcPath(BR.outerBull, BR.trebleIn, a1, a2)} fill={single} {...s} />,
      <path key={`b${i}`} d={arcPath(BR.trebleIn, BR.trebleOut, a1, a2)} fill={ring} {...s} />,
      <path key={`c${i}`} d={arcPath(BR.trebleOut, BR.doubleIn, a1, a2)} fill={single} {...s} />,
      <path key={`d${i}`} d={arcPath(BR.doubleIn, BR.doubleOut, a1, a2)} fill={ring} {...s} />
    );
    const [tx, ty] = polar(BR.doubleOut + 15, i * 18);
    parts.push(<text key={`t${i}`} x={tx} y={ty} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="700" fill="#e7e5e4">{n}</text>);
  });
  parts.push(
    <circle key="ob" cx={B_CX} cy={B_CY} r={BR.outerBull} fill="#2e7d32" stroke="#0c0a09" strokeWidth="0.6" />,
    <circle key="bb" cx={B_CX} cy={B_CY} r={BR.bull} fill="#c62828" stroke="#0c0a09" strokeWidth="0.6" />
  );
  return parts;
}

const loadBest501 = (d) => { try { return Number(localStorage.getItem(`501-best-${d}`)) || 0; } catch { return 0; } };
const saveBest501 = (d, n) => { try { localStorage.setItem(`501-best-${d}`, String(n)); } catch { /* ignore */ } };
const startAim = () => { const [x, y] = polar((BR.trebleIn + BR.trebleOut) / 2, 0); return { x, y }; };

const CONFETTI_COLOURS = ["#fbbf24", "#ef4444", "#34d399", "#60a5fa", "#f472b6"];
const CELEBRATE_CSS = `
@keyframes pop180 { 0% { transform: scale(.3); opacity: 0 } 55% { transform: scale(1.18); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes confettiFall { 0% { transform: translateY(-12vh) rotate(0deg); opacity: 1 } 100% { transform: translateY(112vh) rotate(720deg); opacity: .9 } }
@keyframes coolFill { from { width: 0 } to { width: 100% } }
@keyframes toastIn { 0% { transform: translateY(-20px); opacity: 0 } 15% { transform: translateY(0); opacity: 1 } 85% { opacity: 1 } 100% { opacity: 0 } }`;

function ConfettiPiece({ c }) {
  return (
    <div
      className="pointer-events-none"
      style={{ position: "absolute", top: 0, left: `${c.left}%`, width: c.size, height: c.size * 1.6, background: c.colour, borderRadius: 2, animation: `confettiFall ${c.dur}s ${c.delay}s ease-in forwards` }}
    />
  );
}

const emptyStats = () => [0, 1].map(() => ({ darts: 0, points: 0, busts: 0, ton: 0, ton40: 0, oneEighty: 0, high: 0, highFinish: 0, bestLeg: 0 }));
const avgOf = (o) => (o.darts ? (o.points / o.darts) * 3 : 0);

function StatsTable({ stats, two, legsWon, bestOf }) {
  const dash = (n) => (n ? n : "–");
  const rows = [
    ["3-dart average", (o) => avgOf(o).toFixed(1)],
    ["Darts thrown", (o) => o.darts],
    ...(bestOf > 1 ? [["Legs won", (o, i) => legsWon[i]]] : []),
    ["100+ scores", (o) => o.ton],
    ["140+ scores", (o) => o.ton40],
    ["180s", (o) => o.oneEighty],
    ["Highest score", (o) => dash(o.high)],
    ["Highest finish", (o) => dash(o.highFinish)],
    ["Best leg (darts)", (o) => dash(o.bestLeg)],
    ["Busts", (o) => o.busts],
  ];
  const cols = two ? [0, 1] : [0];
  return (
    <table className="mt-4 w-full text-left text-sm">
      <thead>
        <tr className="text-xs uppercase tracking-widest text-stone-500">
          <th className="pb-2 font-semibold">Stat</th>
          {cols.map((i) => <th key={i} className="pb-2 text-right font-semibold">{two ? `P${i + 1}` : "You"}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, f]) => (
          <tr key={label} className="border-t border-stone-800">
            <td className="py-1.5 text-stone-300">{label}</td>
            {cols.map((i) => <td key={i} className="py-1.5 text-right font-bold text-stone-50">{f(stats[i], i)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Darts501({ onBack }) {
  const [pick, setPick] = useState(null); // mode chosen, waiting for the number of legs
  const [mode, setMode] = useState(null); // "single" | "two"
  const [bestOf, setBestOf] = useState(1); // 1, 3 or 5
  const [leg, setLeg] = useState(1);
  const [legsWon, setLegsWon] = useState([0, 0]);
  const [starter, setStarter] = useState(0); // who threw first in leg 1 (alternates each leg)
  const [legBreak, setLegBreak] = useState(null); // { winner } between legs
  const [legDarts, setLegDarts] = useState([0, 0]); // darts thrown this leg
  const [stats, setStats] = useState(emptyStats);
  const [showStats, setShowStats] = useState(false);
  const [aim, setAim] = useState(startAim);
  const [scores, setScores] = useState([501, 501]);
  const [cur, setCur] = useState(0); // whose turn it is (0 or 1)
  const [turnStart, setTurnStart] = useState(501);
  const [turn, setTurn] = useState([]);
  const [landings, setLandings] = useState([]);
  const [turnOver, setTurnOver] = useState(false);
  const [turns, setTurns] = useState([0, 0]);
  const [winner, setWinner] = useState(null); // winner of the whole match
  const [msg, setMsg] = useState(null);
  const [best, setBest] = useState(() => loadBest501("hard"));
  const [celebrate, setCelebrate] = useState(null); // 180s, big finishes, ton-plus scores
  const [finish, setFinish] = useState(0); // the checkout the winner finished from
  const celebId = useRef(0);
  const [bull, setBull] = useState(null); // two-player "bull up": { who, d:[mm,mm], winner, tie }
  const [cooling, setCooling] = useState(false); // 1 second cooldown after each throw
  const coolTimer = useRef(null);
  useEffect(() => () => clearTimeout(coolTimer.current), []);
  const confetti = useMemo(
    () => Array.from({ length: 34 }, (_, i) => ({
      left: Math.random() * 100, delay: Math.random() * 0.7, dur: 1.7 + Math.random() * 1.3,
      size: 6 + Math.random() * 7, colour: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
    })),
    []
  );
  const celebrateNow = (c) => { celebId.current += 1; setCelebrate({ id: celebId.current, ...c }); };

  const svgRef = useRef(null);
  const crossRef = useRef(null);
  const aimRef = useRef(aim);
  const posRef = useRef(startAim());
  const art = useMemo(buildBoard, []);
  const { wobble, speed } = DIFFS.hard;
  const two = mode === "two";
  const done = winner !== null;
  const name = (i) => `Player ${i + 1}`;
  const remaining = scores[cur];

  useEffect(() => { aimRef.current = aim; }, [aim]);

  // Celebrations clear themselves
  useEffect(() => {
    if (!celebrate) return undefined;
    const t = setTimeout(() => setCelebrate(null), celebrate.big ? 2600 : 1800);
    return () => clearTimeout(t);
  }, [celebrate]);

  // The crosshair wobbles around the aim point
  useEffect(() => {
    if (!mode) return undefined;
    let raf;
    const loop = (now) => {
      const t = (now / 1000) * speed;
      const a = aimRef.current;
      const x = a.x + wobble * (0.65 * Math.sin(1.9 * t + 0.4) + 0.35 * Math.sin(4.3 * t + 1.1));
      const y = a.y + wobble * (0.65 * Math.sin(1.5 * t + 2.0) + 0.35 * Math.sin(3.7 * t + 0.2));
      posRef.current = { x, y };
      crossRef.current?.setAttribute("transform", `translate(${x} ${y})`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mode, wobble, speed]);

  const choose = (m, n) => {
    setPick(null); setMode(m); setBestOf(n); setBest(loadBest501("hard"));
    setLeg(1); setLegsWon([0, 0]); setStarter(0); setLegBreak(null); setLegDarts([0, 0]); setStats(emptyStats()); setShowStats(false);
    setAim(m === "two" ? { x: B_CX, y: B_CY } : startAim()); setScores([501, 501]); setCur(0); setTurnStart(501); setTurn([]); setLandings([]);
    setBull(m === "two" ? { who: 0, d: [null, null], winner: null, tie: false } : null);
    setTurnOver(false); setTurns([0, 0]); setWinner(null); setMsg(null); setFinish(0); setCelebrate(null);
    clearTimeout(coolTimer.current); setCooling(false);
  };

  const setAimFromPointer = (e) => {
    if (done || turnOver || legBreak) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * 440) / rect.width;
    const y = ((e.clientY - rect.top) * 440) / rect.height;
    setAim({ x: Math.max(0, Math.min(440, x)), y: Math.max(0, Math.min(440, y)) });
  };

  const startCooldown = () => {
    setCooling(true);
    clearTimeout(coolTimer.current);
    coolTimer.current = setTimeout(() => setCooling(false), 1000);
  };

  // Bull up: each player throws one dart at the bull, closest throws first
  const throwBull = (x, y) => {
    if (bull.winner !== null || bull.tie || bull.d[bull.who] !== null) return;
    const mm = Math.hypot(x - B_CX, y - B_CY) / B_K;
    const d = bull.d.map((v, i) => (i === bull.who ? mm : v));
    setLandings((l) => [...l, { x, y, c: bull.who === 0 ? "#fafafa" : "#38bdf8" }]);
    if (bull.who === 0) setBull({ ...bull, d, who: 1 });
    else if (Math.abs(d[0] - d[1]) < 0.3) setBull({ ...bull, d, tie: true });
    else setBull({ ...bull, d, winner: d[0] < d[1] ? 0 : 1 });
  };
  const bullAgain = () => { setBull({ who: 0, d: [null, null], winner: null, tie: false }); setLandings([]); };
  const startGame = () => {
    setStarter(bull.winner); setCur(bull.winner); setTurnStart(501); setBull(null); setLandings([]); setTurn([]); setMsg(null); setAim(startAim());
  };

  const upd = (i, fn) => setStats((arr) => arr.map((o, k) => (k === i ? fn({ ...o }) : o)));
  const closeTurn = (i, total) => upd(i, (o) => {
    o.high = Math.max(o.high, total);
    if (total >= 100) o.ton += 1;
    if (total >= 140) o.ton40 += 1;
    if (total === 180) o.oneEighty += 1;
    return o;
  });

  const throwDart = () => {
    if (done || turnOver || cooling || legBreak) return;
    startCooldown();
    const p = posRef.current;
    const x = p.x + (Math.random() - 0.5) * 3, y = p.y + (Math.random() - 0.5) * 3; // tiny random drift
    if (bull) { throwBull(x, y); return; }
    const s = dartScore(x, y);
    const nr = remaining - s.value;
    const bust = nr < 0 || nr === 1 || (nr === 0 && !s.dbl);
    const t = [...turn, s];
    const thrown = legDarts[cur] + 1;
    const earlier = turn.reduce((a, d) => a + d.value, 0); // points already scored this turn
    const setMine = (setter, v) => setter((arr) => arr.map((o, i) => (i === cur ? v : o)));
    setLandings((l) => [...l, { x, y }]);
    setTurn(t);
    setMine(setLegDarts, thrown);
    upd(cur, (o) => { o.darts += 1; if (bust) { o.points -= earlier; o.busts += 1; } else o.points += s.value; return o; });
    if (bust) {
      setMine(setScores, turnStart); setTurnOver(true);
      setMsg(nr === 0 ? "Bust! You must finish on a double." : "Bust!");
    } else {
      setMine(setScores, nr);
      const total = t.reduce((a, d) => a + d.value, 0);
      if (nr === 0) {
        closeTurn(cur, total);
        upd(cur, (o) => { o.highFinish = Math.max(o.highFinish, turnStart); if (o.bestLeg === 0 || thrown < o.bestLeg) o.bestLeg = thrown; return o; });
        setMsg(null); setFinish(turnStart);
        const newLegs = legsWon.map((v, i) => (i === cur ? v + 1 : v));
        setLegsWon(newLegs);
        if (!two && (best === 0 || thrown < best)) { setBest(thrown); saveBest501("hard", thrown); }
        if (thrown === 9 || turnStart >= 100) celebrateNow({ big: true, confettiOnly: true });
        const matchWon = two ? newLegs[cur] >= Math.ceil(bestOf / 2) : leg >= bestOf;
        if (matchWon) setWinner(cur); else setLegBreak({ winner: cur });
      } else if (t.length === 3) {
        closeTurn(cur, total);
        setTurnOver(true); setMsg(`Turn score: ${total}`);
        const who = two ? `${name(cur)} · ` : "";
        if (total === 180) celebrateNow({ big: true, text: "180!", sub: `${who}ONE HUNDRED AND EIGHTY!` });
        else if (total >= 100) celebrateNow({ big: false, text: `${total}!` });
      } else setMsg(null);
    }
  };

  const nextTurn = () => {
    const nxt = two ? 1 - cur : cur;
    setTurns((arr) => arr.map((o, i) => (i === cur ? o + 1 : o)));
    setCur(nxt); setTurnStart(scores[nxt]); setTurn([]); setLandings([]); setTurnOver(false); setMsg(null);
  };

  // Next leg: fresh 501 for both, and the player who didn't start last time throws first
  const nextLeg = () => {
    const first = two ? (starter + leg) % 2 : 0;
    setLeg((l) => l + 1); setScores([501, 501]); setCur(first); setTurnStart(501); setTurn([]); setLandings([]);
    setTurnOver(false); setTurns([0, 0]); setLegDarts([0, 0]); setMsg(null); setFinish(0); setLegBreak(null); setCelebrate(null); setAim(startAim());
  };

  // ── Screen 1: single or two players
  if (!mode && !pick) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-10">
        <h1 className="text-center text-4xl font-black">501</h1>
        <p className="mt-3 text-center text-stone-400">Start on 501, count down to zero and finish on a double. A perfect leg takes nine darts.</p>
        <div className="mt-8 space-y-3">
          <button onClick={() => setPick("single")} className="block w-full rounded-xl border-2 border-emerald-600 bg-stone-900 p-5 text-left hover:bg-emerald-950">
            <span className="block text-xl font-bold">Single player</span>
            <span className="text-stone-400">Beat your best: finish in as few darts as you can.</span>
          </button>
          <button onClick={() => setPick("two")} className="block w-full rounded-xl border-2 border-emerald-600 bg-stone-900 p-5 text-left hover:bg-emerald-950">
            <span className="block text-xl font-bold">Two players</span>
            <span className="text-stone-400">Take turns on the same screen. Bull up to see who throws first.</span>
          </button>
        </div>
      </div>
    );
  }

  // ── Screen 2: how many legs
  if (!mode && pick) {
    const opts = pick === "two"
      ? [[1, "Best of 1", "First to win 1 leg"], [3, "Best of 3", "First to win 2 legs"], [5, "Best of 5", "First to win 3 legs"]]
      : [[1, "1 leg", "One quick leg"], [3, "3 legs", "Play three legs"], [5, "5 legs", "Play five legs"]];
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-10">
        <h1 className="text-center text-4xl font-black">{pick === "two" ? "Two players" : "Single player"}</h1>
        <p className="mt-3 text-center text-stone-400">{pick === "two" ? "Choose the length of the match." : "How many legs do you want to play?"}</p>
        <div className="mt-8 space-y-3">
          {opts.map(([n, title, sub]) => (
            <button key={n} onClick={() => choose(pick, n)} className="block w-full rounded-xl border-2 border-emerald-600 bg-stone-900 p-5 text-left hover:bg-emerald-950">
              <span className="block text-xl font-bold">{title}</span>
              <span className="text-stone-400">{sub}</span>
            </button>
          ))}
        </div>
        <button onClick={() => setPick(null)} className="mt-6 block w-full text-center text-sm text-stone-400 hover:text-stone-100">← Change number of players</button>
      </div>
    );
  }

  const act = bull ? bull.who : cur;
  const hint = remaining <= 40 && remaining % 2 === 0 ? `Double ${remaining / 2} to win` : remaining === 50 ? "Bullseye to win" : null;
  const nine = winner !== null && legDarts[winner] === 9;
  const bigFinish = finish >= 100;
  return (
    <div className="mx-auto w-full max-w-md px-4 py-4">
      {bestOf > 1 && (
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-stone-400">
          {two ? `Best of ${bestOf}` : `${bestOf} legs`} · Leg {leg}{!two ? ` of ${bestOf}` : ""}
        </p>
      )}
      {two ? (
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((i) => (
            <div key={i} className={`rounded-xl border-2 px-3 py-2 text-center ${i === act && !done && !legBreak ? "border-amber-400 bg-stone-900" : "border-stone-700 bg-stone-900/50"}`}>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">{name(i)}</p>
              <p className={`text-4xl font-black ${i === act ? "text-amber-400" : "text-stone-300"}`}>{scores[i]}</p>
              <p className="text-xs text-stone-500">Darts: {legDarts[i]}{bestOf > 1 ? ` · Legs: ${legsWon[i]}` : ""}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm font-semibold text-stone-400">
            <span>501</span>
            <span>Darts: {legDarts[0]} · Turn {turns[0] + 1}</span>
            <span>Best: {best || "–"}</span>
          </div>
          <p className="mt-1 text-center text-7xl font-black text-amber-400">{scores[0]}</p>
        </>
      )}
      <p className="mt-1 min-h-[1.25rem] text-center text-sm font-semibold text-emerald-400">
        {bull ? "BULL UP · closest to the bull throws first" : two && !done ? `${name(cur)}'s turn${hint ? ` · ${hint}` : ""}` : hint}
      </p>

      {bull ? (
        <div className="mt-1 min-h-[5.5rem] space-y-1 rounded-lg border-2 border-stone-700 bg-stone-900 px-3 py-2 text-center text-sm">
          {[0, 1].map((i) => bull.d[i] !== null && (
            <p key={i} className="font-semibold text-stone-200">
              <span style={{ color: i === 0 ? "#fafafa" : "#38bdf8" }}>●</span> {name(i)}: {bull.d[i] <= 6.35 ? "Bullseye! " : bull.d[i] <= 15.9 ? "Outer bull · " : ""}{bull.d[i].toFixed(1)} mm from the centre
            </p>
          ))}
          {bull.winner === null && !bull.tie && <p className="text-amber-300">{name(bull.who)}: aim at the bull and press THROW</p>}
          {bull.tie && <p className="font-bold text-amber-300">Dead heat! Throw again.</p>}
          {bull.winner !== null && <p className="text-base font-black text-emerald-400">{name(bull.winner)} is closest and throws first!</p>}
        </div>
      ) : (
        <div className="mt-1 grid grid-cols-3 gap-2 text-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border-2 border-stone-700 bg-stone-900 py-2">
              <span className={`text-lg font-bold ${turn[i] ? "text-stone-50" : "text-stone-600"}`}>{turn[i] ? turn[i].label : "–"}</span>
              {turn[i] && <span className="ml-1 text-xs text-stone-400">{turn[i].value}</span>}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex min-h-[2.75rem] items-center justify-center" role="status">
        {celebrate && !celebrate.confettiOnly ? (
          <div key={celebrate.id} className="flex flex-col items-center rounded-xl bg-amber-400 px-4 py-1 text-center text-stone-950" style={{ animation: "pop180 .4s ease-out both" }}>
            <span className={`${celebrate.big ? "text-2xl" : "text-xl"} font-black leading-none`}>{celebrate.text}</span>
            {celebrate.sub && <span className="text-[11px] font-bold leading-tight">{celebrate.sub}</span>}
          </div>
        ) : (
          <span className="font-bold text-red-400">{msg}</span>
        )}
      </div>

      <style>{CELEBRATE_CSS}</style>
      <div className="relative mx-auto mt-1 w-full max-w-[420px]">
        <svg
          ref={svgRef}
          viewBox="0 0 440 440"
          className="block w-full cursor-crosshair"
          style={{ touchAction: "manipulation" }}
          onPointerDown={setAimFromPointer}
          role="img"
          aria-label="Dartboard. Tap to choose where to aim."
        >
          {art}
          <circle cx={aim.x} cy={aim.y} r="3" fill="#fbbf24" opacity="0.7" />
          {landings.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r="4.5" fill={l.c || "#fafafa"} stroke="#0c0a09" strokeWidth="1.5" />
          ))}
          <g ref={crossRef} transform={`translate(${aim.x} ${aim.y})`} pointerEvents="none">
            <circle r="10" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <line x1="-16" x2="16" y1="0" y2="0" stroke="#fbbf24" strokeWidth="2" />
            <line y1="-16" y2="16" x1="0" x2="0" stroke="#fbbf24" strokeWidth="2" />
          </g>
        </svg>
      </div>
      <p className="mt-1 text-center text-xs text-stone-500">Tap the board to aim. Press THROW when the crosshair is on target.</p>

      {bull && (bull.winner !== null || bull.tie) ? (
        <button onClick={bull.tie ? bullAgain : startGame} className="mt-3 w-full rounded-xl bg-emerald-600 px-4 py-4 text-xl font-black text-white hover:bg-emerald-500">
          {bull.tie ? "Throw again" : `Start game · ${name(bull.winner)} throws first →`}
        </button>
      ) : turnOver ? (
        <button onClick={nextTurn} className="mt-3 w-full rounded-xl bg-stone-700 px-4 py-4 text-xl font-black text-white hover:bg-stone-600">
          {two ? `${name(1 - cur)}'s turn →` : "Next turn →"}
        </button>
      ) : (
        <button
          onClick={throwDart}
          disabled={done || cooling || !!legBreak}
          className={`relative mt-3 w-full overflow-hidden rounded-xl px-4 py-4 text-xl font-black text-white ${cooling ? "bg-red-950" : "bg-red-600 hover:bg-red-500 active:bg-red-700"} ${done || legBreak ? "opacity-50" : ""}`}
        >
          {cooling && <span className="absolute inset-y-0 left-0 bg-red-600" style={{ animation: "coolFill 1s linear forwards" }} />}
          <span className="relative">THROW</span>
        </button>
      )}

      {/* Between legs */}
      {legBreak && !done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/70 p-4">
          {celebrate?.confettiOnly && confetti.map((c, i) => <ConfettiPiece key={i} c={c} />)}
          <div className={`w-full max-w-sm rounded-2xl border-2 bg-stone-900 p-8 text-center shadow-2xl ${legDarts[legBreak.winner] === 9 || bigFinish ? "border-amber-400" : "border-emerald-500"}`}>
            <p className={`text-3xl font-black ${legDarts[legBreak.winner] === 9 || bigFinish ? "text-amber-400" : "text-emerald-400"}`}>
              {legDarts[legBreak.winner] === 9 ? "🎯 NINE-DARTER!" : bigFinish ? (finish >= 150 ? "🔥 HUGE FINISH!" : "🔥 BIG FINISH!") : two ? `${name(legBreak.winner)} wins leg ${leg}!` : `Leg ${leg} complete!`}
            </p>
            {(legDarts[legBreak.winner] === 9 || bigFinish) && two && <p className="mt-1 text-lg font-bold text-stone-100">{name(legBreak.winner)} wins leg {leg}!</p>}
            {bigFinish && <p className="mt-1 font-bold text-amber-300">{finish} checkout</p>}
            <p className="mt-2 text-xl font-bold">{legDarts[legBreak.winner]} {legDarts[legBreak.winner] === 1 ? "dart" : "darts"}</p>
            {two && <p className="mt-1 text-2xl font-black text-stone-50">{legsWon[0]} – {legsWon[1]}</p>}
            {!two && <p className="mt-1 text-stone-300">Leg {leg} of {bestOf}</p>}
            <button onClick={nextLeg} className="mt-6 w-full rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-500">
              Next leg →
            </button>
          </div>
        </div>
      )}

      {/* End of the match */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70 p-4">
          {celebrate?.confettiOnly && confetti.map((c, i) => <ConfettiPiece key={i} c={c} />)}
          <div className={`w-full max-w-sm rounded-2xl border-2 bg-stone-900 p-8 text-center shadow-2xl ${nine || bigFinish ? "border-amber-400" : "border-emerald-500"}`}>
            {showStats ? (
              <>
                <p className="text-2xl font-black text-stone-50">Match stats</p>
                <StatsTable stats={stats} two={two} legsWon={legsWon} bestOf={bestOf} />
                <button onClick={() => setShowStats(false)} className="mt-5 w-full rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-500">Back</button>
              </>
            ) : (
              <>
                <p className={`text-4xl font-black ${nine || bigFinish ? "text-amber-400" : "text-emerald-400"}`}>
                  {nine ? "🎯 NINE-DARTER!" : finish >= 150 ? "🔥 HUGE FINISH!" : bigFinish ? "🔥 BIG FINISH!" : two ? `${name(winner)} wins!` : bestOf > 1 ? "All legs done!" : "Game shot!"}
                </p>
                {(nine || bigFinish) && two && <p className="mt-1 text-lg font-bold text-stone-100">{name(winner)} wins!</p>}
                {bigFinish && <p className="mt-1 font-bold text-amber-300">{finish} checkout</p>}
                {two && bestOf > 1 && <p className="mt-2 text-2xl font-black text-stone-50">{legsWon[0]} – {legsWon[1]}</p>}
                <p className="mt-2 text-xl font-bold">{legDarts[winner]} {legDarts[winner] === 1 ? "dart" : "darts"}{bestOf > 1 ? " in the last leg" : ""}</p>
                {!two && <p className="mt-1 text-stone-300">3-dart average: {avgOf(stats[0]).toFixed(1)} · Best leg: {best} {best === 1 ? "dart" : "darts"}</p>}
                {two && bestOf === 1 && <p className="mt-1 text-stone-300">{name(1 - winner)} had {scores[1 - winner]} left.</p>}
                <div className="mt-6 flex flex-col gap-2">
                  <button onClick={() => setShowStats(true)} className="rounded-lg bg-amber-400 px-5 py-2.5 font-bold text-stone-950 hover:bg-amber-300">Show stats</button>
                  <button onClick={() => choose(mode, bestOf)} className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-500">Play again</button>
                  <button onClick={() => { setMode(null); setPick(null); }} className="rounded-lg border border-stone-600 px-5 py-2 font-semibold text-stone-300 hover:bg-stone-800">Change mode</button>
                  <button onClick={onBack} className="rounded-lg border border-stone-600 px-5 py-2 font-semibold text-stone-300 hover:bg-stone-800">Back to menu</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const GAMES = [
  { id: "top-10", name: "The Top 10", blurb: "Name all 10. Three lives. No misses = a whitewash!", live: true },
  { id: "higher-lower", name: "Higher or Lower", blurb: "Order of Merit: is the next player ranked higher or lower?", live: true },
  { id: "lineup", name: "Line Them Up", blurb: "Put 5 players in Order of Merit order. Three lives.", live: true },
  { id: "darts501", name: "501", blurb: "Play a full leg of darts. Solo or two players on one screen.", live: true },
  { id: "guess-player", name: "Guess the Player", blurb: "Coming soon", live: false },
];

function Card({ title, sub, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`block w-full rounded-xl border-2 p-5 text-left transition ${
        disabled ? "cursor-not-allowed border-stone-800 bg-stone-900/50 opacity-50" : "border-emerald-600 bg-stone-900 hover:bg-emerald-950"
      }`}
    >
      <span className="block text-xl font-bold">{title}</span>
      {sub && <span className="text-stone-400">{sub}</span>}
    </button>
  );
}

function MainMenu({ onPlay }) {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="text-center text-4xl font-black tracking-tight">ONEEIGHTY<span className="text-red-500">.GAMES</span></h1>
      <p className="mt-2 text-center text-stone-400">Pick a game to start.</p>
      <div className="mt-8 space-y-3">
        {GAMES.map((g) => (
          <Card key={g.id} title={g.name} sub={g.blurb} disabled={!g.live} onClick={() => onPlay(g.id)} />
        ))}
      </div>
    </div>
  );
}

function QuestionMenu({ onPick }) {
  // Only show questions whose date has arrived, so future ones stay hidden until their day
  const today = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" in the visitor's local time
  const sorted = QUESTIONS.filter((q) => q.date <= today).sort((a, b) => b.date.localeCompare(a.date)); // newest first
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="text-center text-3xl font-black">The Top 10</h1>
      <p className="mt-2 text-center text-stone-400">Choose a day.</p>
      <div className="mt-8 space-y-3">
        {sorted.map((q) => (
          <Card key={q.date} title={formatDate(q.date)} onClick={() => onPick(q)} />
        ))}
      </div>
    </div>
  );
}

/* ═════════ DARTBOARD DECORATION (top-left corner) ═════════ */
const BOARD_ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
const pt = (r, deg) => { const a = (deg * Math.PI) / 180; return [r * Math.sin(a), -r * Math.cos(a)]; };
const ringPath = (r1, r2, a0, a1) => {
  const [x0, y0] = pt(r2, a0), [x1, y1] = pt(r2, a1), [x2, y2] = pt(r1, a1), [x3, y3] = pt(r1, a0);
  return `M${x0},${y0} A${r2},${r2} 0 0 1 ${x1},${y1} L${x2},${y2} A${r1},${r1} 0 0 0 ${x3},${y3} Z`;
};

function Dartboard() {
  // Board centre sits on the page corner, so only one quarter is visible. It turns once every 60 seconds (change dur="60s" to speed up or slow down).
  const BLACK = "#0c0c0c", CREAM = "#efe3c4", RED = "#dc2626", GREEN = "#16a34a", WIRE = "#d6d3d1";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-0 h-28 w-28 sm:h-44 sm:w-44 md:h-56 md:w-56">
      <svg viewBox="0 0 235 235" className="h-full w-full">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
          <circle r="232" fill="#e7e5e4" />
          <circle r="226" fill={BLACK} />
          {BOARD_ORDER.map((n, i) => {
            const a0 = i * 18 - 9, a1 = i * 18 + 9, dark = i % 2 === 0;
            return (
              <g key={n}>
                <path d={ringPath(15.9, 99, a0, a1)} fill={dark ? BLACK : CREAM} />
                <path d={ringPath(99, 107, a0, a1)} fill={dark ? RED : GREEN} />
                <path d={ringPath(107, 162, a0, a1)} fill={dark ? BLACK : CREAM} />
                <path d={ringPath(162, 170, a0, a1)} fill={dark ? RED : GREEN} />
                <line x1={pt(15.9, a0)[0]} y1={pt(15.9, a0)[1]} x2={pt(170, a0)[0]} y2={pt(170, a0)[1]} stroke={WIRE} strokeWidth="0.7" />
                <text
                  transform={`rotate(${i * 18}) translate(0,-198)`}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#fff"
                  fontSize="22"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {n}
                </text>
              </g>
            );
          })}
          {[170, 162, 107, 99].map((r) => <circle key={r} r={r} fill="none" stroke={WIRE} strokeWidth="0.8" />)}
          <circle r="15.9" fill={GREEN} stroke={WIRE} strokeWidth="0.8" />
          <circle r="6.35" fill={RED} stroke={WIRE} strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}

/* ═════════ SIMPLE PAGE NAVIGATION (Privacy / Contact) ═════════ */
const pageFromHash = () => {
  const h = window.location.hash.replace("#", "");
  return h === "privacy" || h === "contact" ? h : "";
};
const navigate = (page) => {
  try {
    window.history.pushState(null, "", page ? "#" + page : window.location.pathname + window.location.search);
  } catch (e) {
    window.location.hash = page;
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
};
const linkProps = (page) => ({
  href: page ? "#" + page : "#",
  onClick: (e) => { e.preventDefault(); navigate(page); },
});

/* ═════════ FOOTER + INFO PAGES ═════════ */
function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-stone-800 px-4 py-8 text-center">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg font-bold text-emerald-400">
        <a href="/about/" className="hover:text-emerald-300">About</a>
        <a href="/how-to-play/" className="hover:text-emerald-300">How to play</a>
        <a href="/privacy/" className="hover:text-emerald-300">Privacy</a>
        <a href="/contact/" className="hover:text-emerald-300">Contact</a>
      </div>
      <p className="mx-auto mt-4 max-w-md text-sm text-stone-500">
        <span className="text-stone-200">© {new Date().getFullYear()} {SITE_NAME} //</span> All logos and brands are
        property of their respective owners and are used for identification purposes only
      </p>
    </footer>
  );
}

function InfoPage({ title, children }) {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8">
      <a {...linkProps("")} className="relative z-10 rounded bg-stone-950/80 px-2 py-1 text-sm text-stone-300 hover:text-white">← Back to {SITE_NAME}</a>
      <h1 className="mt-4 text-3xl font-black">{title}</h1>
      <div className="mt-4 space-y-4 text-stone-300">{children}</div>
    </div>
  );
}

function Privacy() {
  const H = ({ children }) => <h2 className="pt-2 text-xl font-bold text-stone-100">{children}</h2>;
  const mail = <a className="text-emerald-400 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <InfoPage title="Privacy Policy">
      <p className="text-sm text-stone-500">Last updated: 21 October 2026</p>
      <p>
        This Privacy Policy explains how {SITE_NAME} ("we", "us", "the site") handles information when you visit and
        play our free darts trivia games. By using the site you agree to this policy.
      </p>

      <H>Information we collect</H>
      <p>
        We do not require you to create an account, and we do not ask for your name, email address or any other
        personal details to play. We do not store your game results or progress on our servers.
      </p>
      <p>
        If you contact us by email, we receive your email address and the contents of your message. We use these only
        to reply to you and do not share them.
      </p>

      <H>Technical data and hosting</H>
      <p>
        Like most websites, the site is delivered through a hosting provider and content delivery services. When you
        load a page, these providers may automatically receive technical data such as your IP address, browser type,
        device type and the pages requested. This is used to deliver the site, keep it secure and understand overall
        traffic.
      </p>

      <H>Cookies and similar technologies</H>
      <p>
        The site itself does not set cookies. It does save your best Higher or Lower streak in your browser's local
        storage so it is still there next time you play. This stays on your own device and is not sent to us; you can
        clear it at any time in your browser settings. Third parties we use, such as advertising providers, may use
        cookies, local storage, device identifiers or similar technologies to operate their services. You can control
        or delete cookies in your browser settings.
      </p>

      <H>Advertising</H>
      <p>
        We may show ads from third-party networks such as Google AdSense. These companies may use cookies and data
        about your visits to this and other websites to show ads that are relevant to you. Google's use of
        advertising cookies lets it and its partners serve ads based on your visit to this site and other sites on
        the internet. You can opt out of personalised advertising at adssettings.google.com, and learn more about
        online advertising choices at aboutads.info or youronlinechoices.eu. Where required by law, we ask for your
        consent before personalised ads or non-essential cookies are used.
      </p>

      <H>Analytics</H>
      <p>
        We use the web analytics provided by our hosting provider, Netlify, to measure how many people visit the site,
        which pages are viewed and roughly where visitors are located. This data comes from server logs, so no
        tracking code or cookies are placed on your device, and we cannot identify you from it. To count visitors,
        Netlify may process technical data such as IP addresses, which is used only to produce aggregated statistics.
        You can read more in Netlify's privacy policy at netlify.com/privacy. The information is used to understand
        how the site is used and to improve it.
      </p>

      <H>Third-party links and logos</H>
      <p>
        The site may link to other websites. We are not responsible for their content or privacy practices. Names,
        logos and brands shown on the site belong to their respective owners and are used for identification purposes
        only.
      </p>

      <H>Your rights</H>
      <p>
        Depending on where you live (for example in the EU, UK or California), you may have rights to access, correct
        or delete personal data we hold about you, to object to or restrict certain processing, and to withdraw
        consent at any time. Because we collect very little personal data, this mostly applies to emails you send us.
        To make a request, contact us at {mail}.
      </p>

      <H>Children</H>
      <p>
        The site is not directed at children under 13, and we do not knowingly collect personal information from
        children. If you believe a child has sent us personal information, contact us and we will delete it.
      </p>

      <H>Changes to this policy</H>
      <p>We may update this policy from time to time. The "last updated" date at the top shows when it last changed.</p>

      <H>Contact</H>
      <p>Questions about this policy? Email {mail}.</p>
    </InfoPage>
  );
}

function Contact() {
  return (
    <InfoPage title="Contact">
      <p>Found a mistake in a question, have a suggestion for a game, or want to get in touch? Send us an email:</p>
      <p><a className="text-xl font-bold text-emerald-400 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </InfoPage>
  );
}

/* ═════════ APP ═════════ */
export default function App() {
  const [screen, setScreen] = useState("menu"); // "menu" | "questions" | "game"
  const [question, setQuestion] = useState(null);
  const [page, setPage] = useState(pageFromHash);

  // Footer links use #privacy and #contact so each page has its own web address
  useEffect(() => {
    const sync = () => { setPage(pageFromHash()); window.scrollTo(0, 0); };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("hashchange", sync); };
  }, []);

  const back = () => setScreen(screen === "game" ? "questions" : "menu");

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-stone-950 text-stone-100">
      <Dartboard />
      <main className="relative z-10 flex-1">
        {page === "privacy" ? (
          <Privacy />
        ) : page === "contact" ? (
          <Contact />
        ) : (
          <>
            {screen !== "menu" && (
              <header className="border-b border-stone-800 px-4 py-3">
                <button onClick={back} className="rounded bg-stone-950/80 px-2 py-1 text-sm text-stone-300 hover:text-white">← Back</button>
              </header>
            )}
            {screen === "menu" && <MainMenu onPlay={(id) => setScreen({ "higher-lower": "higherlower", "guess-player": "guessplayer", lineup: "lineup", darts501: "darts501" }[id] || "questions")} />}
            {screen === "questions" && <QuestionMenu onPick={(q) => { setQuestion(q); setScreen("game"); }} />}
            {screen === "higherlower" && <HigherLower onBack={() => setScreen("menu")} />}
            {screen === "guessplayer" && <GuessPlayer onBack={() => setScreen("menu")} />}
            {screen === "lineup" && <LineUp onBack={() => setScreen("menu")} />}
            {screen === "darts501" && <Darts501 onBack={() => setScreen("menu")} />}
            {screen === "game" && <TopTen key={question.date} q={question} onBack={() => setScreen("questions")} />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
