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
  "Mitsuhiko Tatsunami", "Matthew Dennant", "Jesus Salate", "Gemma Hayter", "Tim Pusey", "Henry Coates", "Jimmy van Schie",
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
    date: "2026-10-21",
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
    date: "2026-10-22",
    title: "Highest checkout % since AFTER the 2026 PDC World Darts Championship in PDC TV Ranking events (Min 20 throws)",
    answers: [
      "Callan Rydz", "Mensur Suljović", "Ron Meulenkamp", "Beau Greaves", "Henry Coates",
      "Jeffrey de Graaf", "Jimmy van Schie", "Ryan Joyce", "Christian Kist", "Stefan Bellmont",
    ],
  },
];

/* ═════════ HELPERS ═════════ */
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/’/g, "'").toLowerCase();
const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/* ═════════ AUTOCOMPLETE ═════════ */
function SearchBox({ onPick, disabled, exclude }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef(null);

  const matches = useMemo(() => {
    const t = norm(text.trim());
    if (!t) return [];
    return PLAYERS.filter((n) => !exclude.has(n) && norm(n).includes(t)).slice(0, 6);
  }, [text, exclude]);

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
const LAST_UPDATED = "As of: October 18, 2026. Updated after ET15.";
const OOM_RAW = [
  "Luke Littler", "Luke Humphries", "Gian van Veen", "Gerwyn Price", "Jonny Clayton",
  "James Wade", "Danny Noppert", "Josh Rock", "Gary Anderson", "Michael van Gerwen",
  "Nathan Aspinall", "Wessel Nijman", "Stephen Bunting", "Ross Smith", "Ryan Searle",
  "Jermaine Wattimena", "Chris Dobey", "Luke Woodhouse", "Krzysztof Ratajski", "Dirk van Duijvenbode",
  "Damon Heta", "Rob Cross", "Martin Schindler", "Ryan Joyce", "Cameron Menzies",
  "Kevin Doets", "Andrew Gilding", "Niels Zonneveld", "Daryl Gurney", "Dave Chisnall",
  "Joe Cullen", "William O'Connor", "Ritchie Edhouse", "Mike De Decker", "Ricardo Pietreczko",
  "Niko Springer", "Michael Smith", "Peter Wright", "Callan Rydz", "=Justin Hood",
  "Jeffrey de Graaf", "Mickey Mansell", "Martin Lukeman", "Karel Sedlacek", "Raymond van Barneveld",
  "James Hurrell", "Madars Razma", "Scott Williams", "Gabriel Clemens", "Connor Scutt",
  "Brendan Dolan", "Sebastian Bialecki", "Ricky Evans", "Mensur Suljovic", "Kim Huybrechts",
  "Keane Barry", "Ian White", "Richard Veenstra", "Dimitri Van den Bergh", "Bradley Brooks",
  "Alan Soutar", "Rob Owen", "Ryan Meikle", "Lukas Wenig", "Nick Kenny",
  "Max Hopp", "Mario Vandenbogaerde", "Cam Crabtree", "Thibault Tricole", "Cristo Reyes",
  "Wesley Plaisier", "Maik Kuivenhoven", "Adam Lipscombe", "Tom Bissell", "Beau Greaves",
  "Darryl Pilgrim", "Cor Dekker", "Dominik Gruellich", "Christian Kist", "Tom Sykes",
  "Andy Boulton", "Jim Long", "Charlie Manby", "=Oskar Lukasiak", "Joe Hunt",
  "Jimmy van Schie", "Thomas Lovely", "Leon Weber", "Darius Labanauskas", "Marvin van Velzen",
  "Tavis Dudeney", "Viktor Tingstrom", "Shane McGuirk", "Alexander Merkx", "Henry Coates",
  "Adam Gawlas", "Kai Gotthardt", "Adam Paxton", "Greg Ritchie", "Owen Bates",
  "David Sharp", "Jeffrey De Zwaan", "Mervyn King", "Adam Warner", "Jurjen van der Velde",
  "Martijn Dragt", "Stephen Burton", "Dennie Olde Kalter", "Chris Landman", "Benjamin Pratnemer",
  "Tommy Morris", "Jeffrey Sparidaans", "Tyler Thorpe", "Sietse Lap", "Tommy Lishman",
  "Niall Culleton", "Scott Waites", "Jack Tweddell", "Arno Merk", "Stefan Bellmont",
  "=Maximilian Czerwinski", "Rhys Griffin", "=Adam Leek", "Derek Coulson", "Steve Lennon",
  "Stephen Rosney", "Stefaan Henderyck", "Tytus Kanik", "Harry Ward", "Samuel Price",
  "Carl Sneyd", "Nathan Potter", "Daniel Ayres", "Yorick Hofkens", "Pascal Rupprecht",
  "Andy Baetens", "Daniel Klose", "Lewis Pride", "Rusty-Jake Rodriguez", "Marvin Kraft",
  "=Paul Krohne", "Boris Krcmar", "Jonas Masalin", "=Michael Unterbuchner", "Jan Schmidt",
  "=Patrik Kovacs", "Pero Ljubic", "Christopher Wickenden", "Johan Engstrom", "Nandor Major",
  "=Dragutin Horvat", "=Marcel Hausotter",
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

const GAMES = [
  { id: "top-10", name: "The Top 10", blurb: "Name all 10. Three lives. No misses = a whitewash!", live: true },
  { id: "higher-lower", name: "Higher or Lower", blurb: "Order of Merit: is the next player ranked higher or lower?", live: true },
  { id: "commentary", name: "Guess the Commentary", blurb: "Coming soon", live: false },
  { id: "soon", name: "Coming soon", blurb: "Another game is on its way", live: false },
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
      <div className="flex justify-center gap-6 text-lg font-bold text-emerald-400">
        <a {...linkProps("privacy")} className="hover:text-emerald-300">Privacy</a>
        <a {...linkProps("contact")} className="hover:text-emerald-300">Contact</a>
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
      <p className="text-sm text-stone-500">Last updated: 14 October 2026</p>
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
        The site itself does not set cookies. However, third parties we use, such as advertising and analytics
        providers, may use cookies, local storage, device identifiers or similar technologies to operate their
        services. You can control or delete cookies in your browser settings.
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
        We may use analytics tools to measure how many people visit the site and which games are played. This
        information is aggregated and used to improve the site.
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
            {screen === "menu" && <MainMenu onPlay={(id) => setScreen(id === "higher-lower" ? "higherlower" : "questions")} />}
            {screen === "questions" && <QuestionMenu onPick={(q) => { setQuestion(q); setScreen("game"); }} />}
            {screen === "higherlower" && <HigherLower onBack={() => setScreen("menu")} />}
            {screen === "game" && <TopTen key={question.date} q={question} onBack={() => setScreen("questions")} />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
