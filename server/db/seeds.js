use education;
db.dropDatabase();

db.users.insertMany([
  {
    name: "Joe Dillon",
    level: ["easy"],
    highScore: 1
  },
  {
    name: "Ash Oldham",
    level: ["easy"],
    highScore: 3
  },
  {
    name: "Kat Kmiotek",
    level: ["easy"],
    highScore: 2
  },
  {
    name: "David Eastcroft",
    level: ["easy", "medium", "hard"],
    highScore: 0
  }

]);
