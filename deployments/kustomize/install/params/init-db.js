const mongoHost = process.env.AMBULANCE_API_MONGODB_HOST || 'mongodb';
const mongoPort = process.env.AMBULANCE_API_MONGODB_PORT || '27017';

const mongoUser = process.env.AMBULANCE_API_MONGODB_USERNAME;
const mongoPassword = process.env.AMBULANCE_API_MONGODB_PASSWORD;

const database = process.env.AMBULANCE_API_MONGODB_DATABASE;
const collection = process.env.AMBULANCE_API_MONGODB_COLLECTION;

const retrySeconds = parseInt(process.env.RETRY_CONNECTION_SECONDS || "5") || 5;

console.log('mongoUser' + mongoUser);
console.log('mongoPassword' + mongoPassword);

let connection;
while (true) {
    try {
        // Updated to handle no authentication
        let connectionString = `mongodb://${mongoHost}:${mongoPort}`;
        if (mongoUser && mongoPassword) {
            connectionString = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`;
        }
        console.log('Connection String: ' + connectionString);
        connection = Mongo(connectionString);
        break;
    } catch (exception) {
        print(`Cannot connect to mongoDB: ${exception}`);
        print(`Will retry after ${retrySeconds} seconds`);
        console.log('mongoUser' + mongoUser);
        console.log('mongoPassword' + mongoPassword);
        console.log(`mongodb://${mongoHost}:${mongoPort}`)
        sleep(retrySeconds * 1000);
    }
}


// if database and collection exists, exit with success - already initialized
const databases = connection.getDBNames()
if (databases.includes(database)) {
    const dbInstance = connection.getDB(database)
    collections = dbInstance.getCollectionNames()
    if (collections.includes(collection)) {
        print(`Collection '${collection}' already exists in database '${database}'`)
        process.exit(0);
    }
}

// initialize
// create database and collection
const db = connection.getDB(database)
db.createCollection(collection)

// create indexes
db[collection].createIndex({ "id": 1 })

//insert sample data
let result = db[collection].insertMany([
    {
        "id": "bobulova",
        "name": "Dr.Bobulová",
        "roomNumber": "123",
        "predefinedConditions": [
            { "value": "Nádcha", "code": "rhinitis" },
            { "value": "Kontrola", "code": "checkup" }
        ]
    }
]);

if (result.writeError) {
    console.error(result)
    print(`Error when writing the data: ${result.errmsg}`)
}

// exit with success
process.exit(0);