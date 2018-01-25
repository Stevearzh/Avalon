// create administrator at admin database
print("create administrator...");
db = db.getSiblingDB('admin')
db.createUser({
  user: "dbAdmin",
  pwd: "P@ssw0rd!",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
});
print("done.");

// create other roles at user database
db = db.getSiblingDB('user')

// create logbot
print("");
print("create logbot and grant db privilege...");
db.createUser({
  user: "logbot",
  pwd: "J1a4D0n,M1m@",
  roles: [{ role: "readWrite", db: "irc_logs" }]
});
print("done");

// create searchbot
print("");
print("create searchbot and grant db privilege...");
db.createUser({
  user: "searchbot",
  pwd: "A5otH4r-P3ssW0R6",
  roles: [{ role: "read", db: "irc_logs" }]
});
print("done");

print("");
print("finished!");
