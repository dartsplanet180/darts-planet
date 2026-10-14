import { useMemo, useRef, useState } from "react";

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
  "Jelle Klaasen", "Vincent van der Voort", "Mensur Suljovic", "Steve Evans", "Dan Olson",
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
  "Mitsuhiko Tatsunami", "Matthew Dennant", "Jesus Salate", "Gemma Hayter", "Tim Pusey",
];

/* ═════════ 2. QUESTIONS (one per day) ═════════
   date    = "YYYY-MM-DD" – shown in the menu as e.g. "12 October 2026"
   title   = the question shown once the game starts
   answers = the 10 correct players IN ORDER (1st place first).
             Each name must match a name in PLAYERS above.
   To add a day, copy one block and add it to the end of the list. */
const QUESTIONS = [
  {
    date: "2026-10-13",
    title: "2015 Premier League of Darts lineup",
    answers: [
      "Michael van Gerwen", "Phil Taylor", "Gary Anderson", "Adrian Lewis", "Peter Wright",
      "James Wade", "Dave Chisnall", "Kim Huybrechts", "Raymond van Barneveld", "Stephen Bunting",
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
          const missed = lost && !isFound;
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

      {over && (
        <div className={perfect ? "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" : ""}>
        <div
          className={
            perfect
              ? "w-full max-w-sm rounded-2xl border-2 border-amber-400 bg-stone-900 p-8 text-center shadow-2xl"
              : "mt-5 rounded-lg bg-stone-800 p-4 text-center"
          }
        >
          {perfect ? (
            <>
              <p className="text-5xl font-black text-amber-400">🎯 Whitewash!</p>
              <p className="mt-1 text-stone-300">All {total} correct without a single miss.</p>
            </>
          ) : (
            <p className="text-xl font-bold">
              {won ? `Game shot – all ${total} found!` : `Game over – you got ${found.size} of ${total}.`}
            </p>
          )}
          <button onClick={onBack} className="mt-3 rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500">
            Back to questions
          </button>
        </div>
        </div>
      )}
    </div>
  );
}

/* ═════════ MENUS ═════════ */
const GAMES = [
  { id: "top-10", name: "The Top 10", blurb: "Name all 10. Three lives. No misses = a whitewash!", live: true },
  { id: "commentary", name: "Guess the Commentary", blurb: "Coming soon", live: false },
  { id: "higher", name: "Higher or Lower", blurb: "Coming soon", live: false },
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
      <h1 className="text-center text-4xl font-black tracking-tight">Darts<span className="text-red-500">Planet</span></h1>
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
  const sorted = [...QUESTIONS].sort((a, b) => b.date.localeCompare(a.date)); // newest first
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

/* ═════════ APP ═════════ */
export default function App() {
  const [screen, setScreen] = useState("menu"); // "menu" | "questions" | "game"
  const [question, setQuestion] = useState(null);

  const back = () => setScreen(screen === "game" ? "questions" : "menu");

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {screen !== "menu" && (
        <header className="border-b border-stone-800 px-4 py-3">
          <button onClick={back} className="text-sm text-stone-400 hover:text-stone-100">← Back</button>
        </header>
      )}
      {screen === "menu" && <MainMenu onPlay={() => setScreen("questions")} />}
      {screen === "questions" && <QuestionMenu onPick={(q) => { setQuestion(q); setScreen("game"); }} />}
      {screen === "game" && <TopTen key={question.date} q={question} onBack={() => setScreen("questions")} />}
    </div>
  );
}
