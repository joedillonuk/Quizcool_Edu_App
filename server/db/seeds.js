use education;
db.dropDatabase();

db.users.insertMany([
  {
    name: "Joe Dillon",
    level: 3,
    points: 0
  },
  {
    name: "Ash Oldham",
    level: 2,
    points: 0
  },
  {
    name: "Kat Kmiotek",
    level: 3,
    points: 0
  },
  {
    name: "David Eastcroft",
    level: 1,
    points: 0
  }

]);
