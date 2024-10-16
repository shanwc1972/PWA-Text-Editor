import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function below uses the PUT method to accepts some content and adds it to the Indexed DB
export const putDb = async (content) => {
  console.log('PUT into the database');

  const jateDb = await openDB('jate', 1); //creating our connection
  const txn = jateDb.transaction('jate', 'readwrite'); //new txn from DB with Readwrite privs
  const store = txn.objectStore('jate'); //Setup object store
  const req = store.put({ id: 1, value: content}); //Setup an put request

  //Submit our request and await a result 
  const res = await req;
  console.log('Data saved', res);
  return res;
};

// The function below GET method to retrieve data from the Indexed DB
export const getDb = async () => {
  console.log('GET from the database');
  
  const jateDb = await openDB('jate', 1); //creating our connection
  const txn = jateDb.transaction('jate', 'readonly'); //new txn from DB with Readonly privs
  const store = txn.objectStore('jate'); //Setup object store
  const req = store.get(1); //Setup a getAll() request

  //Submit our request and await a result 
  const res = await req;
  console.log('Data successfully retrieved from the database', res);
};

initdb();
