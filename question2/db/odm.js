let database = require("./storage.json");
const path = require("path");
const fs = require("fs");

const createUser = (user) => {
  database = require("./storage.json");
  user = database.find((items) => items.username === user.username);
  if (user) {
    return "User already exists.";
  }
  user.isLoggedIn = false;
  let newDatabase = [...database, user];
  let err = fs.writeFileSync(
    path.join(__dirname, "./storage.json"),
    JSON.stringify(newDatabase),
    "utf-8"
  );
  return err ? "Internal server error." : undefined;
};

const findUser = (username, password) => {
  database = require("./storage.json");
  user = database.find((user) => user.username === username);
  if (!user) return undefined;
  if (user.password !== password) return undefined;
  return user;
};

const findUserForDashboard = (username) => {
  database = require("./storage.json");
  user = database.find((user) => user.username === username);
  if (!user) return undefined;
  return user;
};

const makeTrueIsLoggedIn = (username) => {
  database = require("./storage.json");
  user = database.find((user) => user.username === username);
  user = { ...user, isLoggedIn: true };
  newDatabase = database.filter((user) => user.username !== username);
  newDatabase = [...newDatabase, user];
  let err = fs.writeFileSync(
    path.join(__dirname, "./storage.json"),
    JSON.stringify(newDatabase),
    "utf-8"
  );
  return err;
};

module.exports = {
  createUser,
  findUser,
  makeTrueIsLoggedIn,
  findUserForDashboard,
};
