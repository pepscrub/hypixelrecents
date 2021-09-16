require('dotenv').config();
const mongo = require('mongodb');

// Using mongoDB
const color = require('chalk');
const password = process.env.DBPASS || "DB password here";
const username = process.env.DBNAME || "DB Name here";
const clustername = process.env.DBCLUSTER || "DB cluster here";

const url = `mongodb+srv://${username}:${password}@cluster0.khl6s.mongodb.net/hypixelapi?retryWrites=true&w=majority`

/**
 * @classdesc Wrapper for MongoDB because I hate mongoose
 */
module.exports.DataBase = class DataBase
{
    constructor()
    {
        this.client = mongo.MongoClient(url, {  useNewUrlParser: true, useUnifiedTopology: true });
        this.db = null;
        this.dbinfo = null;
    }
    
    db()
    {
        return this.client;
    }

    connected()
    {
        return this.db === null ? false : true;
    }
    
    /**
     * Accepts:
     *  - Tables
     * @param {String} args what to grab
     * @param {String[]} options Optional arguments
     * @example DB.get('tables')
     */
     async get(args, ...options)
     {
         const test = (query) => {return (new RegExp(`^${query}$`)).test(args)}
         switch(true)
         {
             case test('tables'):
                 return await this.tables();
             break;
             case test('table'):
                 return await this.table(args);
             break;
             default:
                 return null;
         }
     }
 
     /**
      * You need to await this function when calling since we are
      * connecting to the server and requesting the Collections (Tables)
      * @async
      * @returns {String[]}
      */
     async tables()
     {
         return await this.db.listCollections().toArray();
     }
 
 
     async update(coll, query = {}, update = {}, options = {})
     {
         coll.findOneAndUpdate(query,update,options);
     }

     async deletemany(coll, query = {})
     {
        return await this.db.collection(coll).deleteMany(query);
     }
 
     async table(coll)
     {
         return await this.db.collection(coll);
     }
 
     /**
      * 
      * @param {*} collection Table to query
      * @param  {{}} query Query selector
      */
      async tablequery(coll, query = {})
     {
         try
         {
             return await this.db.collection(coll).find(query);
         }
         catch(e)
         {
             console.log(`${color.red.bold(`ERROR`)} ${color.red (`${e.message}`)}`);
         }
     }
 
     /**
      * 
      * @param {String} collection name of collection 
      * @param {Array} data 
      */
     insertinto(collection = null, data = null)
     {
         if(!(collection || data)) throw collection || data;
         if(typeof(collection) !== "string") return;
         this.db.collection(collection).insertOne(data)
     }
     
 
     /**
      * @description Connects our worker to an Atlas Server
      * @augments this.db With database entry point
      */
     conn()
     {
         return new Promise((resolve, rej)=>
         {
             this.client.connect(async (err, res)=>
             {
                 if(err) return rej(err)
                 resolve(true)
                 console.log(`${color.yellow.bold(`[DB]`)} Connected to database`)
                 this.db = res.db();
             })
         })
     }
 
     close()
     {
         return new Promise((resolve, rej)=>
         {
             this.client.logout((err, res)=>
             {
                 if(err) throw err
                 resolve(true)
                 console.log(`${color.yellow.bold(`[DB]`)} Disconnected from database`)
             })
         })
     }
}