import { Book } from '../types';

export const INITIAL_BOOKS: Book[] = [
  // 1. Computer Science
  {
    id: 'book-1',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    description: 'The definitive guide to the architecture, storage engines, distributed consensus, and fault-tolerant algorithms underpinning reliable, scalable, and maintainable modern systems.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science',
    genre: 'Distributed Systems',
    ISBN: '978-1449373320',
    publishedYear: 2017,
    pages: 616,
    rating: 4.9,
    availableCopies: 4,
    totalCopies: 6,
    location: 'Floor 2, Shelf CS-104',
    featured: true,
    popular: true,
    borrowCount: 142,
    sampleContent: [
      {
        chapter: 'Chapter 1: Reliable, Scalable, and Maintainable Applications',
        text: 'Today, many applications are data-intensive, as opposed to compute-intensive. Raw CPU power is rarely a limiting factor for these applications—bigger problems are usually the amount of data, the complexity of data, and the speed at which it is changing. A data-intensive application is typically built from standard building blocks that provide commonly needed functionality.'
      },
      {
        chapter: 'Chapter 2: Data Models and Query Languages',
        text: 'Data models are perhaps the most important part of developing software, because they have such a profound effect: not only on how the software is written, but also on how we think about the problem that we are solving. Most applications are built by layering one data model on top of another.'
      }
    ]
  },
  {
    id: 'book-2',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Master the principles, patterns, and practices of writing spotless software.',
    cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science',
    genre: 'Software Engineering',
    ISBN: '978-0132350884',
    publishedYear: 2008,
    pages: 464,
    rating: 4.7,
    availableCopies: 2,
    totalCopies: 5,
    location: 'Floor 2, Shelf CS-108',
    featured: false,
    popular: true,
    borrowCount: 210,
    sampleContent: [
      {
        chapter: 'Chapter 1: Clean Code',
        text: 'You are reading this book for two reasons. First, you are a programmer. Second, you want to be a better programmer. Good. We need better programmers. There will always be code. One of our most stubborn myths is that code is going away, but specification is code, and clarity is key.'
      }
    ]
  },
  {
    id: 'book-3',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    description: 'The monumental reference covering a comprehensive range of algorithms in depth, making their design and analysis accessible to all levels of readers.',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science',
    genre: 'Algorithms & Data Structures',
    ISBN: '978-0262033848',
    publishedYear: 2009,
    pages: 1312,
    rating: 4.8,
    availableCopies: 3,
    totalCopies: 4,
    location: 'Floor 2, Shelf CS-201',
    featured: false,
    popular: true,
    borrowCount: 98,
    sampleContent: [
      {
        chapter: 'Chapter 1: The Role of Algorithms in Computing',
        text: 'What are algorithms? Informally, an algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output. An algorithm is thus a sequence of computational steps that transform the input into the output.'
      }
    ]
  },

  // 2. Science
  {
    id: 'book-4',
    title: 'Cosmos',
    author: 'Carl Sagan',
    description: 'A timeless, poetic journey through the universe, exploring fifteen billion years of cosmic evolution and the intertwined rise of civilization and science.',
    cover: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    category: 'Science',
    genre: 'Astrophysics & Cosmology',
    ISBN: '978-0345539434',
    publishedYear: 1980,
    pages: 384,
    rating: 4.9,
    availableCopies: 5,
    totalCopies: 5,
    location: 'Floor 3, Shelf SCI-302',
    featured: true,
    popular: true,
    borrowCount: 185,
    sampleContent: [
      {
        chapter: 'Chapter 1: The Shores of the Cosmic Ocean',
        text: 'The Cosmos is all that is or ever was or ever will be. Our feeblest contemplations of the Cosmos stir us—there is a tingling in the spine, a catch in the voice, a faint sensation, as if a distant memory, of falling from a height. We know we are approaching the greatest of mysteries.'
      }
    ]
  },
  {
    id: 'book-5',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    description: 'From the Big Bang to black holes, Stephen Hawking unlocks the greatest secrets of space, time, quantum gravity, and the fundamental laws governing our reality.',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    category: 'Science',
    genre: 'Theoretical Physics',
    ISBN: '978-0553380163',
    publishedYear: 1988,
    pages: 212,
    rating: 4.8,
    availableCopies: 1,
    totalCopies: 4,
    location: 'Floor 3, Shelf SCI-305',
    featured: false,
    popular: true,
    borrowCount: 164,
    sampleContent: [
      {
        chapter: 'Chapter 1: Our Picture of the Universe',
        text: 'A well-known scientist once gave a public lecture on astronomy. He described how the earth orbits around the sun and how the sun, in turn, orbits around the center of a vast collection of stars called our galaxy. At the end of the lecture, a little old lady at the back of the room got up...'
      }
    ]
  },
  {
    id: 'book-6',
    title: 'The Gene: An Intimate History',
    author: 'Siddhartha Mukherjee',
    description: 'The story of the quest to decipher the master code that makes and defines humanity, woven through history, medical triumphs, and ethical frontiers.',
    cover: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    category: 'Science',
    genre: 'Genetics & Biology',
    ISBN: '978-1476733524',
    publishedYear: 2016,
    pages: 608,
    rating: 4.7,
    availableCopies: 2,
    totalCopies: 3,
    location: 'Floor 3, Shelf SCI-312',
    featured: false,
    popular: false,
    borrowCount: 77,
    sampleContent: [
      {
        chapter: 'Prologue: Families',
        text: 'In the winter of 2012, I traveled from New York to New Delhi to visit my cousin Moni. He was fifty-one years old, but his mind had slipped away years before into the quiet fog of schizophrenia. This book is a biography of the idea of heredity and the gene that shapes our human condition.'
      }
    ]
  },

  // 3. Technology
  {
    id: 'book-7',
    title: 'Life 3.0: Being Human in the Age of Artificial Intelligence',
    author: 'Max Tegmark',
    description: 'An MIT professor explores how artificial intelligence will transform our economic structures, legal frameworks, warfare, morality, and the very future of consciousness.',
    cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    genre: 'Artificial Intelligence',
    ISBN: '978-1101946596',
    publishedYear: 2017,
    pages: 384,
    rating: 4.6,
    availableCopies: 3,
    totalCopies: 4,
    location: 'Floor 2, Shelf TECH-110',
    featured: true,
    popular: false,
    borrowCount: 112,
    sampleContent: [
      {
        chapter: 'Prelude: The Omega Team',
        text: 'The Omega Team was the heart and soul of the company. While the rest of the enterprise brought in money by manufacturing various mundane software tools, the Omegas were pursuing an ambition far grander: the creation of human-level artificial general intelligence.'
      }
    ]
  },
  {
    id: 'book-8',
    title: 'The Innovators: How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution',
    author: 'Walter Isaacson',
    description: 'The sweeping saga of the pioneering minds behind the computer and the internet, from Ada Lovelace and Alan Turing to Steve Jobs and Larry Page.',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    genre: 'Tech History',
    ISBN: '978-1476708690',
    publishedYear: 2014,
    pages: 560,
    rating: 4.7,
    availableCopies: 4,
    totalCopies: 4,
    location: 'Floor 2, Shelf TECH-118',
    featured: false,
    popular: true,
    borrowCount: 89,
    sampleContent: [
      {
        chapter: 'Chapter 1: Ada, Countess of Lovelace',
        text: 'The computer and the internet were not invented by a single hero in a garage. They were born of collaborative vision, intertwining science, humanities, and engineering over decades of tireless experimentation.'
      }
    ]
  },

  // 4. Fiction
  {
    id: 'book-9',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'Between life and death there is a library containing infinite books, each telling the story of another life you could have lived if you had made different choices.',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    category: 'Fiction',
    genre: 'Contemporary Fiction & Magical Realism',
    ISBN: '978-0525559474',
    publishedYear: 2020,
    pages: 304,
    rating: 4.8,
    availableCopies: 0,
    totalCopies: 4,
    location: 'Floor 1, Shelf FIC-201',
    featured: true,
    popular: true,
    borrowCount: 310,
    sampleContent: [
      {
        chapter: 'Nineteen Years Before She Decided to Die',
        text: 'Nineteen years before she decided to die, Nora Seed sat in the warmth of the small library at Hazeldene School in the town of Bedford. She was staring at a chessboard on a low table. Mrs. Elm, the librarian, smiled warmly over her glasses.'
      },
      {
        chapter: 'The Midnight Library',
        text: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.'
      }
    ]
  },
  {
    id: 'book-10',
    title: '1984',
    author: 'George Orwell',
    description: 'The haunting dystopian masterpiece exploring totalitarian surveillance, truth manipulation, Doublethink, and the fragile sanctuary of individual rebellion.',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    category: 'Fiction',
    genre: 'Dystopian Classic',
    ISBN: '978-0451524935',
    publishedYear: 1949,
    pages: 328,
    rating: 4.9,
    availableCopies: 6,
    totalCopies: 8,
    location: 'Floor 1, Shelf FIC-112',
    featured: false,
    popular: true,
    borrowCount: 290,
    sampleContent: [
      {
        chapter: 'Part 1, Chapter 1',
        text: 'It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.'
      }
    ]
  },
  {
    id: 'book-11',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'An unforgettable portrait of human courage, empathy, and racial injustice in the American South through the innocent eyes of young Scout Finch.',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    category: 'Fiction',
    genre: 'Historical Fiction',
    ISBN: '978-0060935467',
    publishedYear: 1960,
    pages: 336,
    rating: 4.9,
    availableCopies: 3,
    totalCopies: 5,
    location: 'Floor 1, Shelf FIC-105',
    featured: false,
    popular: true,
    borrowCount: 220,
    sampleContent: [
      {
        chapter: 'Chapter 1',
        text: 'When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem’s fears of never being able to play football were assuaged, he was seldom self-conscious about his injury.'
      }
    ]
  },

  // 5. Fantasy
  {
    id: 'book-12',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    description: 'The mesmerizing tale of Kvothe, from his childhood in a troupe of traveling players to his years at the University learning the subtle art of naming magic.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'Fantasy',
    genre: 'Epic Fantasy',
    ISBN: '978-0756404741',
    publishedYear: 2007,
    pages: 662,
    rating: 4.9,
    availableCopies: 2,
    totalCopies: 4,
    location: 'Floor 1, Shelf FAN-402',
    featured: true,
    popular: true,
    borrowCount: 205,
    sampleContent: [
      {
        chapter: 'Prologue: A Silence of Three Parts',
        text: 'It was night again. The Waystone Inn lay in silence, and it was a silence of three parts. The most obvious part was a hollow, echoing quiet, made by things that were lacking. If there had been a wind it would have sighed through the trees, set the inn’s sign creaking on its hooks, and brushed the silence down the road like trailing autumn leaves.'
      }
    ]
  },
  {
    id: 'book-13',
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    description: 'On Roshar, a rocky world of storms and shattered plains, an enslaved bridge runner, an assassin who weeps when he kills, and a scholar seek to unearth radiant armor.',
    cover: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=800&q=80',
    category: 'Fantasy',
    genre: 'High Fantasy',
    ISBN: '978-0765326355',
    publishedYear: 2010,
    pages: 1007,
    rating: 4.9,
    availableCopies: 1,
    totalCopies: 3,
    location: 'Floor 1, Shelf FAN-410',
    featured: false,
    popular: true,
    borrowCount: 175,
    sampleContent: [
      {
        chapter: 'Prelude to the Stormlight Archive',
        text: 'Kalak rounded a rocky ridge and halted before the body of a dying thunderclast. The enormous stone beast leaned against the crag, its skeletal torso glistening dark with cooling molten rock. Ten swords had been planted into the stones.'
      }
    ]
  },

  // 6. Mystery
  {
    id: 'book-14',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    description: 'Alicia Berenson’s life is seemingly perfect. Then one evening she shoots her husband five times in the face, and never speaks another word. Theo Faber is determined to unravel the truth.',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    category: 'Mystery',
    genre: 'Psychological Thriller',
    ISBN: '978-1250301696',
    publishedYear: 2019,
    pages: 336,
    rating: 4.7,
    availableCopies: 3,
    totalCopies: 5,
    location: 'Floor 1, Shelf MYS-102',
    featured: true,
    popular: true,
    borrowCount: 230,
    sampleContent: [
      {
        chapter: 'Prologue: Alicia Berenson’s Diary',
        text: 'I don’t know why I am writing this. That’s not true. Maybe I do know, and just don’t want to admit it to myself. I need a place to pour out the shadows in my mind, where nobody can see them until it is too late.'
      }
    ]
  },
  {
    id: 'book-15',
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    description: 'Ten strangers are lured to an isolated island mansion off the Devon coast by a mysterious host, only to be accused of murder and picked off one by one.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    category: 'Mystery',
    genre: 'Classic Whodunit',
    ISBN: '978-0062073488',
    publishedYear: 1939,
    pages: 272,
    rating: 4.8,
    availableCopies: 2,
    totalCopies: 4,
    location: 'Floor 1, Shelf MYS-114',
    featured: false,
    popular: true,
    borrowCount: 190,
    sampleContent: [
      {
        chapter: 'Chapter 1',
        text: 'In the corner of a first-class smoking carriage, Mr. Justice Wargrave, lately retired from the bench, puffed at a cigar and ran an interested eye through the political news in The Times.'
      }
    ]
  },

  // 7. Biography
  {
    id: 'book-16',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    description: 'Based on more than forty interviews with Jobs conducted over two years, this is the riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur.',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    category: 'Biography',
    genre: 'Memoir & Technology Leadership',
    ISBN: '978-1451648539',
    publishedYear: 2011,
    pages: 656,
    rating: 4.8,
    availableCopies: 4,
    totalCopies: 5,
    location: 'Floor 3, Shelf BIO-204',
    featured: false,
    popular: true,
    borrowCount: 160,
    sampleContent: [
      {
        chapter: 'Chapter 1: Childhood',
        text: 'Paul and Clara Jobs were warm, loving parents who nurtured Steve in the orchard valleys of Northern California, a place on the cusp of becoming the Silicon epicenter of the world.'
      }
    ]
  },
  {
    id: 'book-17',
    title: 'Shoe Dog: A Memoir by the Creator of Nike',
    author: 'Phil Knight',
    description: 'In 1962, fresh out of business school, Phil Knight borrowed fifty dollars from his father and launched a company with one simple mission: import high-quality, low-cost running shoes.',
    cover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    category: 'Biography',
    genre: 'Business Memoir',
    ISBN: '978-1501135910',
    publishedYear: 2016,
    pages: 400,
    rating: 4.8,
    availableCopies: 3,
    totalCopies: 4,
    location: 'Floor 3, Shelf BIO-210',
    featured: true,
    popular: true,
    borrowCount: 180,
    sampleContent: [
      {
        chapter: 'Dawn',
        text: 'I was up before the others, before the birds, before the sun. I drank a cup of coffee, laced up my running shoes, and slipped out the back door. All I wanted was to run, and to leave a mark upon the earth that mattered.'
      }
    ]
  },

  // 8. History
  {
    id: 'book-18',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'How an insignificant ape became the ruler of planet Earth, capable of splitting the atom, flying to the moon, and manipulating the genetic code of life.',
    cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    category: 'History',
    genre: 'Anthropology & World History',
    ISBN: '978-0062316097',
    publishedYear: 2014,
    pages: 443,
    rating: 4.8,
    availableCopies: 2,
    totalCopies: 6,
    location: 'Floor 3, Shelf HIS-101',
    featured: true,
    popular: true,
    borrowCount: 340,
    sampleContent: [
      {
        chapter: 'Part 1: The Cognitive Revolution',
        text: 'About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics. About 300,000 years after their appearance, matter and energy started to coalesce into complex structures, called atoms, which then combined into molecules.'
      }
    ]
  },
  {
    id: 'book-19',
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    description: 'A ground-breaking look at how environmental and geographic factors shaped the fate of human societies, explaining the divergent paths of world civilizations.',
    cover: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=800&q=80',
    category: 'History',
    genre: 'Civilization Studies',
    ISBN: '978-0393317558',
    publishedYear: 1997,
    pages: 494,
    rating: 4.6,
    availableCopies: 3,
    totalCopies: 3,
    location: 'Floor 3, Shelf HIS-107',
    featured: false,
    popular: false,
    borrowCount: 88,
    sampleContent: [
      {
        chapter: 'Prologue: Yali’s Question',
        text: 'Why is it that you white people developed so much cargo and brought it to New Guinea, but we black people had little cargo of our own? That simple question posed by a local politician led to twenty-five years of research.'
      }
    ]
  },

  // 9. Self Development
  {
    id: 'book-20',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day through compounding tiny behaviors, cue design, and identity shifts.',
    cover: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    category: 'Self Development',
    genre: 'Productivity & Behavioral Science',
    ISBN: '978-0735211292',
    publishedYear: 2018,
    pages: 320,
    rating: 4.9,
    availableCopies: 4,
    totalCopies: 8,
    location: 'Floor 2, Shelf SELF-502',
    featured: true,
    popular: true,
    borrowCount: 420,
    sampleContent: [
      {
        chapter: 'Introduction: My Story',
        text: 'On the final day of my sophomore year of high school, I was hit in the face with a baseball bat. The accident altered the course of my life and forced me to realize a vital truth: small changes compound into monumental transformations.'
      },
      {
        chapter: 'The Fundamentals: Why Tiny Changes Make a Big Difference',
        text: 'It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis. If you get 1% better each day for one year, you will end up thirty-seven times better.'
      }
    ]
  },
  {
    id: 'book-21',
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    description: 'Deep work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time.',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    category: 'Self Development',
    genre: 'Focus & Productivity',
    ISBN: '978-1455586691',
    publishedYear: 2016,
    pages: 304,
    rating: 4.7,
    availableCopies: 2,
    totalCopies: 4,
    location: 'Floor 2, Shelf SELF-508',
    featured: false,
    popular: true,
    borrowCount: 165,
    sampleContent: [
      {
        chapter: 'Part 1: The Idea',
        text: 'In the woods outside the small village of Bollingen, Switzerland, Carl Jung built a two-story stone tower. He had no electricity, no telephone, and no distractions. There, he produced theories that reshaped modern psychology.'
      }
    ]
  },
  {
    id: 'book-22',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'The Nobel laureate explains the two systems that drive the way we think: System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.',
    cover: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    category: 'Self Development',
    genre: 'Cognitive Psychology',
    ISBN: '978-0374533557',
    publishedYear: 2011,
    pages: 512,
    rating: 4.7,
    availableCopies: 3,
    totalCopies: 5,
    location: 'Floor 2, Shelf SELF-514',
    featured: false,
    popular: true,
    borrowCount: 198,
    sampleContent: [
      {
        chapter: 'Introduction',
        text: 'Every author, I suppose, has in mind a scenario in which his or her book might be useful to its readers. Mine is the office watercooler, where opinions are shared and gossip is traded.'
      }
    ]
  },

  // 10. Business
  {
    id: 'book-23',
    title: 'Good to Great: Why Some Companies Make the Leap... and Others Don’t',
    author: 'Jim Collins',
    description: 'Using rigorous research benchmarks, Jim Collins explores how mediocre companies consistently transition into enduring market leaders with Level 5 Leadership.',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    category: 'Business',
    genre: 'Management & Strategy',
    ISBN: '978-0066620992',
    publishedYear: 2001,
    pages: 320,
    rating: 4.7,
    availableCopies: 3,
    totalCopies: 5,
    location: 'Floor 2, Shelf BIZ-301',
    featured: false,
    popular: true,
    borrowCount: 145,
    sampleContent: [
      {
        chapter: 'Chapter 1: Good is the Enemy of Great',
        text: 'Good is the enemy of great. And that is one of the key reasons why we have so little that becomes great. We don’t have great schools, principally because we have good schools. Few people attain great lives, in large part because it is just so easy to settle for a good life.'
      }
    ]
  },
  {
    id: 'book-24',
    title: 'Zero to One: Notes on Startups, or How to Build the Future',
    author: 'Peter Thiel, Blake Masters',
    description: 'The great secret of our time is that there are still uncharted frontiers to explore. In Zero to One, legendary entrepreneur Peter Thiel shows how to build unique monopolies that create new value.',
    cover: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    category: 'Business',
    genre: 'Venture & Startups',
    ISBN: '978-0804139298',
    publishedYear: 2014,
    pages: 224,
    rating: 4.6,
    availableCopies: 4,
    totalCopies: 6,
    location: 'Floor 2, Shelf BIZ-309',
    featured: true,
    popular: true,
    borrowCount: 215,
    sampleContent: [
      {
        chapter: 'Chapter 1: The Challenge of the Future',
        text: 'Whenever I interview someone for a job, I like to ask this question: "What important truth do very few people agree with you on?" This question sounds simple because it’s straightforward. Actually, it’s very hard to answer.'
      }
    ]
  },

  // 11. Engineering
  {
    id: 'book-25',
    title: 'Structures: Or Why Things Don’t Fall Down',
    author: 'J.E. Gordon',
    description: 'An informal, engaging masterwork explaining the fundamentals of tension, compression, shear, beams, and materials that keep bridges, skyscrapers, and bones intact.',
    cover: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    category: 'Engineering',
    genre: 'Structural Engineering',
    ISBN: '978-0306812835',
    publishedYear: 1978,
    pages: 424,
    rating: 4.8,
    availableCopies: 2,
    totalCopies: 3,
    location: 'Floor 3, Shelf ENG-401',
    featured: false,
    popular: false,
    borrowCount: 64,
    sampleContent: [
      {
        chapter: 'Chapter 1: The Design of Structures',
        text: 'A structure has been defined as "any assemblage of materials which is intended to sustain loads," and the study of structures is one of the traditional foundations of architecture and engineering.'
      }
    ]
  },
  {
    id: 'book-26',
    title: 'Skunk Works: A Personal Memoir of My Years at Lockheed',
    author: 'Ben R. Rich, Leo Janos',
    description: 'From the U-2 spy plane to the SR-71 Blackbird and the F-117 stealth fighter, Ben Rich reveals the secret engineering triumphs inside America’s most secretive aerospace think-tank.',
    cover: 'https://images.unsplash.com/photo-1517976487507-5b3b4b45a9b7?auto=format&fit=crop&w=800&q=80',
    category: 'Engineering',
    genre: 'Aerospace Engineering',
    ISBN: '978-0316743006',
    publishedYear: 1994,
    pages: 400,
    rating: 4.9,
    availableCopies: 3,
    totalCopies: 4,
    location: 'Floor 3, Shelf ENG-415',
    featured: true,
    popular: true,
    borrowCount: 138,
    sampleContent: [
      {
        chapter: 'Prologue: Stealth at Baghdad',
        text: 'At 3:00 a.m. local time on January 17, 1991, an ominous black bat-winged aircraft sliced into the Iraqi sky unnoticed by radar and dropped the laser-guided bomb that started the Persian Gulf War.'
      }
    ]
  },

  // 12. Romance
  {
    id: 'book-27',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'The romantic clash between Elizabeth Bennet and the arrogant Mr. Darcy in a society where manners, upbringing, morality, and marriage are paramount.',
    cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80',
    category: 'Romance',
    genre: 'Regency Classic',
    ISBN: '978-0141439518',
    publishedYear: 1813,
    pages: 432,
    rating: 4.8,
    availableCopies: 5,
    totalCopies: 6,
    location: 'Floor 1, Shelf ROM-101',
    featured: false,
    popular: true,
    borrowCount: 260,
    sampleContent: [
      {
        chapter: 'Chapter 1',
        text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families...'
      }
    ]
  },
  {
    id: 'book-28',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    description: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life to an unknown magazine reporter.',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    category: 'Romance',
    genre: 'Historical Romance & Drama',
    ISBN: '978-1501161933',
    publishedYear: 2017,
    pages: 400,
    rating: 4.8,
    availableCopies: 2,
    totalCopies: 5,
    location: 'Floor 1, Shelf ROM-109',
    featured: true,
    popular: true,
    borrowCount: 310,
    sampleContent: [
      {
        chapter: 'Part 1: Poor Ernie Diaz',
        text: 'Nobody was ever going to give me anything in this life. I figured that out early. If you want something, you have to take it with both hands and never apologize.'
      }
    ]
  },

  // Additional titles across categories for depth
  {
    id: 'book-29',
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    description: 'An illustrated, friendly guide that teaches you how to apply common algorithms to practical software problems with clear visual explanations.',
    cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science',
    genre: 'Algorithms & Data Structures',
    ISBN: '978-1617292231',
    publishedYear: 2016,
    pages: 256,
    rating: 4.8,
    availableCopies: 4,
    totalCopies: 4,
    location: 'Floor 2, Shelf CS-115',
    featured: false,
    popular: true,
    borrowCount: 178,
    sampleContent: [
      {
        chapter: 'Chapter 1: Introduction to Algorithms',
        text: 'An algorithm is a set of instructions for accomplishing a task. Every piece of code could be called an algorithm, but this book covers the nicer ones.'
      }
    ]
  },
  {
    id: 'book-30',
    title: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'David Thomas, Andrew Hunt',
    description: 'Filled with pragmatic advice, timeless lessons on craftsmanship, career development, and avoiding software rot in modern engineering.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    category: 'Computer Science',
    genre: 'Software Craftsmanship',
    ISBN: '978-0135957059',
    publishedYear: 2019,
    pages: 352,
    rating: 4.9,
    availableCopies: 2,
    totalCopies: 4,
    location: 'Floor 2, Shelf CS-120',
    featured: true,
    popular: true,
    borrowCount: 195,
    sampleContent: [
      {
        chapter: 'Chapter 1: A Pragmatic Philosophy',
        text: 'What distinguishes a pragmatic programmer? We feel it’s an attitude, a style, an approach to problems and their solutions. They think beyond the immediate problem.'
      }
    ]
  },
  {
    id: 'book-31',
    title: 'Silent Spring',
    author: 'Rachel Carson',
    description: 'The monumental environmental science book that ignited the modern conservation movement and challenged agricultural pesticide abuse.',
    cover: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    category: 'Science',
    genre: 'Ecology & Environmental Science',
    ISBN: '978-0618249060',
    publishedYear: 1962,
    pages: 378,
    rating: 4.7,
    availableCopies: 3,
    totalCopies: 3,
    location: 'Floor 3, Shelf SCI-320',
    featured: false,
    popular: false,
    borrowCount: 52,
    sampleContent: [
      {
        chapter: 'Chapter 1: A Fable for Tomorrow',
        text: 'There was once a town in the heart of America where all life seemed to live in harmony with its surroundings. Then a strange blight crept over the area and everything began to change.'
      }
    ]
  },
  {
    id: 'book-32',
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    description: 'The epic high-fantasy journey begins as Frodo Baggins inherits the One Ring of Power and must brave the shadows of Mordor.',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'Fantasy',
    genre: 'High Fantasy',
    ISBN: '978-0547928210',
    publishedYear: 1954,
    pages: 432,
    rating: 4.9,
    availableCopies: 3,
    totalCopies: 5,
    location: 'Floor 1, Shelf FAN-405',
    featured: false,
    popular: true,
    borrowCount: 280,
    sampleContent: [
      {
        chapter: 'Chapter 1: A Long-expected Party',
        text: 'When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.'
      }
    ]
  },
  {
    id: 'book-33',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    description: 'How constant innovation, validated learning, and rapid scientific prototyping create radically successful businesses without wasted capital.',
    cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    category: 'Business',
    genre: 'Entrepreneurship',
    ISBN: '978-0307887894',
    publishedYear: 2011,
    pages: 336,
    rating: 4.6,
    availableCopies: 2,
    totalCopies: 4,
    location: 'Floor 2, Shelf BIZ-315',
    featured: false,
    popular: true,
    borrowCount: 160,
    sampleContent: [
      {
        chapter: 'Introduction',
        text: 'Startup success is not a consequence of good genes or being in the right place at the right time. Startup success can be engineered by following the right process, which means it can be learned, which means it can be taught.'
      }
    ]
  },
  {
    id: 'book-34',
    title: 'The Wright Brothers',
    author: 'David McCullough',
    description: 'The dramatic human story behind the two Ohio bicycle mechanics who taught the world how to fly, overcoming ridicule, crashes, and death.',
    cover: 'https://images.unsplash.com/photo-1517976487507-5b3b4b45a9b7?auto=format&fit=crop&w=800&q=80',
    category: 'Biography',
    genre: 'Historical Biography',
    ISBN: '978-1476728759',
    publishedYear: 2015,
    pages: 336,
    rating: 4.8,
    availableCopies: 3,
    totalCopies: 3,
    location: 'Floor 3, Shelf BIO-220',
    featured: false,
    popular: false,
    borrowCount: 71,
    sampleContent: [
      {
        chapter: 'Chapter 1: The Start',
        text: 'In the spring of 1899, Wilbur Wright wrote a polite letter to the Smithsonian Institution in Washington requesting all available pamphlets and articles on mechanical flight.'
      }
    ]
  },
  {
    id: 'book-35',
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who will become the mysterious man known as Muad’Dib, avenging a noble plot against his family.',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    category: 'Science',
    genre: 'Sci-Fi Classic',
    ISBN: '978-0441172719',
    publishedYear: 1965,
    pages: 688,
    rating: 4.9,
    availableCopies: 1,
    totalCopies: 4,
    location: 'Floor 1, Shelf SCI-501',
    featured: true,
    popular: true,
    borrowCount: 330,
    sampleContent: [
      {
        chapter: 'Book One: Dune',
        text: 'A beginning is the time for taking the most delicate care that the balances are correct. This every sister of the Bene Gesserit knows. To begin your study of the life of Muad’Dib, then, take care that you first place him in his time: born in the 57th year of the Padishah Emperor, Shaddam IV.'
      }
    ]
  },
  {
    id: 'book-36',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness doing well with money isn’t necessarily about what you know. It’s about how you behave.',
    cover: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    category: 'Self Development',
    genre: 'Behavioral Finance',
    ISBN: '978-0857197689',
    publishedYear: 2020,
    pages: 256,
    rating: 4.8,
    availableCopies: 5,
    totalCopies: 6,
    location: 'Floor 2, Shelf SELF-520',
    featured: true,
    popular: true,
    borrowCount: 290,
    sampleContent: [
      {
        chapter: 'Introduction: The Greatest Show On Earth',
        text: 'My premise for this book is that doing well with money has a little to do with how smart you are and a lot to do with how you behave. And behavior is hard to teach, even to really smart people.'
      }
    ]
  }
];

export const INITIAL_USER = {
  id: 'usr-98124',
  name: 'Savio Fernandez',
  email: 'savio.fernandez@librahub.io',
  memberId: 'LH-2024-8849',
  joinedDate: '2024-03-15',
  avatar: 'https://www.cnn.com/2025/10/08/sport/soccer-cristiano-ronaldo-first-billionaire-intl',
  bio: 'Lifelong learner, software engineer, and passionate science-fiction reader. Aiming for 25 books this year!',
  role: 'admin' as const,
  readingGoal: 25,
  booksReadThisYear: 14
};

export const INITIAL_BORROWED: Array<{
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  progress: number;
  status: 'active' | 'returned' | 'overdue';
}> = [
  {
    id: 'bor-1',
    bookId: 'book-1',
    userId: 'usr-98124',
    borrowDate: '2026-09-18',
    dueDate: '2026-10-02',
    progress: 68,
    status: 'active'
  },
  {
    id: 'bor-2',
    bookId: 'book-20',
    userId: 'usr-98124',
    borrowDate: '2026-09-22',
    dueDate: '2026-10-06',
    progress: 42,
    status: 'active'
  },
  {
    id: 'bor-3',
    bookId: 'book-4',
    userId: 'usr-98124',
    borrowDate: '2026-08-10',
    dueDate: '2026-08-24',
    returnDate: '2026-08-22',
    progress: 100,
    status: 'returned'
  },
  {
    id: 'bor-4',
    bookId: 'book-10',
    userId: 'usr-98124',
    borrowDate: '2026-08-25',
    dueDate: '2026-09-08',
    returnDate: '2026-09-05',
    progress: 100,
    status: 'returned'
  }
];

export const INITIAL_FAVORITES: string[] = ['book-1', 'book-9', 'book-12', 'book-20'];
