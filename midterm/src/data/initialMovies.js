/**
 * CineVault Seed Dataset
 * 
 * Contains exactly 105 curated international cinema masterpieces
 * fulfilling the midterm requirement of "at least 100 initial records for the main list".
 * 
 * Each record contains complete metadata:
 * id, title, originalTitle, director, year, decade, country, genres,
 * runtime, rating, festivalAwards, synopsis, cast, language, posterUrl, curatorNotes.
 */

export const INITIAL_MOVIES = [
  {
    "id": "cine-001",
    "title": "Parasite",
    "originalTitle": "기생충",
    "director": "Bong Joon-ho",
    "year": 2019,
    "country": "South Korea",
    "genres": [
      "Drama",
      "Thriller",
      "Dark Comedy"
    ],
    "runtime": 132,
    "rating": 8.5,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "Academy Award for Best Picture"
    ],
    "synopsis": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "cast": [
      "Song Kang-ho",
      "Lee Sun-kyun",
      "Cho Yeo-jeong",
      "Choi Woo-shik"
    ],
    "language": "Korean",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A brilliant, razor-sharp architectural critique of global capitalism and class stratification.",
    "decade": "2010s",
    "featured": true,
    "addedAt": "2023-12-31T19:00:00.000Z"
  },
  {
    "id": "cine-002",
    "title": "Drive My Car",
    "originalTitle": "ドライブ・マイ・カー",
    "director": "Ryusuke Hamaguchi",
    "year": 2021,
    "country": "Japan",
    "genres": [
      "Drama"
    ],
    "runtime": 179,
    "rating": 8.1,
    "festivalAwards": [
      "Best Screenplay (Cannes)",
      "Academy Award for Best International Feature"
    ],
    "synopsis": "An aging theater director directs a multilingual production of Uncle Vanya in Hiroshima while confronting grief alongside his stoic young chauffeur.",
    "cast": [
      "Hidetoshi Nishijima",
      "Toko Miura",
      "Masaki Okada"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A quiet, profound masterclass in grief, communication, and human endurance.",
    "decade": "2020s",
    "featured": true,
    "addedAt": "2024-01-01T19:00:00.000Z"
  },
  {
    "id": "cine-003",
    "title": "Portrait of a Lady on Fire",
    "originalTitle": "Portrait de la jeune fille en feu",
    "director": "Céline Sciamma",
    "year": 2019,
    "country": "France",
    "genres": [
      "Drama",
      "Romance",
      "History"
    ],
    "runtime": 122,
    "rating": 8.3,
    "festivalAwards": [
      "Queer Palm (Cannes)",
      "Best Screenplay (Cannes)"
    ],
    "synopsis": "On an isolated island in Brittany at the end of the eighteenth century, a female painter is commissioned to paint a wedding portrait of a reluctant young woman.",
    "cast": [
      "Noémie Merlant",
      "Adèle Haenel",
      "Luàna Bajrami"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "An intoxicating meditation on the female gaze, artistic creation, and memory.",
    "decade": "2010s",
    "featured": true,
    "addedAt": "2024-01-02T19:00:00.000Z"
  },
  {
    "id": "cine-004",
    "title": "Anatomy of a Fall",
    "originalTitle": "Anatomie d'une chute",
    "director": "Justine Triet",
    "year": 2023,
    "country": "France",
    "genres": [
      "Drama",
      "Mystery",
      "Crime"
    ],
    "runtime": 151,
    "rating": 8.2,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "Golden Globe for Best Foreign Film"
    ],
    "synopsis": "A woman is suspected of murder after her husband's suspicious death in the snow in an isolated chalet, leaving their blind son as the sole witness.",
    "cast": [
      "Sandra Hüller",
      "Swann Arlaud",
      "Milo Machado-Graner"
    ],
    "language": "French, English, German",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Anatomy of a marriage dissected with judicial precision and breathtaking performances.",
    "decade": "2020s",
    "featured": true,
    "addedAt": "2024-01-03T19:00:00.000Z"
  },
  {
    "id": "cine-005",
    "title": "The Zone of Interest",
    "originalTitle": "The Zone of Interest",
    "director": "Jonathan Glazer",
    "year": 2023,
    "country": "United Kingdom",
    "genres": [
      "Drama",
      "History",
      "War"
    ],
    "runtime": 105,
    "rating": 8,
    "festivalAwards": [
      "Grand Prix (Cannes)",
      "Academy Award for Best Sound"
    ],
    "synopsis": "Auschwitz commandant Rudolf Höss and his wife Hedwig strive to build an idyllic dream life for their family in a house and garden right next to the concentration camp.",
    "cast": [
      "Christian Friedel",
      "Sandra Hüller",
      "Johann Karthaus"
    ],
    "language": "German",
    "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A horrifyingly clinical examination of the banality of evil conveyed through masterly off-screen sound design.",
    "decade": "2020s",
    "featured": true,
    "addedAt": "2024-01-04T19:00:00.000Z"
  },
  {
    "id": "cine-006",
    "title": "Past Lives",
    "originalTitle": "Past Lives",
    "director": "Celine Song",
    "year": 2023,
    "country": "United States",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 105,
    "rating": 8.1,
    "festivalAwards": [
      "Independent Spirit Award for Best Feature",
      "Berlin Official Selection"
    ],
    "synopsis": "Nora and Hae Sung, two deeply connected childhood friends, are wrest apart after Nora's family emigrates from South Korea. Two decades later, they reunite in New York.",
    "cast": [
      "Greta Lee",
      "Teo Yoo",
      "John Magaro"
    ],
    "language": "Korean, English",
    "posterUrl": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A tender, mature look at longing, destiny, and the divergent paths life takes.",
    "decade": "2020s",
    "featured": true,
    "addedAt": "2024-01-05T19:00:00.000Z"
  },
  {
    "id": "cine-007",
    "title": "Everything Everywhere All at Once",
    "originalTitle": "Everything Everywhere All at Once",
    "director": "Daniel Kwan, Daniel Scheinert",
    "year": 2022,
    "country": "United States",
    "genres": [
      "Sci-Fi",
      "Action",
      "Comedy"
    ],
    "runtime": 139,
    "rating": 8.4,
    "festivalAwards": [
      "7 Academy Awards including Best Picture",
      "SXSW Premiere"
    ],
    "synopsis": "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    "cast": [
      "Michelle Yeoh",
      "Ke Huy Quan",
      "Stephanie Hsu",
      "Jamie Lee Curtis"
    ],
    "language": "English, Mandarin, Cantonese",
    "posterUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Maximalist, deeply emotional sci-fi existentialism grounded in generational empathy.",
    "decade": "2020s",
    "featured": false,
    "addedAt": "2024-01-06T19:00:00.000Z"
  },
  {
    "id": "cine-008",
    "title": "Roma",
    "originalTitle": "Roma",
    "director": "Alfonso Cuarón",
    "year": 2018,
    "country": "Mexico",
    "genres": [
      "Drama"
    ],
    "runtime": 135,
    "rating": 8.3,
    "festivalAwards": [
      "Golden Lion (Venice)",
      "Academy Award for Best Director"
    ],
    "synopsis": "A year in the life of a middle-class family's live-in housekeeper in Mexico City during the turbulent early 1970s.",
    "cast": [
      "Yalitza Aparicio",
      "Marina de Tavira",
      "Diego Cortina Autrey"
    ],
    "language": "Spanish, Mixtec",
    "posterUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Cuarón's monochrome love letter to the women who raised him, captured in breathtaking pan shots.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-01-07T19:00:00.000Z"
  },
  {
    "id": "cine-009",
    "title": "Cold War",
    "originalTitle": "Zimna wojna",
    "director": "Paweł Pawlikowski",
    "year": 2018,
    "country": "Poland",
    "genres": [
      "Drama",
      "Romance",
      "Music"
    ],
    "runtime": 89,
    "rating": 8.1,
    "festivalAwards": [
      "Best Director (Cannes)",
      "European Film Award for Best Film"
    ],
    "synopsis": "A passionate love story between two people of different backgrounds and temperaments, who are fatally mismatched and yet condemned to each other in 1950s Europe.",
    "cast": [
      "Joanna Kulig",
      "Tomasz Kot",
      "Borys Szyc"
    ],
    "language": "Polish, French",
    "posterUrl": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "An elliptical, jazz-soaked romance framed in gorgeous Academy aspect ratio.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-01-08T19:00:00.000Z"
  },
  {
    "id": "cine-010",
    "title": "The Handmaiden",
    "originalTitle": "아가씨",
    "director": "Park Chan-wook",
    "year": 2016,
    "country": "South Korea",
    "genres": [
      "Thriller",
      "Drama",
      "Romance"
    ],
    "runtime": 145,
    "rating": 8.4,
    "festivalAwards": [
      "Vulcan Award (Cannes)",
      "BAFTA Best Film Not in English"
    ],
    "synopsis": "A woman is hired as a handmaiden to an eccentric Japanese heiress, but secretly she is involved in a plot to defraud her of her vast fortune.",
    "cast": [
      "Kim Min-hee",
      "Kim Tae-ri",
      "Ha Jung-woo",
      "Cho Jin-woong"
    ],
    "language": "Korean, Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A sumptuous, labyrinthine erotic thriller executed with immaculate visual flair.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-01-09T19:00:00.000Z"
  },
  {
    "id": "cine-011",
    "title": "Spirited Away",
    "originalTitle": "千と千尋の神隠し",
    "director": "Hayao Miyazaki",
    "year": 2001,
    "country": "Japan",
    "genres": [
      "Animation",
      "Adventure",
      "Fantasy"
    ],
    "runtime": 125,
    "rating": 8.6,
    "festivalAwards": [
      "Golden Bear (Berlin)",
      "Academy Award for Best Animated Feature"
    ],
    "synopsis": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    "cast": [
      "Rumi Hiiragi",
      "Miyu Irino",
      "Mari Natsuki"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Studio Ghibli's boundless magnum opus on courage, identity, and folklore.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-10T19:00:00.000Z"
  },
  {
    "id": "cine-012",
    "title": "In the Mood for Love",
    "originalTitle": "花樣年華",
    "director": "Wong Kar-wai",
    "year": 2000,
    "country": "Hong Kong",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 98,
    "rating": 8.5,
    "festivalAwards": [
      "Best Actor & Technical Grand Prize (Cannes)",
      "César for Best Foreign Film"
    ],
    "synopsis": "Two neighbors in 1962 Hong Kong discover that their respective spouses are having an affair, forming a delicate bond while swearing not to be like them.",
    "cast": [
      "Tony Leung Chiu-wai",
      "Maggie Cheung",
      "Rebecca Pan"
    ],
    "language": "Cantonese, Shanghainese",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Perhaps the most visually intoxicating and achingly romantic film in cinema history.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-11T19:00:00.000Z"
  },
  {
    "id": "cine-013",
    "title": "Mulholland Drive",
    "originalTitle": "Mulholland Drive",
    "director": "David Lynch",
    "year": 2001,
    "country": "United States",
    "genres": [
      "Mystery",
      "Drama",
      "Thriller"
    ],
    "runtime": 147,
    "rating": 8.3,
    "festivalAwards": [
      "Best Director (Cannes)",
      "Sight & Sound Top Films"
    ],
    "synopsis": "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues in a surreal Los Angeles.",
    "cast": [
      "Naomi Watts",
      "Laura Harring",
      "Justin Theroux"
    ],
    "language": "English, Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Lynch's mesmerizing dreamscape unraveling the toxic mythos of Hollywood ambition.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-12T19:00:00.000Z"
  },
  {
    "id": "cine-014",
    "title": "There Will Be Blood",
    "originalTitle": "There Will Be Blood",
    "director": "Paul Thomas Anderson",
    "year": 2007,
    "country": "United States",
    "genres": [
      "Drama"
    ],
    "runtime": 158,
    "rating": 8.6,
    "festivalAwards": [
      "Silver Bear for Best Director (Berlin)",
      "2 Academy Awards"
    ],
    "synopsis": "A ruthless silver miner turned oil prospector journeys to California during the turn-of-the-century oil boom, relentlessly pursuing wealth at the expense of his soul.",
    "cast": [
      "Daniel Day-Lewis",
      "Paul Dano",
      "Kevin J. O'Connor"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A titanic, terrifying study of American ambition, capitalism, and fanaticism.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-13T19:00:00.000Z"
  },
  {
    "id": "cine-015",
    "title": "Pan's Labyrinth",
    "originalTitle": "El laberinto del fauno",
    "director": "Guillermo del Toro",
    "year": 2006,
    "country": "Spain",
    "genres": [
      "Fantasy",
      "Drama",
      "War"
    ],
    "runtime": 118,
    "rating": 8.4,
    "festivalAwards": [
      "3 Academy Awards",
      "BAFTA Best Film Not in English"
    ],
    "synopsis": "In post-Civil War Spain of 1944, a young girl fascinated by fairy tales is sent to live with her cruel stepfather and encounters an ancient faun in an overgrown maze.",
    "cast": [
      "Ivana Baquero",
      "Sergi López",
      "Maribel Verdú",
      "Doug Jones"
    ],
    "language": "Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Del Toro's dark fairy tale harmonizing childhood wonder with the brutal realities of fascism.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-14T19:00:00.000Z"
  },
  {
    "id": "cine-016",
    "title": "City of God",
    "originalTitle": "Cidade de Deus",
    "director": "Fernando Meirelles, Kátia Lund",
    "year": 2002,
    "country": "Brazil",
    "genres": [
      "Crime",
      "Drama"
    ],
    "runtime": 130,
    "rating": 8.6,
    "festivalAwards": [
      "Cannes Official Selection",
      "4 Academy Award Nominations"
    ],
    "synopsis": "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other becomes an ambitious kingpin in a ferocious turf war.",
    "cast": [
      "Alexandre Rodrigues",
      "Leandro Firmino",
      "Phellipe Haagensen"
    ],
    "language": "Portuguese",
    "posterUrl": "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Kinetic, pulse-pounding editing that changed international crime cinema forever.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-15T19:00:00.000Z"
  },
  {
    "id": "cine-017",
    "title": "Amélie",
    "originalTitle": "Le Fabuleux Destin d'Amélie Poulain",
    "director": "Jean-Pierre Jeunet",
    "year": 2001,
    "country": "France",
    "genres": [
      "Comedy",
      "Romance"
    ],
    "runtime": 122,
    "rating": 8.3,
    "festivalAwards": [
      "Crystal Globe (Karlovy Vary)",
      "4 César Awards"
    ],
    "synopsis": "Amélie is an innocent and naive girl in Paris with her own sense of justice who decides to secretly help those around her find happiness while falling in love herself.",
    "cast": [
      "Audrey Tautou",
      "Mathieu Kassovitz",
      "Rufus"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A whimsical, sepia-toned celebration of human quirks and Parisian charm.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-16T19:00:00.000Z"
  },
  {
    "id": "cine-018",
    "title": "The White Ribbon",
    "originalTitle": "Das weiße Band",
    "director": "Michael Haneke",
    "year": 2009,
    "country": "Germany",
    "genres": [
      "Drama",
      "Mystery"
    ],
    "runtime": 144,
    "rating": 8.1,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "Golden Globe for Best Foreign Film"
    ],
    "synopsis": "Strange, unexplained incidents plague a small protestant village in Northern Germany on the eve of World War I, hinting at a darker rot taking root in the children.",
    "cast": [
      "Christian Friedel",
      "Ernst Jacobi",
      "Leonie Benesch"
    ],
    "language": "German",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A bone-chilling, monochromatic parable on patriarchal abuse and the seeds of fascism.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-17T19:00:00.000Z"
  },
  {
    "id": "cine-019",
    "title": "No Country for Old Men",
    "originalTitle": "No Country for Old Men",
    "director": "Joel Coen, Ethan Coen",
    "year": 2007,
    "country": "United States",
    "genres": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "runtime": 122,
    "rating": 8.5,
    "festivalAwards": [
      "4 Academy Awards including Best Picture",
      "Cannes Official Selection"
    ],
    "synopsis": "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
    "cast": [
      "Tommy Lee Jones",
      "Javier Bardem",
      "Josh Brolin",
      "Woody Harrelson"
    ],
    "language": "English, Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A pitch-black neo-western existential thriller featuring cinema's most terrifying antagonist.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-18T19:00:00.000Z"
  },
  {
    "id": "cine-020",
    "title": "Caché (Hidden)",
    "originalTitle": "Caché",
    "director": "Michael Haneke",
    "year": 2005,
    "country": "France",
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "runtime": 117,
    "rating": 8,
    "festivalAwards": [
      "Best Director (Cannes)",
      "FIPRESCI Prize (Cannes)"
    ],
    "synopsis": "A married couple is terrorized by a series of surveillance videotapes left on their doorstep depicting their own home, dredging up buried childhood guilt.",
    "cast": [
      "Daniel Auteuil",
      "Juliette Binoche",
      "Maurice Bénichou"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A chilling exploration of bourgeois denial and post-colonial collective guilt.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-01-19T19:00:00.000Z"
  },
  {
    "id": "cine-021",
    "title": "Chungking Express",
    "originalTitle": "重慶森林",
    "director": "Wong Kar-wai",
    "year": 1994,
    "country": "Hong Kong",
    "genres": [
      "Drama",
      "Romance",
      "Comedy"
    ],
    "runtime": 102,
    "rating": 8.3,
    "festivalAwards": [
      "Golden Horse for Best Picture",
      "Stockholm FIPRESCI Prize"
    ],
    "synopsis": "Two melancholic Hong Kong policemen fall in love: one with a mysterious underworld figure in a blonde wig, the other with a quirky snack bar attendant.",
    "cast": [
      "Takeshi Kaneshiro",
      "Brigitte Lin",
      "Tony Leung Chiu-wai",
      "Faye Wong"
    ],
    "language": "Cantonese, Mandarin, English",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A vibrant, pop-art love letter to urban loneliness, canned pineapples, and California Dreamin'.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-20T19:00:00.000Z"
  },
  {
    "id": "cine-022",
    "title": "Pulp Fiction",
    "originalTitle": "Pulp Fiction",
    "director": "Quentin Tarantino",
    "year": 1994,
    "country": "United States",
    "genres": [
      "Crime",
      "Drama"
    ],
    "runtime": 154,
    "rating": 8.7,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "Academy Award for Best Original Screenplay"
    ],
    "synopsis": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    "cast": [
      "John Travolta",
      "Uma Thurman",
      "Samuel L. Jackson",
      "Bruce Willis"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A seismic cultural milestone that redefined non-linear storytelling in 1990s cinema.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-21T19:00:00.000Z"
  },
  {
    "id": "cine-023",
    "title": "La Haine",
    "originalTitle": "La Haine",
    "director": "Mathieu Kassovitz",
    "year": 1995,
    "country": "France",
    "genres": [
      "Drama",
      "Crime"
    ],
    "runtime": 98,
    "rating": 8.4,
    "festivalAwards": [
      "Best Director (Cannes)",
      "César for Best Film"
    ],
    "synopsis": "Three young friends from immigrant banlieues navigate 24 hours of simmering tension and police brutality following a violent riot in the outskirts of Paris.",
    "cast": [
      "Vincent Cassel",
      "Hubert Koundé",
      "Saïd Taghmaoui"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Raw, blistering street-level energy in stark monochrome that remains hauntingly relevant.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-22T19:00:00.000Z"
  },
  {
    "id": "cine-024",
    "title": "Taste of Cherry",
    "originalTitle": "طعم گیلاس",
    "director": "Abbas Kiarostami",
    "year": 1997,
    "country": "Iran",
    "genres": [
      "Drama"
    ],
    "runtime": 95,
    "rating": 8.1,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "National Society of Film Critics Award"
    ],
    "synopsis": "A middle-aged Iranian man drives through the dusty hills outside Tehran looking for someone willing to bury him after he commits suicide.",
    "cast": [
      "Homayoun Ershadi",
      "Abdolrahman Bagheri",
      "Afshin Khorshid Bakhtiari"
    ],
    "language": "Persian",
    "posterUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A deceptively simple, philosophical journey asserting the precious, tactile pleasures of living.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-23T19:00:00.000Z"
  },
  {
    "id": "cine-025",
    "title": "Fargo",
    "originalTitle": "Fargo",
    "director": "Joel Coen, Ethan Coen",
    "year": 1996,
    "country": "United States",
    "genres": [
      "Crime",
      "Thriller",
      "Dark Comedy"
    ],
    "runtime": 98,
    "rating": 8.3,
    "festivalAwards": [
      "Best Director (Cannes)",
      "2 Academy Awards"
    ],
    "synopsis": "A pregnant Minnesota police chief investigates homicides that stem from a desperate car salesman hiring two inept criminals to kidnap his wife.",
    "cast": [
      "Frances McDormand",
      "William H. Macy",
      "Steve Buscemi",
      "Peter Stormare"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A snowy Midwestern crime tragicomedy illuminated by McDormand's warm, indelible humanity.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-24T19:00:00.000Z"
  },
  {
    "id": "cine-026",
    "title": "Three Colors: Blue",
    "originalTitle": "Trois couleurs: Bleu",
    "director": "Krzysztof Kieślowski",
    "year": 1993,
    "country": "France",
    "genres": [
      "Drama",
      "Mystery",
      "Music"
    ],
    "runtime": 98,
    "rating": 8.2,
    "festivalAwards": [
      "Golden Lion (Venice)",
      "Volpi Cup for Best Actress"
    ],
    "synopsis": "A grieving woman attempts to sever all emotional ties and isolate herself from society following the accidental deaths of her famous composer husband and daughter.",
    "cast": [
      "Juliette Binoche",
      "Benoît Régent",
      "Florence Pernel"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The first installment of the Three Colors trilogy, exploring emotional liberty through sensory majesty.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-25T19:00:00.000Z"
  },
  {
    "id": "cine-027",
    "title": "Three Colors: Red",
    "originalTitle": "Trois couleurs: Rouge",
    "director": "Krzysztof Kieślowski",
    "year": 1994,
    "country": "France",
    "genres": [
      "Drama",
      "Mystery",
      "Romance"
    ],
    "runtime": 99,
    "rating": 8.3,
    "festivalAwards": [
      "Cannes Official Selection",
      "3 Academy Award Nominations"
    ],
    "synopsis": "A part-time model crosses paths with a retired judge who spends his days wiretapping his neighbors' private phone conversations.",
    "cast": [
      "Irène Jacob",
      "Jean-Louis Trintignant",
      "Frédérique Feder"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Kieślowski's sublime final testament on synchronicity, fraternity, and emotional healing.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-26T19:00:00.000Z"
  },
  {
    "id": "cine-028",
    "title": "Close-Up",
    "originalTitle": "کلوزآپ ، نمای نزدیک",
    "director": "Abbas Kiarostami",
    "year": 1990,
    "country": "Iran",
    "genres": [
      "Documentary",
      "Drama"
    ],
    "runtime": 98,
    "rating": 8.4,
    "festivalAwards": [
      "Locarno FIPRESCI Prize",
      "Sight & Sound Top 20 All-Time"
    ],
    "synopsis": "The real-life story of Hossain Sabzian, an impoverished cinephile who impersonated the famous director Mohsen Makhmalbaf, reenacted by the actual people involved.",
    "cast": [
      "Hossain Sabzian",
      "Mohsen Makhmalbaf",
      "Abolfazl Ahankhah"
    ],
    "language": "Persian",
    "posterUrl": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A miraculous hybrid of fiction and reality questioning cinema, empathy, and social class.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-27T19:00:00.000Z"
  },
  {
    "id": "cine-029",
    "title": "Beau Travail",
    "originalTitle": "Beau Travail",
    "director": "Claire Denis",
    "year": 1999,
    "country": "France",
    "genres": [
      "Drama"
    ],
    "runtime": 92,
    "rating": 8,
    "festivalAwards": [
      "Berlin Special Mention",
      "César Award for Best Cinematography"
    ],
    "synopsis": "An ex-Foreign Legion officer recalls his once glorious life in Djibouti, consumed by destructive jealousy toward a promising recruit.",
    "cast": [
      "Denis Lavant",
      "Michel Subor",
      "Grégoire Colin"
    ],
    "language": "French, Italian, Russian",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Hypnotic, poetic study of masculinity and colonial ghosts set to rhythm and ending with an iconic dance.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-28T19:00:00.000Z"
  },
  {
    "id": "cine-030",
    "title": "Eyes Wide Shut",
    "originalTitle": "Eyes Wide Shut",
    "director": "Stanley Kubrick",
    "year": 1999,
    "country": "United States",
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "runtime": 159,
    "rating": 8.1,
    "festivalAwards": [
      "Venice Film Critic Award",
      "French Syndicate of Cinema Critics"
    ],
    "synopsis": "A New York doctor embarks on a night-long sexual and moral odyssey after his wife admits that she once contemplated having an extramarital affair.",
    "cast": [
      "Tom Cruise",
      "Nicole Kidman",
      "Sydney Pollack",
      "Marie Richardson"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Kubrick's intoxicating and enigmatic final swan song into dreams, secrecy, and marriage.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-01-29T19:00:00.000Z"
  },
  {
    "id": "cine-031",
    "title": "Apocalypse Now",
    "originalTitle": "Apocalypse Now",
    "director": "Francis Ford Coppola",
    "year": 1979,
    "country": "United States",
    "genres": [
      "War",
      "Drama",
      "Mystery"
    ],
    "runtime": 147,
    "rating": 8.7,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "2 Academy Awards"
    ],
    "synopsis": "A US Army captain serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.",
    "cast": [
      "Martin Sheen",
      "Marlon Brando",
      "Robert Duvall",
      "Dennis Hopper"
    ],
    "language": "English, French, Vietnamese",
    "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A psychedelic descent into madness and moral collapse along the Nung River.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-01-30T19:00:00.000Z"
  },
  {
    "id": "cine-032",
    "title": "Stalker",
    "originalTitle": "Сталкер",
    "director": "Andrei Tarkovsky",
    "year": 1979,
    "country": "Soviet Union",
    "genres": [
      "Sci-Fi",
      "Drama"
    ],
    "runtime": 162,
    "rating": 8.5,
    "festivalAwards": [
      "Prize of the Ecumenical Jury (Cannes)",
      "Luchino Visconti Award"
    ],
    "synopsis": "A guide leads two men through a hazardous, post-apocalyptic wasteland known as the Zone to find the Room, which grants a person's innermost desires.",
    "cast": [
      "Alexander Kaidanovsky",
      "Anatoly Solonitsyn",
      "Nikolai Grinko"
    ],
    "language": "Russian",
    "posterUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Tarkovsky's transcendent, slow-burning philosophical treatise on faith, hope, and human longing.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-01-31T19:00:00.000Z"
  },
  {
    "id": "cine-033",
    "title": "Solaris",
    "originalTitle": "Солярис",
    "director": "Andrei Tarkovsky",
    "year": 1972,
    "country": "Soviet Union",
    "genres": [
      "Sci-Fi",
      "Drama",
      "Mystery"
    ],
    "runtime": 167,
    "rating": 8.2,
    "festivalAwards": [
      "Grand Prix Spécial (Cannes)",
      "FIPRESCI Prize"
    ],
    "synopsis": "A psychologist is sent to a space station orbiting a mysterious ocean planet whose consciousness manifests the crew's deepest repressed memories.",
    "cast": [
      "Donatas Banionis",
      "Natalya Bondarchuk",
      "Jüri Järvet"
    ],
    "language": "Russian",
    "posterUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "An emotional, spiritual counterpoint to Kubrick's 2001 that delves into human remorse.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-02-01T19:00:00.000Z"
  },
  {
    "id": "cine-034",
    "title": "Mirror",
    "originalTitle": "Зеркало",
    "director": "Andrei Tarkovsky",
    "year": 1975,
    "country": "Soviet Union",
    "genres": [
      "Drama",
      "Biography"
    ],
    "runtime": 107,
    "rating": 8.3,
    "festivalAwards": [
      "David di Donatello Luchino Visconti",
      "Sight & Sound Top 10"
    ],
    "synopsis": "A dying poet remembers his past: his childhood, his mother, the war, and personal moments that tell the history of twentieth-century Russia.",
    "cast": [
      "Margarita Terekhova",
      "Ignat Daniltsev",
      "Larisa Tarkovskaya"
    ],
    "language": "Russian, Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A pure stream of poetic autobiographical memory, weaving dreams, archival reels, and verses.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-02-02T19:00:00.000Z"
  },
  {
    "id": "cine-035",
    "title": "Taxi Driver",
    "originalTitle": "Taxi Driver",
    "director": "Martin Scorsese",
    "year": 1976,
    "country": "United States",
    "genres": [
      "Crime",
      "Drama"
    ],
    "runtime": 114,
    "rating": 8.6,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "4 Academy Award Nominations"
    ],
    "synopsis": "A mentally unstable veteran works as a nighttime taxi driver in New York City, where perceived decadence feeds his urge for violent action.",
    "cast": [
      "Robert De Niro",
      "Jodie Foster",
      "Cybill Shepherd",
      "Harvey Keitel"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Scorsese and Schrader's neon-drenched exploration of urban alienation and vigilante psychosis.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-02-03T19:00:00.000Z"
  },
  {
    "id": "cine-036",
    "title": "Raging Bull",
    "originalTitle": "Raging Bull",
    "director": "Martin Scorsese",
    "year": 1980,
    "country": "United States",
    "genres": [
      "Biography",
      "Drama",
      "Sport"
    ],
    "runtime": 129,
    "rating": 8.4,
    "festivalAwards": [
      "2 Academy Awards including Best Actor",
      "Golden Globe Best Actor"
    ],
    "synopsis": "The life of boxer Jake LaMotta, whose violence and temper lead him to the top in the ring but destroys his life outside it.",
    "cast": [
      "Robert De Niro",
      "Cathy Moriarty",
      "Joe Pesci"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Operatic black-and-white boxing choreography capturing raw self-destruction and Catholic guilt.",
    "decade": "1980s",
    "featured": false,
    "addedAt": "2024-02-04T19:00:00.000Z"
  },
  {
    "id": "cine-037",
    "title": "Ran",
    "originalTitle": "乱",
    "director": "Akira Kurosawa",
    "year": 1985,
    "country": "Japan",
    "genres": [
      "Action",
      "Drama",
      "War"
    ],
    "runtime": 162,
    "rating": 8.6,
    "festivalAwards": [
      "Academy Award for Best Costume",
      "BAFTA Best Foreign Film"
    ],
    "synopsis": "In medieval Japan, an elderly warlord abdicates power to his three sons, who quickly turn against each other in a devastating war for supremacy.",
    "cast": [
      "Tatsuya Nakadai",
      "Akira Terao",
      "Jinpachi Nezu",
      "Mieko Harada"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Kurosawa's grand Shakespearean vision of King Lear, splashed across battlefields of color and tragedy.",
    "decade": "1980s",
    "featured": false,
    "addedAt": "2024-02-05T19:00:00.000Z"
  },
  {
    "id": "cine-038",
    "title": "Wings of Desire",
    "originalTitle": "Der Himmel über Berlin",
    "director": "Wim Wenders",
    "year": 1987,
    "country": "Germany",
    "genres": [
      "Drama",
      "Fantasy",
      "Romance"
    ],
    "runtime": 128,
    "rating": 8.3,
    "festivalAwards": [
      "Best Director (Cannes)",
      "European Film Award for Best Director"
    ],
    "synopsis": "An immortal angel perched over a divided Berlin falls in love with a lonely mortal trapeze artist and longs to experience human existence.",
    "cast": [
      "Bruno Ganz",
      "Solveig Dommartin",
      "Otto Sander",
      "Peter Falk"
    ],
    "language": "German, English, French",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Henri Alekan's luminous camera floats across pre-fall Berlin in a tender salute to earthly presence.",
    "decade": "1980s",
    "featured": false,
    "addedAt": "2024-02-06T19:00:00.000Z"
  },
  {
    "id": "cine-039",
    "title": "Paris, Texas",
    "originalTitle": "Paris, Texas",
    "director": "Wim Wenders",
    "year": 1984,
    "country": "Germany, United States",
    "genres": [
      "Drama"
    ],
    "runtime": 145,
    "rating": 8.3,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "BAFTA Best Direction"
    ],
    "synopsis": "Travis Henderson, an aimless drifter who has been missing for four years, wanders out of the desert to reconnect with his brother, young son, and missing wife.",
    "cast": [
      "Harry Dean Stanton",
      "Nastassja Kinski",
      "Dean Stockwell",
      "Hunter Carson"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Robby Müller's rich neon cinematography and Ry Cooder's slide guitar forge an American myth of estrangement.",
    "decade": "1980s",
    "featured": false,
    "addedAt": "2024-02-07T19:00:00.000Z"
  },
  {
    "id": "cine-040",
    "title": "Come and See",
    "originalTitle": "Иди и смотри",
    "director": "Elem Klimov",
    "year": 1985,
    "country": "Soviet Union",
    "genres": [
      "Drama",
      "War"
    ],
    "runtime": 142,
    "rating": 8.6,
    "festivalAwards": [
      "Golden Prize (Moscow International Film Festival)",
      "FIPRESCI Prize"
    ],
    "synopsis": "After finding an old rifle, a young Belarusian boy joins the Soviet resistance movement against ruthless Nazi forces, experiencing the horrific abyss of World War II.",
    "cast": [
      "Aleksei Kravchenko",
      "Olga Mironova",
      "Liubomiras Laucevicius"
    ],
    "language": "Russian, Belarusian, German",
    "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Arguably the most unflinching and devastating war film ever committed to celluloid.",
    "decade": "1980s",
    "featured": false,
    "addedAt": "2024-02-08T19:00:00.000Z"
  },
  {
    "id": "cine-041",
    "title": "Seven Samurai",
    "originalTitle": "七人の侍",
    "director": "Akira Kurosawa",
    "year": 1954,
    "country": "Japan",
    "genres": [
      "Action",
      "Drama"
    ],
    "runtime": 207,
    "rating": 8.9,
    "festivalAwards": [
      "Silver Lion (Venice)",
      "BAFTA Nominee"
    ],
    "synopsis": "Farmers from a village exploited by bandits hire seven masterless samurai for protection, leading to an epic showdown in the pouring rain.",
    "cast": [
      "Toshiro Mifune",
      "Takashi Shimura",
      "Keiko Tsushima"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The foundational blueprint of ensemble action cinema, executed with unmatched emotional breadth.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-02-09T19:00:00.000Z"
  },
  {
    "id": "cine-042",
    "title": "Persona",
    "originalTitle": "Persona",
    "director": "Ingmar Bergman",
    "year": 1966,
    "country": "Sweden",
    "genres": [
      "Drama",
      "Thriller"
    ],
    "runtime": 84,
    "rating": 8.4,
    "festivalAwards": [
      "Guldbagge Award for Best Film",
      "National Society of Film Critics Award"
    ],
    "synopsis": "A nurse is put in charge of a mute actress and finds that their personae slowly merge in an isolated seaside cottage.",
    "cast": [
      "Bibi Andersson",
      "Liv Ullmann",
      "Margaretha Krook"
    ],
    "language": "Swedish",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Bergman's modernist psychological masterpiece on identity, silence, and the limits of the human face.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-02-10T19:00:00.000Z"
  },
  {
    "id": "cine-043",
    "title": "The Seventh Seal",
    "originalTitle": "Det sjunde inseglet",
    "director": "Ingmar Bergman",
    "year": 1957,
    "country": "Sweden",
    "genres": [
      "Drama",
      "Fantasy",
      "History"
    ],
    "runtime": 96,
    "rating": 8.5,
    "festivalAwards": [
      "Special Jury Prize (Cannes)",
      "Cinema Writers Circle Award"
    ],
    "synopsis": "A knight returning to medieval Sweden from the Crusades challenges Death to a game of chess to delay his demise and search for answers about God.",
    "cast": [
      "Max von Sydow",
      "Gunnar Björnstrand",
      "Bengt Ekerot",
      "Nils Poppe"
    ],
    "language": "Swedish, Latin",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The definitive medieval allegory on existential doubt, mortality, and the dance of death.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-02-11T19:00:00.000Z"
  },
  {
    "id": "cine-044",
    "title": "Breathless",
    "originalTitle": "À bout de souffle",
    "director": "Jean-Luc Godard",
    "year": 1960,
    "country": "France",
    "genres": [
      "Crime",
      "Drama"
    ],
    "runtime": 90,
    "rating": 8.1,
    "festivalAwards": [
      "Silver Bear for Best Director (Berlin)",
      "Prix Jean Vigo"
    ],
    "synopsis": "A small-time thief steals a car and impulsively murders a motorcycle policeman. Reunited with an American journalism student, he tries to persuade her to flee to Italy.",
    "cast": [
      "Jean-Paul Belmondo",
      "Jean Seberg",
      "Daniel Boulanger"
    ],
    "language": "French, English",
    "posterUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The lightning bolt that ignited the French New Wave with jump cuts and rebellious attitude.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-02-12T19:00:00.000Z"
  },
  {
    "id": "cine-045",
    "title": "8½",
    "originalTitle": "8½ (Otto e mezzo)",
    "director": "Federico Fellini",
    "year": 1963,
    "country": "Italy",
    "genres": [
      "Drama"
    ],
    "runtime": 138,
    "rating": 8.4,
    "festivalAwards": [
      "Grand Prize (Moscow)",
      "2 Academy Awards including Best Foreign Language Film"
    ],
    "synopsis": "A harried movie director retreats into his memories and fantasies as he faces creative paralysis while attempting to shoot an ambitious science fiction film.",
    "cast": [
      "Marcello Mastroianni",
      "Claudia Cardinale",
      "Anouk Aimée"
    ],
    "language": "Italian, French, English",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The pinnacle of cinema about the creative agony and ecstasy of making cinema.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-02-13T19:00:00.000Z"
  },
  {
    "id": "cine-046",
    "title": "La Dolce Vita",
    "originalTitle": "La Dolce Vita",
    "director": "Federico Fellini",
    "year": 1960,
    "country": "Italy",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "runtime": 174,
    "rating": 8.3,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "Academy Award for Best Costume"
    ],
    "synopsis": "A series of stories following a week in the life of a philandering paparazzo journalist living in the hedonistic high society of Rome.",
    "cast": [
      "Marcello Mastroianni",
      "Anita Ekberg",
      "Anouk Aimée"
    ],
    "language": "Italian, English, French",
    "posterUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Fellini's epic panoramic portrait of modern decadence and the Trevi Fountain.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-02-14T19:00:00.000Z"
  },
  {
    "id": "cine-047",
    "title": "Tokyo Story",
    "originalTitle": "東京物語",
    "director": "Yasujirō Ozu",
    "year": 1953,
    "country": "Japan",
    "genres": [
      "Drama"
    ],
    "runtime": 136,
    "rating": 8.7,
    "festivalAwards": [
      "BFI Sutherland Trophy",
      "Sight & Sound Greatest Films #3"
    ],
    "synopsis": "An aging couple travels to Tokyo to visit their grown children, but find the children too absorbed in their busy lives to spend time with them.",
    "cast": [
      "Chishū Ryū",
      "Chieko Higashiyama",
      "Setsuko Hara"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Ozu's tatami-mat masterwork on the slow, inevitable drift of familial bonds and transience.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-02-15T19:00:00.000Z"
  },
  {
    "id": "cine-048",
    "title": "2001: A Space Odyssey",
    "originalTitle": "2001: A Space Odyssey",
    "director": "Stanley Kubrick",
    "year": 1968,
    "country": "United Kingdom, United States",
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Mystery"
    ],
    "runtime": 149,
    "rating": 8.8,
    "festivalAwards": [
      "Academy Award for Best Visual Effects",
      "3 BAFTA Awards"
    ],
    "synopsis": "After uncovering a mysterious artifact buried beneath the lunar surface, a spacecraft manned by two astronauts and supercomputer HAL 9000 is sent on a journey to Jupiter.",
    "cast": [
      "Keir Dullea",
      "Gary Lockwood",
      "William Sylvester"
    ],
    "language": "English, Russian",
    "posterUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "An unparalleled sensory journey from the dawn of humanity into cosmic transcendence.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-02-16T19:00:00.000Z"
  },
  {
    "id": "cine-049",
    "title": "The 400 Blows",
    "originalTitle": "Les Quatre Cents Coups",
    "director": "François Truffaut",
    "year": 1959,
    "country": "France",
    "genres": [
      "Crime",
      "Drama"
    ],
    "runtime": 99,
    "rating": 8.3,
    "festivalAwards": [
      "Best Director (Cannes)",
      "OCIC Award"
    ],
    "synopsis": "A misunderstood young boy in Paris turns to petty crime and delinquency due to neglect from his parents and authoritarian teachers.",
    "cast": [
      "Jean-Pierre Léaud",
      "Claire Maurier",
      "Albert Rémy"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Truffaut's heartbreaking autobiographical debut ending on the immortal freeze-frame by the sea.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-02-17T19:00:00.000Z"
  },
  {
    "id": "cine-050",
    "title": "Vertigo",
    "originalTitle": "Vertigo",
    "director": "Alfred Hitchcock",
    "year": 1958,
    "country": "United States",
    "genres": [
      "Mystery",
      "Romance",
      "Thriller"
    ],
    "runtime": 128,
    "rating": 8.6,
    "festivalAwards": [
      "San Sebastián Silver Seashell",
      "Sight & Sound #1 (2012)"
    ],
    "synopsis": "A former San Francisco police detective juggling acrophobia is hired to follow the glamorous wife of an acquaintance, becoming hopelessly obsessed.",
    "cast": [
      "James Stewart",
      "Kim Novak",
      "Barbara Bel Geddes"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Hitchcock's swirling vortex of obsession, male gaze, and romantic delusion.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-02-18T19:00:00.000Z"
  },
  {
    "id": "cine-051",
    "title": "Citizen Kane",
    "originalTitle": "Citizen Kane",
    "director": "Orson Welles",
    "year": 1941,
    "country": "United States",
    "genres": [
      "Drama",
      "Mystery"
    ],
    "runtime": 119,
    "rating": 8.7,
    "festivalAwards": [
      "Academy Award for Best Screenplay",
      "NYFCC Best Picture"
    ],
    "synopsis": "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his dying word: 'Rosebud'.",
    "cast": [
      "Orson Welles",
      "Joseph Cotten",
      "Dorothy Comingore"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The undisputed milestone of cinematographic deep focus, non-linear chronology, and auditory depth.",
    "decade": "1940s",
    "featured": false,
    "addedAt": "2024-02-19T19:00:00.000Z"
  },
  {
    "id": "cine-052",
    "title": "Casablanca",
    "originalTitle": "Casablanca",
    "director": "Michael Curtiz",
    "year": 1942,
    "country": "United States",
    "genres": [
      "Drama",
      "Romance",
      "War"
    ],
    "runtime": 102,
    "rating": 8.8,
    "festivalAwards": [
      "3 Academy Awards including Best Picture",
      "AFI #3 All-Time"
    ],
    "synopsis": "A cynical American expatriate café owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
    "cast": [
      "Humphrey Bogart",
      "Ingrid Bergman",
      "Paul Henreid",
      "Claude Rains"
    ],
    "language": "English, French, German",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Perfection in classic Hollywood studio storytelling where every line of dialogue is legendary.",
    "decade": "1940s",
    "featured": false,
    "addedAt": "2024-02-20T19:00:00.000Z"
  },
  {
    "id": "cine-053",
    "title": "Bicycle Thieves",
    "originalTitle": "Ladri di biciclette",
    "director": "Vittorio De Sica",
    "year": 1948,
    "country": "Italy",
    "genres": [
      "Drama"
    ],
    "runtime": 89,
    "rating": 8.5,
    "festivalAwards": [
      "Honorary Academy Award",
      "Golden Globe Best Foreign Film"
    ],
    "synopsis": "In post-war Rome, a destitute father and his son search desperately for his stolen bicycle, vital for him to keep his employment.",
    "cast": [
      "Lamberto Maggiorani",
      "Enzo Staiola",
      "Lianella Carell"
    ],
    "language": "Italian",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The quintessential Italian Neorealist portrait of dignity, paternal love, and economic desperation.",
    "decade": "1940s",
    "featured": false,
    "addedAt": "2024-02-21T19:00:00.000Z"
  },
  {
    "id": "cine-054",
    "title": "Metropolis",
    "originalTitle": "Metropolis",
    "director": "Fritz Lang",
    "year": 1927,
    "country": "Germany",
    "genres": [
      "Sci-Fi",
      "Drama"
    ],
    "runtime": 153,
    "rating": 8.5,
    "festivalAwards": [
      "UNESCO Memory of the World Register",
      "Saturn Award Best Classic Release"
    ],
    "synopsis": "In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working-class prophet.",
    "cast": [
      "Alfred Abel",
      "Brigitte Helm",
      "Gustav Fröhlich"
    ],
    "language": "Silent (German intertitles)",
    "posterUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The pioneering monument of science fiction and German Expressionist architectural grandeur.",
    "decade": "1920s",
    "featured": false,
    "addedAt": "2024-02-22T19:00:00.000Z"
  },
  {
    "id": "cine-055",
    "title": "The Rules of the Game",
    "originalTitle": "La Règle du Jeu",
    "director": "Jean Renoir",
    "year": 1939,
    "country": "France",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "runtime": 110,
    "rating": 8.3,
    "festivalAwards": [
      "Venice Biennale Premiere",
      "Sight & Sound Top 5"
    ],
    "synopsis": "A weekend hunting party at a country estate exposes the intricate, callous romantic liaisons and manners of the French aristocracy on the eve of war.",
    "cast": [
      "Nora Gregor",
      "Paulette Dubost",
      "Marcel Dalio",
      "Jean Renoir"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Renoir's dazzling ensemble farce critiquing a dancing society marching obliviously toward disaster.",
    "decade": "1930s",
    "featured": false,
    "addedAt": "2024-02-23T19:00:00.000Z"
  },
  {
    "id": "cine-056",
    "title": "Modern Times",
    "originalTitle": "Modern Times",
    "director": "Charlie Chaplin",
    "year": 1936,
    "country": "United States",
    "genres": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "runtime": 87,
    "rating": 8.7,
    "festivalAwards": [
      "National Film Registry",
      "AFI 100 Years... 100 Movies"
    ],
    "synopsis": "The Tramp struggles to survive in the modern, industrialized world with the help of a young homeless woman against the backdrop of the Great Depression.",
    "cast": [
      "Charlie Chaplin",
      "Paulette Goddard",
      "Henry Bergman"
    ],
    "language": "English (Sound effects/silent)",
    "posterUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Chaplin's timeless visual comedy lampooning technological dehumanization with heart.",
    "decade": "1930s",
    "featured": false,
    "addedAt": "2024-02-24T19:00:00.000Z"
  },
  {
    "id": "cine-057",
    "title": "Sunrise: A Song of Two Humans",
    "originalTitle": "Sunrise",
    "director": "F.W. Murnau",
    "year": 1927,
    "country": "United States, Germany",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 94,
    "rating": 8.4,
    "festivalAwards": [
      "3 Academy Awards at 1st Ceremony including Unique and Artistic Picture"
    ],
    "synopsis": "An allegorical tale of a husband seduced by a woman from the city who attempts to murder his wife, leading into a journey of profound repentance and reconciliation.",
    "cast": [
      "George O'Brien",
      "Janet Gaynor",
      "Margaret Livingston"
    ],
    "language": "Silent (English intertitles)",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Murnau's symphonic triumph of mobile camera work and pure visual poetry.",
    "decade": "1920s",
    "featured": false,
    "addedAt": "2024-02-25T19:00:00.000Z"
  },
  {
    "id": "cine-058",
    "title": "Rashomon",
    "originalTitle": "羅生門",
    "director": "Akira Kurosawa",
    "year": 1950,
    "country": "Japan",
    "genres": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "runtime": 88,
    "rating": 8.6,
    "festivalAwards": [
      "Golden Lion (Venice)",
      "Honorary Academy Award"
    ],
    "synopsis": "A heinous crime and its aftermath are recalled from differing points of view by a bandit, a bride, a samurai's ghost, and a woodcutter.",
    "cast": [
      "Toshiro Mifune",
      "Machiko Kyō",
      "Masayuki Mori",
      "Takashi Shimura"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The film that introduced Japanese cinema to the West and coined the 'Rashomon effect'.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-02-26T19:00:00.000Z"
  },
  {
    "id": "cine-059",
    "title": "M",
    "originalTitle": "M – Eine Stadt sucht einen Mörder",
    "director": "Fritz Lang",
    "year": 1931,
    "country": "Germany",
    "genres": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "runtime": 117,
    "rating": 8.5,
    "festivalAwards": [
      "National Board of Review Top Foreign Film",
      "Sight & Sound Top 50"
    ],
    "synopsis": "When police in a German city are unable to catch a child murderer, the criminal underworld joins the manhunt to protect their own business.",
    "cast": [
      "Peter Lorre",
      "Ellen Widmann",
      "Inge Landgut",
      "Otto Wernicke"
    ],
    "language": "German",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Peter Lorre's chilling whistled tune and Lang's foundational procedural suspense.",
    "decade": "1930s",
    "featured": false,
    "addedAt": "2024-02-27T19:00:00.000Z"
  },
  {
    "id": "cine-060",
    "title": "The Passion of Joan of Arc",
    "originalTitle": "La Passion de Jeanne d'Arc",
    "director": "Carl Theodor Dreyer",
    "year": 1928,
    "country": "France",
    "genres": [
      "Biography",
      "Drama",
      "History"
    ],
    "runtime": 110,
    "rating": 8.6,
    "festivalAwards": [
      "Sight & Sound Top 25 All-Time",
      "Cinémathèque Française Pillar"
    ],
    "synopsis": "In 1431, Jeanne d'Arc is placed on trial on charges of heresy, facing interrogation and intimidation from church jurists.",
    "cast": [
      "Renée Jeanne Falconetti",
      "Eugène Silvain",
      "André Berley"
    ],
    "language": "Silent (French intertitles)",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Falconetti's expressive close-ups remain arguably the greatest acting performance ever captured.",
    "decade": "1920s",
    "featured": false,
    "addedAt": "2024-02-28T19:00:00.000Z"
  },
  {
    "id": "cine-061",
    "title": "Wild Strawberries",
    "originalTitle": "Smultronstället",
    "director": "Ingmar Bergman",
    "year": 1957,
    "country": "Sweden",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 91,
    "rating": 8.4,
    "festivalAwards": [
      "Golden Bear (Berlin)",
      "FIPRESCI Prize"
    ],
    "synopsis": "An elderly doctor driving to receive an honorary degree re-evaluates his life and regrets through dreams, memories, and encounters.",
    "cast": [
      "Victor Sjöström",
      "Bibi Andersson",
      "Ingrid Thulin"
    ],
    "language": "Swedish",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A deeply moving road movie through aging, reconciliation, and memory.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-02-29T19:00:00.000Z"
  },
  {
    "id": "cine-062",
    "title": "Cleo from 5 to 7",
    "originalTitle": "Cléo de 5 à 7",
    "director": "Agnès Varda",
    "year": 1962,
    "country": "France",
    "genres": [
      "Drama",
      "Music"
    ],
    "runtime": 90,
    "rating": 8.1,
    "festivalAwards": [
      "Cannes In Competition",
      "Prix Méliès"
    ],
    "synopsis": "A pop singer wanders the streets of Paris while waiting for biopsy results that will determine if she has terminal cancer.",
    "cast": [
      "Corinne Marchand",
      "Antoine Bourseiller",
      "Dominique Davray"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Varda's French New Wave milestone shot in almost literal real-time.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-03-01T19:00:00.000Z"
  },
  {
    "id": "cine-063",
    "title": "The Gleaners and I",
    "originalTitle": "Les Glaneurs et la glaneuse",
    "director": "Agnès Varda",
    "year": 2000,
    "country": "France",
    "genres": [
      "Documentary"
    ],
    "runtime": 82,
    "rating": 8.2,
    "festivalAwards": [
      "European Film Award for Best Documentary",
      "LAFCA Best Documentary"
    ],
    "synopsis": "Agnès Varda explores gleaners across rural and urban France who live off what others leave behind, contemplating mortality and reuse.",
    "cast": [
      "Agnès Varda",
      "Bodan Litnanski"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A warm, personal digital diary celebrating resourcefulness and human generosity.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-03-02T19:00:00.000Z"
  },
  {
    "id": "cine-064",
    "title": "L'Avventura",
    "originalTitle": "L'Avventura",
    "director": "Michelangelo Antonioni",
    "year": 1960,
    "country": "Italy",
    "genres": [
      "Drama",
      "Mystery"
    ],
    "runtime": 144,
    "rating": 8.1,
    "festivalAwards": [
      "Special Jury Prize (Cannes)",
      "BAFTA Nominee"
    ],
    "synopsis": "During a yachting trip in the Mediterranean, a woman disappears, leading her lover and best friend into a search that shifts into an aimless affair.",
    "cast": [
      "Monica Vitti",
      "Gabriele Ferzetti",
      "Lea Massari"
    ],
    "language": "Italian",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Antonioni's revolutionary mystery where the mystery itself evaporates into existential ennui.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-03-03T19:00:00.000Z"
  },
  {
    "id": "cine-065",
    "title": "Blow-Up",
    "originalTitle": "Blow-Up",
    "director": "Michelangelo Antonioni",
    "year": 1966,
    "country": "United Kingdom, Italy",
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "runtime": 111,
    "rating": 8,
    "festivalAwards": [
      "Grand Prix du Festival International du Film (Cannes)",
      "3 Academy Nominations"
    ],
    "synopsis": "A mod London fashion photographer unknowingly captures a murder in the background of a photograph taken in a quiet park.",
    "cast": [
      "David Hemmings",
      "Vanessa Redgrave",
      "Sarah Miles"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A quintessential artifact of swinging London and epistemological ambiguity.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-03-04T19:00:00.000Z"
  },
  {
    "id": "cine-066",
    "title": "The Double Life of Véronique",
    "originalTitle": "La double vie de Véronique",
    "director": "Krzysztof Kieślowski",
    "year": 1991,
    "country": "France, Poland",
    "genres": [
      "Drama",
      "Music",
      "Mystery"
    ],
    "runtime": 98,
    "rating": 8.2,
    "festivalAwards": [
      "Best Actress (Cannes)",
      "FIPRESCI Prize"
    ],
    "synopsis": "Two parallel women, one in France and one in Poland, share identical faces, musical talents, and an intangible spiritual bond without ever meeting.",
    "cast": [
      "Irène Jacob",
      "Halina Gryglaszewska",
      "Kalina Jędrusik"
    ],
    "language": "French, Polish",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Zbigniew Preisner's haunting score fuels Kieślowski's lyrical exploration of metaphysical kinship.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-03-05T19:00:00.000Z"
  },
  {
    "id": "cine-067",
    "title": "All About My Mother",
    "originalTitle": "Todo sobre mi madre",
    "director": "Pedro Almodóvar",
    "year": 1999,
    "country": "Spain",
    "genres": [
      "Drama"
    ],
    "runtime": 101,
    "rating": 8.2,
    "festivalAwards": [
      "Academy Award for Best Foreign Language Film",
      "Best Director (Cannes)"
    ],
    "synopsis": "Following the accidental death of her teenage son, a grieving mother returns to Barcelona to find the transgender father who never knew he existed.",
    "cast": [
      "Cecilia Roth",
      "Marisa Paredes",
      "Candela Peña",
      "Penélope Cruz"
    ],
    "language": "Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Almodóvar's melodramatic, color-saturated tribute to motherhood, grief, and sisterhood.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-03-06T19:00:00.000Z"
  },
  {
    "id": "cine-068",
    "title": "Volver",
    "originalTitle": "Volver",
    "director": "Pedro Almodóvar",
    "year": 2006,
    "country": "Spain",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "runtime": 121,
    "rating": 8.1,
    "festivalAwards": [
      "Best Screenplay & Best Actress Collective (Cannes)",
      "Goya for Best Film"
    ],
    "synopsis": "After her death, a mother returns as a ghost to her hometown in La Mancha to fix unfinished situations with her two daughters.",
    "cast": [
      "Penélope Cruz",
      "Carmen Maura",
      "Lola Dueñas"
    ],
    "language": "Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A warm and comedic ghost story blending Spanish folklore with feminine resilience.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-03-07T19:00:00.000Z"
  },
  {
    "id": "cine-069",
    "title": "Talk to Her",
    "originalTitle": "Hable con ella",
    "director": "Pedro Almodóvar",
    "year": 2002,
    "country": "Spain",
    "genres": [
      "Drama",
      "Mystery",
      "Romance"
    ],
    "runtime": 112,
    "rating": 8.3,
    "festivalAwards": [
      "Academy Award for Best Original Screenplay",
      "Golden Globe Best Foreign Film"
    ],
    "synopsis": "Two men form an unlikely friendship as they care for two comatose women in a Madrid clinic.",
    "cast": [
      "Javier Cámara",
      "Darío Grandinetti",
      "Leonor Watling"
    ],
    "language": "Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A complex, morally ambiguous study of loneliness, intimacy, and unrequited devotion.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-03-08T19:00:00.000Z"
  },
  {
    "id": "cine-070",
    "title": "The Great Beauty",
    "originalTitle": "La grande bellezza",
    "director": "Paolo Sorrentino",
    "year": 2013,
    "country": "Italy",
    "genres": [
      "Drama"
    ],
    "runtime": 141,
    "rating": 8.2,
    "festivalAwards": [
      "Academy Award for Best Foreign Language Film",
      "BAFTA Best Film Not in English"
    ],
    "synopsis": "Jep Gambardella has charmed his way through Rome's high society for decades, but on his 65th birthday begins questioning the emptiness of his glamorous lifestyle.",
    "cast": [
      "Toni Servillo",
      "Carlo Verdone",
      "Sabrina Ferilli"
    ],
    "language": "Italian",
    "posterUrl": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Sorrentino's dizzying Felliniesque hymn to Rome's eternal decay and transient ecstasy.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-03-09T19:00:00.000Z"
  },
  {
    "id": "cine-071",
    "title": "Amour",
    "originalTitle": "Amour",
    "director": "Michael Haneke",
    "year": 2012,
    "country": "France, Austria",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 127,
    "rating": 8.2,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "Academy Award for Best Foreign Language Film"
    ],
    "synopsis": "Georges and Anne are octogenarian retired music teachers whose bond of love is tested when Anne suffers a debilitating stroke.",
    "cast": [
      "Jean-Louis Trintignant",
      "Emmanuelle Riva",
      "Isabelle Huppert"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "An intimate, devastatingly compassionate portrait of decay, devotion, and twilight dignity.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-03-10T19:00:00.000Z"
  },
  {
    "id": "cine-072",
    "title": "The Piano Teacher",
    "originalTitle": "La Pianiste",
    "director": "Michael Haneke",
    "year": 2001,
    "country": "France, Austria",
    "genres": [
      "Drama",
      "Music"
    ],
    "runtime": 131,
    "rating": 8.1,
    "festivalAwards": [
      "Grand Prix, Best Actor, Best Actress (Cannes)",
      "César Nominee"
    ],
    "synopsis": "A repressed Viennese piano conservatory professor enters into an intense, masochistic relationship with her ambitious student.",
    "cast": [
      "Isabelle Huppert",
      "Benoît Magimel",
      "Annie Girardot"
    ],
    "language": "French, German",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Huppert delivers one of cinema's most fearlessly chilling portrayals of psychological control.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-03-11T19:00:00.000Z"
  },
  {
    "id": "cine-073",
    "title": "The Spirit of the Beehive",
    "originalTitle": "El espíritu de la colmena",
    "director": "Víctor Erice",
    "year": 1973,
    "country": "Spain",
    "genres": [
      "Drama"
    ],
    "runtime": 98,
    "rating": 8.2,
    "festivalAwards": [
      "Golden Shell (San Sebastián)",
      "Cinema Writers Circle Best Film"
    ],
    "synopsis": "In a desolate Castilian village following the Spanish Civil War, a seven-year-old girl is spellbound by Frankenstein's monster after seeing the film.",
    "cast": [
      "Ana Torrent",
      "Fernando Fernán Gómez",
      "Isabel Tellería"
    ],
    "language": "Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A haunting lyrical allegory of childhood imagination coping with post-war silence.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-03-12T19:00:00.000Z"
  },
  {
    "id": "cine-074",
    "title": "Daisies",
    "originalTitle": "Sedmikrásky",
    "director": "Věra Chytilová",
    "year": 1966,
    "country": "Czechoslovakia",
    "genres": [
      "Comedy",
      "Drama"
    ],
    "runtime": 76,
    "rating": 8,
    "festivalAwards": [
      "Grand Prix of the Belgian Film Critics Association",
      "Czech New Wave Pillar"
    ],
    "synopsis": "Two young women decide that since the world is spoiled, they will be spoiled as well, embarking on a series of anarchic pranks.",
    "cast": [
      "Jitka Cerhová",
      "Ivana Karbanová"
    ],
    "language": "Czech",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The feminist psychedelic peak of the Czechoslovak New Wave, filled with collage and chaos.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-03-13T19:00:00.000Z"
  },
  {
    "id": "cine-075",
    "title": "The Fire Within",
    "originalTitle": "Le Feu follet",
    "director": "Louis Malle",
    "year": 1963,
    "country": "France",
    "genres": [
      "Drama"
    ],
    "runtime": 108,
    "rating": 8.1,
    "festivalAwards": [
      "Special Jury Prize (Venice)",
      "Italian Syndicate Silver Ribbon"
    ],
    "synopsis": "A recovering alcoholic leaves a Versailles clinic to visit friends in Paris one final time before carrying out a predetermined suicide plan.",
    "cast": [
      "Maurice Ronet",
      "Léna Skerla",
      "Yvonne Clech"
    ],
    "language": "French",
    "posterUrl": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Erik Satie's piano gently frames Ronet's somber stroll through disillusionment.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-03-14T19:00:00.000Z"
  },
  {
    "id": "cine-076",
    "title": "Memories of Murder",
    "originalTitle": "살인의 추억",
    "director": "Bong Joon-ho",
    "year": 2003,
    "country": "South Korea",
    "genres": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "runtime": 132,
    "rating": 8.6,
    "festivalAwards": [
      "Silver Shell for Best Director (San Sebastián)",
      "FIPRESCI Prize"
    ],
    "synopsis": "In 1986 rural South Korea, two mismatched detectives struggle to apprehend the country's first confirmed serial killer with rudimentary forensic tools.",
    "cast": [
      "Song Kang-ho",
      "Kim Sang-kyung",
      "Roe-ha Kim"
    ],
    "language": "Korean",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A brilliant procedural thriller capturing systemic incompetence and chilling ambiguity.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-03-15T19:00:00.000Z"
  },
  {
    "id": "cine-077",
    "title": "Oldboy",
    "originalTitle": "올드보이",
    "director": "Park Chan-wook",
    "year": 2003,
    "country": "South Korea",
    "genres": [
      "Action",
      "Drama",
      "Mystery"
    ],
    "runtime": 120,
    "rating": 8.4,
    "festivalAwards": [
      "Grand Prix (Cannes)",
      "Sitges Best Film"
    ],
    "synopsis": "After being imprisoned in a hotel room for fifteen years with no explanation, Oh Dae-su is released and given five days to find his captor.",
    "cast": [
      "Choi Min-sik",
      "Yoo Ji-tae",
      "Kang Hye-jeong"
    ],
    "language": "Korean",
    "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Greek tragedy meets operatic vengeance featuring the famous single-take hallway corridor fight.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-03-16T19:00:00.000Z"
  },
  {
    "id": "cine-078",
    "title": "Burning",
    "originalTitle": "버닝",
    "director": "Lee Chang-dong",
    "year": 2018,
    "country": "South Korea",
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "runtime": 148,
    "rating": 8.2,
    "festivalAwards": [
      "FIPRESCI Prize (Cannes)",
      "LAFCA Best Foreign Film"
    ],
    "synopsis": "An aspiring young writer becomes entangled with a childhood neighbor and a wealthy, mysterious playboy whose secret hobby is burning abandoned greenhouses.",
    "cast": [
      "Yoo Ah-in",
      "Steven Yeun",
      "Jeon Jong-seo"
    ],
    "language": "Korean, English",
    "posterUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A slow-burning Murakamiesque examination of modern youth, class resentment, and elusive truth.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-03-17T19:00:00.000Z"
  },
  {
    "id": "cine-079",
    "title": "Poetry",
    "originalTitle": "시",
    "director": "Lee Chang-dong",
    "year": 2010,
    "country": "South Korea",
    "genres": [
      "Drama"
    ],
    "runtime": 139,
    "rating": 8.1,
    "festivalAwards": [
      "Best Screenplay (Cannes)",
      "Prize of the Ecumenical Jury"
    ],
    "synopsis": "A woman diagnosed with early Alzheimer's enrolls in a poetry class while shielding a horrific moral scandal involving her delinquent grandson.",
    "cast": [
      "Yoon Jeong-hee",
      "Lee David",
      "Kim Hi-ra"
    ],
    "language": "Korean",
    "posterUrl": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "An unforgettable, devastatingly graceful look at beauty in the face of human moral failing.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-03-18T19:00:00.000Z"
  },
  {
    "id": "cine-080",
    "title": "A Separation",
    "originalTitle": "جدایی نادر از سیمین",
    "director": "Asghar Farhadi",
    "year": 2011,
    "country": "Iran",
    "genres": [
      "Drama"
    ],
    "runtime": 123,
    "rating": 8.6,
    "festivalAwards": [
      "Golden Bear (Berlin)",
      "Academy Award for Best Foreign Language Film"
    ],
    "synopsis": "A married couple is faced with a difficult decision to improve the life of their child by moving to another country or stay in Iran to look after a deteriorating parent.",
    "cast": [
      "Payman Maadi",
      "Leila Hatami",
      "Sareh Bayat",
      "Shahab Hosseini"
    ],
    "language": "Persian",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A moral labyrinth where every character's dilemma is entirely understandable and tragic.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-03-19T19:00:00.000Z"
  },
  {
    "id": "cine-081",
    "title": "The Salesman",
    "originalTitle": "فروشنده",
    "director": "Asghar Farhadi",
    "year": 2016,
    "country": "Iran",
    "genres": [
      "Drama",
      "Mystery"
    ],
    "runtime": 124,
    "rating": 8.1,
    "festivalAwards": [
      "Best Screenplay & Best Actor (Cannes)",
      "Academy Award for Best Foreign Language Film"
    ],
    "synopsis": "While performing in Arthur Miller's Death of a Salesman, an Iranian married couple's lives are thrown into turmoil after the wife is assaulted in their apartment.",
    "cast": [
      "Shahab Hosseini",
      "Taraneh Alidoosti",
      "Babak Karimi"
    ],
    "language": "Persian",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A gripping psychological dissection of pride, revenge, and patriarchal humiliation.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-03-20T19:00:00.000Z"
  },
  {
    "id": "cine-082",
    "title": "Yi Yi (A One and a Two)",
    "originalTitle": "一一",
    "director": "Edward Yang",
    "year": 2000,
    "country": "Taiwan",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 173,
    "rating": 8.5,
    "festivalAwards": [
      "Best Director (Cannes)",
      "NYFCC Best Foreign Film"
    ],
    "synopsis": "Each member of a middle-class Taipei family seeks to reconcile the dilemmas of their daily lives over the course of a year, anchored by young Yang-Yang's perspective.",
    "cast": [
      "Wu Nien-jen",
      "Issei Ogata",
      "Elaine Jin",
      "Jonathan Chang"
    ],
    "language": "Mandarin, Taiwanese, Japanese, English",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A warm, encyclopedic masterpiece capturing the entire continuum of modern human existence.",
    "decade": "2000s",
    "featured": false,
    "addedAt": "2024-03-21T19:00:00.000Z"
  },
  {
    "id": "cine-083",
    "title": "A Brighter Summer Day",
    "originalTitle": "牯嶺街少年殺人事件",
    "director": "Edward Yang",
    "year": 1991,
    "country": "Taiwan",
    "genres": [
      "Crime",
      "Drama",
      "Romance"
    ],
    "runtime": 237,
    "rating": 8.7,
    "festivalAwards": [
      "Special Jury Prize (Tokyo)",
      "FIPRESCI Prize"
    ],
    "synopsis": "In early 1960s Taipei, a 14-year-old boy becomes involved with delinquent youth gangs, leading toward a fateful act that mirrors national trauma.",
    "cast": [
      "Chang Chen",
      "Lisa Yang",
      "Chang Kuo-chu"
    ],
    "language": "Mandarin, Taiwanese, Shanghainese",
    "posterUrl": "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A gargantuan monument of Asian cinema, rendering collective history through teenage anguish.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-03-22T19:00:00.000Z"
  },
  {
    "id": "cine-084",
    "title": "Farewell My Concubine",
    "originalTitle": "霸王別姬",
    "director": "Chen Kaige",
    "year": 1993,
    "country": "China",
    "genres": [
      "Drama",
      "Music",
      "Romance"
    ],
    "runtime": 171,
    "rating": 8.6,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "Golden Globe Best Foreign Language Film"
    ],
    "synopsis": "Two Peking Opera stars endure five decades of friendship, unrequited love, and shifting political turmoil across 20th-century Chinese history.",
    "cast": [
      "Leslie Cheung",
      "Zhang Fengyi",
      "Gong Li"
    ],
    "language": "Mandarin",
    "posterUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Leslie Cheung's transcendent performance anchors this grand operatic epic.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-03-23T19:00:00.000Z"
  },
  {
    "id": "cine-085",
    "title": "Raise the Red Lantern",
    "originalTitle": "大紅燈籠高高掛",
    "director": "Zhang Yimou",
    "year": 1991,
    "country": "China",
    "genres": [
      "Drama",
      "History"
    ],
    "runtime": 125,
    "rating": 8.4,
    "festivalAwards": [
      "Silver Lion (Venice)",
      "BAFTA Best Film Not in English"
    ],
    "synopsis": "A young woman becomes the fourth wife of a wealthy master in 1920s China, finding herself trapped in vicious intrigue among the concubines.",
    "cast": [
      "Gong Li",
      "Ma Jingwu",
      "He Caifei"
    ],
    "language": "Mandarin",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A stunning visual metaphor of courtyard confinement and patriarchal oppression.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-03-24T19:00:00.000Z"
  },
  {
    "id": "cine-086",
    "title": "Happy Together",
    "originalTitle": "春光乍洩",
    "director": "Wong Kar-wai",
    "year": 1997,
    "country": "Hong Kong",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 96,
    "rating": 8.2,
    "festivalAwards": [
      "Best Director (Cannes)",
      "Hong Kong Film Award Best Actor"
    ],
    "synopsis": "A tempestuous couple from Hong Kong travels to Argentina in search of the Iguazu Falls, struggling with mutual incompatibility and homesickness.",
    "cast": [
      "Leslie Cheung",
      "Tony Leung Chiu-wai",
      "Chang Chen"
    ],
    "language": "Cantonese, Mandarin, Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Tango rhythm, yellow filters, and Christopher Doyle's camerawork depict longing in exile.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-03-25T19:00:00.000Z"
  },
  {
    "id": "cine-087",
    "title": "Cure",
    "originalTitle": "キュア",
    "director": "Kiyoshi Kurosawa",
    "year": 1997,
    "country": "Japan",
    "genres": [
      "Crime",
      "Horror",
      "Mystery"
    ],
    "runtime": 111,
    "rating": 8.2,
    "festivalAwards": [
      "Tokyo International Best Actor",
      "Rotterdam Selection"
    ],
    "synopsis": "A wave of gruesome murders is being committed by people who have no memory of what they've done, leaving a haunted detective to trace a wandering amnesiac.",
    "cast": [
      "Kōji Yakusho",
      "Masato Hagiwara",
      "Tsuyoshi Ujiki"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "An unsettling, atmospheric masterwork of hypnotic dread and psychological breakdown.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-03-26T19:00:00.000Z"
  },
  {
    "id": "cine-088",
    "title": "High and Low",
    "originalTitle": "天国と地獄",
    "director": "Akira Kurosawa",
    "year": 1963,
    "country": "Japan",
    "genres": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "runtime": 143,
    "rating": 8.7,
    "festivalAwards": [
      "Venice In Competition",
      "Mainichi Film Award Best Film"
    ],
    "synopsis": "An executive of a Yokohama shoe company faces ruin when kidnappers demand a massive ransom for the son of his chauffeur instead of his own child.",
    "cast": [
      "Toshiro Mifune",
      "Tatsuya Nakadai",
      "Kyōko Kagawa"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The ultimate geometry of suspense, divided cleanly between penthouse ethics and street-level squalor.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-03-27T19:00:00.000Z"
  },
  {
    "id": "cine-089",
    "title": "Ikiru",
    "originalTitle": "生きる",
    "director": "Akira Kurosawa",
    "year": 1952,
    "country": "Japan",
    "genres": [
      "Drama"
    ],
    "runtime": 143,
    "rating": 8.7,
    "festivalAwards": [
      "Special Prize of the Senate (Berlin)",
      "Kinema Junpo Best Film"
    ],
    "synopsis": "A dull Tokyo civil servant discovers he has terminal stomach cancer and resolves to spend his remaining months building a children's playground.",
    "cast": [
      "Takashi Shimura",
      "Shin'ichi Himori",
      "Haruo Tanaka"
    ],
    "language": "Japanese",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A life-affirming triumph of compassion, civic duty, and the song of a dying man on a swing in the snow.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-03-28T19:00:00.000Z"
  },
  {
    "id": "cine-090",
    "title": "Pather Panchali",
    "originalTitle": "পথের পাঁচালী",
    "director": "Satyajit Ray",
    "year": 1955,
    "country": "India",
    "genres": [
      "Drama"
    ],
    "runtime": 125,
    "rating": 8.6,
    "festivalAwards": [
      "Best Human Document (Cannes)",
      "BAFTA Nominee"
    ],
    "synopsis": "Impoverished priest Harihar Ray dreams of a career as a poet and playwright while his young son Apu grows up amidst nature, train tracks, and hardship in rural Bengal.",
    "cast": [
      "Kanu Banerjee",
      "Karuna Banerjee",
      "Chunibala Devi",
      "Subir Banerjee"
    ],
    "language": "Bengali",
    "posterUrl": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Satyajit Ray's lyrical debut capturing the quiet rhythms and dignity of Bengali village life.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-03-29T19:00:00.000Z"
  },
  {
    "id": "cine-091",
    "title": "The Third Man",
    "originalTitle": "The Third Man",
    "director": "Carol Reed",
    "year": 1949,
    "country": "United Kingdom",
    "genres": [
      "Film-Noir",
      "Mystery",
      "Thriller"
    ],
    "runtime": 104,
    "rating": 8.5,
    "festivalAwards": [
      "Grand Prix (Cannes)",
      "Academy Award for Best Cinematography"
    ],
    "synopsis": "Pulp novelist Holly Martins travels to shadowy Allied-occupied Vienna to investigate the mysterious death of his friend Harry Lime.",
    "cast": [
      "Joseph Cotten",
      "Alida Valli",
      "Orson Welles",
      "Trevor Howard"
    ],
    "language": "English, German",
    "posterUrl": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Anton Karas's zither chords, Dutch tilts, and Orson Welles emerging from a darkened doorway in the sewers.",
    "decade": "1940s",
    "featured": false,
    "addedAt": "2024-03-30T19:00:00.000Z"
  },
  {
    "id": "cine-092",
    "title": "Barry Lyndon",
    "originalTitle": "Barry Lyndon",
    "director": "Stanley Kubrick",
    "year": 1975,
    "country": "United Kingdom, United States",
    "genres": [
      "Adventure",
      "Drama",
      "History"
    ],
    "runtime": 185,
    "rating": 8.4,
    "festivalAwards": [
      "4 Academy Awards",
      "BAFTA Best Direction"
    ],
    "synopsis": "An opportunistic 18th-century Irish rogue schemes his way into the upper echelons of English aristocracy, only to watch his fortune unravel.",
    "cast": [
      "Ryan O'Neal",
      "Marisa Berenson",
      "Patrick Magee"
    ],
    "language": "English, German, French",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Lit only by candlelight using Zeiss NASA lenses, every frame resembles a living 18th-century painting.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-03-31T19:00:00.000Z"
  },
  {
    "id": "cine-093",
    "title": "A Clockwork Orange",
    "originalTitle": "A Clockwork Orange",
    "director": "Stanley Kubrick",
    "year": 1971,
    "country": "United Kingdom",
    "genres": [
      "Sci-Fi",
      "Crime"
    ],
    "runtime": 136,
    "rating": 8.3,
    "festivalAwards": [
      "4 Academy Award Nominations",
      "Venice Pasinetti Award"
    ],
    "synopsis": "In a dystopian future Britain, a charismatic delinquent sociopath undergoes an experimental state conditioning therapy to cure his violent urges.",
    "cast": [
      "Malcolm McDowell",
      "Patrick Magee",
      "Michael Bates"
    ],
    "language": "English (Nadsat)",
    "posterUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A brazenly stylized, unsettling debate on free will versus enforced state virtue.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-04-01T19:00:00.000Z"
  },
  {
    "id": "cine-094",
    "title": "The Godfather",
    "originalTitle": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": 1972,
    "country": "United States",
    "genres": [
      "Crime",
      "Drama"
    ],
    "runtime": 175,
    "rating": 9.2,
    "festivalAwards": [
      "3 Academy Awards including Best Picture",
      "5 Golden Globes"
    ],
    "synopsis": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
    "cast": [
      "Marlon Brando",
      "Al Pacino",
      "James Caan",
      "Robert Duvall"
    ],
    "language": "English, Italian",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The undisputed apex of American dramatic tragedy, family duty, and the corruptive nature of power.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-04-02T19:00:00.000Z"
  },
  {
    "id": "cine-095",
    "title": "The Godfather Part II",
    "originalTitle": "The Godfather Part II",
    "director": "Francis Ford Coppola",
    "year": 1974,
    "country": "United States",
    "genres": [
      "Crime",
      "Drama"
    ],
    "runtime": 202,
    "rating": 9.1,
    "festivalAwards": [
      "6 Academy Awards including Best Picture",
      "BAFTA Best Actor"
    ],
    "synopsis": "The early life and career of Vito Corleone in 1920s New York City is portrayed while his son, Michael, expands and tightens his grip on the family syndicate in 1950s Lake Tahoe.",
    "cast": [
      "Al Pacino",
      "Robert De Niro",
      "Robert Duvall",
      "Diane Keaton"
    ],
    "language": "English, Italian, Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A monumental dual narrative exploring the birth and spiritual rot of the American immigrant dream.",
    "decade": "1970s",
    "featured": false,
    "addedAt": "2024-04-03T19:00:00.000Z"
  },
  {
    "id": "cine-096",
    "title": "Goodfellas",
    "originalTitle": "Goodfellas",
    "director": "Martin Scorsese",
    "year": 1990,
    "country": "United States",
    "genres": [
      "Biography",
      "Crime",
      "Drama"
    ],
    "runtime": 145,
    "rating": 8.7,
    "festivalAwards": [
      "Silver Lion (Venice)",
      "Academy Award for Best Supporting Actor"
    ],
    "synopsis": "The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.",
    "cast": [
      "Robert De Niro",
      "Ray Liotta",
      "Joe Pesci",
      "Lorraine Bracco"
    ],
    "language": "English, Italian",
    "posterUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Electrifying rhythm, freeze-frames, and the definitive modern mobster masterclass.",
    "decade": "1990s",
    "featured": false,
    "addedAt": "2024-04-04T19:00:00.000Z"
  },
  {
    "id": "cine-097",
    "title": "12 Angry Men",
    "originalTitle": "12 Angry Men",
    "director": "Sidney Lumet",
    "year": 1957,
    "country": "United States",
    "genres": [
      "Drama",
      "Crime"
    ],
    "runtime": 96,
    "rating": 9,
    "festivalAwards": [
      "Golden Bear (Berlin)",
      "3 Academy Award Nominations"
    ],
    "synopsis": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence in a murder case.",
    "cast": [
      "Henry Fonda",
      "Lee J. Cobb",
      "Martin Balsam",
      "Jack Warden"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "A masterclass in single-room tension, spatial blocking, and democratic responsibility.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-04-05T19:00:00.000Z"
  },
  {
    "id": "cine-098",
    "title": "Sunset Boulevard",
    "originalTitle": "Sunset Boulevard",
    "director": "Billy Wilder",
    "year": 1950,
    "country": "United States",
    "genres": [
      "Drama",
      "Film-Noir"
    ],
    "runtime": 110,
    "rating": 8.4,
    "festivalAwards": [
      "3 Academy Awards",
      "4 Golden Globes"
    ],
    "synopsis": "A struggling screenwriter develops a dangerous relationship with Norma Desmond, a faded silent film star determined to make a triumphant return.",
    "cast": [
      "William Holden",
      "Gloria Swanson",
      "Erich von Stroheim"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Billy Wilder's macabre satire on the illusions and discarded stars of the Hollywood dream factory.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-04-06T19:00:00.000Z"
  },
  {
    "id": "cine-099",
    "title": "Some Like It Hot",
    "originalTitle": "Some Like It Hot",
    "director": "Billy Wilder",
    "year": 1959,
    "country": "United States",
    "genres": [
      "Comedy",
      "Music",
      "Romance"
    ],
    "runtime": 121,
    "rating": 8.2,
    "festivalAwards": [
      "Academy Award for Best Costume",
      "3 Golden Globes"
    ],
    "synopsis": "After two male Chicago musicians witness a mob hit, they flee the city in disguise as members of an all-female jazz band.",
    "cast": [
      "Marilyn Monroe",
      "Tony Curtis",
      "Jack Lemmon"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Peak Hollywood farce featuring Monroe at her luminous best and the greatest closing line in comedy.",
    "decade": "1950s",
    "featured": false,
    "addedAt": "2024-04-07T19:00:00.000Z"
  },
  {
    "id": "cine-100",
    "title": "Do the Right Thing",
    "originalTitle": "Do the Right Thing",
    "director": "Spike Lee",
    "year": 1989,
    "country": "United States",
    "genres": [
      "Drama",
      "Comedy"
    ],
    "runtime": 120,
    "rating": 8.1,
    "festivalAwards": [
      "Palme d'Or In Competition",
      "LAFCA Best Picture"
    ],
    "synopsis": "On the hottest day of the year in Bedford-Stuyvesant, Brooklyn, racial simmering explodes into tragedy at a local Italian-American pizzeria.",
    "cast": [
      "Spike Lee",
      "Danny Aiello",
      "Ossie Davis",
      "Giancarlo Esposito"
    ],
    "language": "English, Italian, Spanish",
    "posterUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Spike Lee's scorching, kinetic portrait of community, gentrification, and racial friction.",
    "decade": "1980s",
    "featured": false,
    "addedAt": "2024-04-08T19:00:00.000Z"
  },
  {
    "id": "cine-101",
    "title": "The Red Shoes",
    "originalTitle": "The Red Shoes",
    "director": "Michael Powell, Emeric Pressburger",
    "year": 1948,
    "country": "United Kingdom",
    "genres": [
      "Drama",
      "Music",
      "Romance"
    ],
    "runtime": 133,
    "rating": 8.2,
    "festivalAwards": [
      "2 Academy Awards",
      "Golden Globe Best Original Score"
    ],
    "synopsis": "A young ballerina joins an established ballet company and becomes torn between the man she loves and her pursuit to be a prima ballerina.",
    "cast": [
      "Moira Shearer",
      "Anton Walbrook",
      "Marius Goring"
    ],
    "language": "English, French, Russian",
    "posterUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Technicolor splendor illustrating the all-consuming sacrifice demanded by artistic obsession.",
    "decade": "1940s",
    "featured": false,
    "addedAt": "2024-04-09T19:00:00.000Z"
  },
  {
    "id": "cine-102",
    "title": "Black Narcissus",
    "originalTitle": "Black Narcissus",
    "director": "Michael Powell, Emeric Pressburger",
    "year": 1947,
    "country": "United Kingdom",
    "genres": [
      "Drama"
    ],
    "runtime": 100,
    "rating": 8.1,
    "festivalAwards": [
      "2 Academy Awards for Cinematography and Art Direction",
      "Golden Globe"
    ],
    "synopsis": "A group of Anglican nuns attempt to establish a convent in the Himalayas, but the exotic climate and psychological isolation challenge their discipline.",
    "cast": [
      "Deborah Kerr",
      "Florinda Balkan",
      "David Farrar",
      "Kathleen Byron"
    ],
    "language": "English, Hindi",
    "posterUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Jack Cardiff's legendary saturated lighting evokes spiritual hysteria with breathtaking intensity.",
    "decade": "1940s",
    "featured": false,
    "addedAt": "2024-04-10T19:00:00.000Z"
  },
  {
    "id": "cine-103",
    "title": "Brief Encounter",
    "originalTitle": "Brief Encounter",
    "director": "David Lean",
    "year": 1945,
    "country": "United Kingdom",
    "genres": [
      "Drama",
      "Romance"
    ],
    "runtime": 86,
    "rating": 8.1,
    "festivalAwards": [
      "Grand Prix (Cannes)",
      "3 Academy Award Nominations"
    ],
    "synopsis": "Meeting in a railway station refreshment room, a suburban housewife and a married doctor enter into a brief, painful, and passionate love affair.",
    "cast": [
      "Celia Johnson",
      "Trevor Howard",
      "Stanley Holloway"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Rachmaninoff's piano concerto underscores the poignant restraint of British heartbreak.",
    "decade": "1940s",
    "featured": false,
    "addedAt": "2024-04-11T19:00:00.000Z"
  },
  {
    "id": "cine-104",
    "title": "Lawrence of Arabia",
    "originalTitle": "Lawrence of Arabia",
    "director": "David Lean",
    "year": 1962,
    "country": "United Kingdom",
    "genres": [
      "Adventure",
      "Biography",
      "Drama"
    ],
    "runtime": 227,
    "rating": 8.6,
    "festivalAwards": [
      "7 Academy Awards including Best Picture",
      "5 Golden Globes"
    ],
    "synopsis": "The story of T.E. Lawrence, the English officer who successfully united and led diverse, warring Arab tribes during World War I in order to fight the Turks.",
    "cast": [
      "Peter O'Toole",
      "Alec Guinness",
      "Anthony Quinn",
      "Omar Sharif"
    ],
    "language": "English, Arabic, Turkish",
    "posterUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "The zenith of 70mm epic cinema, where the desert mirage becomes a canvas for tragic megalomania.",
    "decade": "1960s",
    "featured": false,
    "addedAt": "2024-04-12T19:00:00.000Z"
  },
  {
    "id": "cine-105",
    "title": "The Tree of Life",
    "originalTitle": "The Tree of Life",
    "director": "Terrence Malick",
    "year": 2011,
    "country": "United States",
    "genres": [
      "Drama",
      "Fantasy"
    ],
    "runtime": 139,
    "rating": 8,
    "festivalAwards": [
      "Palme d'Or (Cannes)",
      "3 Academy Award Nominations"
    ],
    "synopsis": "The story of a Texas family in the 1950s traced through the eldest son's life, from his innocence to his disillusionment, intertwined with the origins of the universe.",
    "cast": [
      "Brad Pitt",
      "Sean Penn",
      "Jessica Chastain"
    ],
    "language": "English",
    "posterUrl": "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80",
    "curatorNotes": "Malick and Emmanuel Lubezki's visual hymn pondering grace versus nature from the dawn of time.",
    "decade": "2010s",
    "featured": false,
    "addedAt": "2024-04-13T19:00:00.000Z"
  }
];

export default INITIAL_MOVIES;
