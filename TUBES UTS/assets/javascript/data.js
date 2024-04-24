var threads = [
  {
    id: 1,
    title: "Thread 1",
    author: "Aaron",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Jack",
        date: Date.now(),
        content: "Hey, there!",
      },
      {
        author: "Arthur",
        date: Date.now(),
        content: "Hey to you too",
      },
    ],
  },
  {
    id: 2,
    title: "Thread 2",
    author: "Aaron",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Jack",
        date: Date.now(),
        content: "Hey, there!",
      },
      {
        author: "Arthur",
        date: Date.now(),
        content: "Hey to you too",
      },
    ],
  },
];

var defaultThreads = [
  {
    id: 1,
    title: "Thread 1",
    author: "Aaron",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Jack",
        date: Date.now(),
        content: "Hey, there!",
      },
      {
        author: "Arthur",
        date: Date.now(),
        content: "Hey to you too",
      },
    ],
  },
  {
    id: 2,
    title: "Thread 2",
    author: "Aaron",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Jack",
        date: Date.now(),
        content: "Hey, there!",
      },
      {
        author: "Arthur",
        date: Date.now(),
        content: "Hey to you too",
      },
    ],
  },
  {
    id: 3,
    title: "Thread 3",
    author: "Aaron",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Jack",
        date: Date.now(),
        content: "Hey, there!",
      },
      {
        author: "Arthur",
        date: Date.now(),
        content: "Hey to you too",
      },
    ],
  },
  {
    id: 4,
    title: "Thread 4",
    author: "Aaron",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Jack",
        date: Date.now(),
        content: "Hey, there!",
      },
      {
        author: "Arthur",
        date: Date.now(),
        content: "Hey to you too",
      },
    ],
  },
];

defaultThreads.push(
  {
    id: 3,
    title: "Thread 4",
    author: "Betty",
    date: Date.now(),
    content: "Interesting topic about JavaScript",
    comments: [
      {
        author: "Charles",
        date: Date.now(),
        content: "That's really insightful!",
      },
      {
        author: "Diana",
        date: Date.now(),
        content: "Thanks for sharing!",
      },
    ],
  },
  {
    id: 4,
    title: "Thread 5",
    author: "Carlos",
    date: Date.now(),
    content: "Exploring Node.js",
    comments: [
      {
        author: "Eva",
        date: Date.now(),
        content: "Node.js is such a powerful tool.",
      },
    ],
  },
  {
    id: 5,
    title: "Thread 6",
    author: "David",
    date: Date.now(),
    content: "Frontend frameworks comparison",
    comments: [
      {
        author: "Fiona",
        date: Date.now(),
        content: "I think React is better due to its virtual DOM feature.",
      },
      {
        author: "George",
        date: Date.now(),
        content: "Angular provides a full framework experience though.",
      },
    ],
  }
);

// Jika diperlukan, simpan data baru ke localStorage

var threads;
if (localStorage || localStorage.getItem("threads")) {
  threads = JSON.parse(localStorage.getItem("threads"));
} else {
  threads = defaultThreads;
  localStorage.setItem("threads", JSON.stringify(defaultThreads));
}
