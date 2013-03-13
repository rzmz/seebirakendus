mongoimport --host 127.0.0.1 --port 3002 --db meteor --collection elections --file data/elections.json --jsonArray
mongoimport --host 127.0.0.1 --port 3002 --db meteor --collection persons --file data/persons.json --jsonArray
mongoimport --host 127.0.0.1 --port 3002 --db meteor --collection regions --file data/regions.json --jsonArray
mongoimport --host 127.0.0.1 --port 3002 --db meteor --collection parties --file data/parties.json --jsonArray
