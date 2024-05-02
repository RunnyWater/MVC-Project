const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const Subject = require('./Subject');

class Subjects {
    constructor(dataset_name, connection_string) {
        this.subjects = [];
        this.collection_name = dataset_name;
        this.connection_string =connection_string;
        this.client = new MongoClient(this.connection_string);
        // this.client = new MongoClient(this.connection_string);
        
        (async () => {
            await this.connectToDatabase().then(() => {
                this.updateSubjects();
            });
        })();
        
    }

    async connectToDatabase() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
            this.db = this.client.db(this.collection_name); 
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
        }
    }

    async updateSubjects() {
        let list = await this.listCollections();
        let marks;
        let subjects = [];
        list.forEach(async element => {
            marks = await this.getMarksFromCollection(element)
            subjects.push(new Subject(element, marks));
        });
        this.subjects = subjects;
            
    }

    async listCollections() {
        try {
            // Get the list of collections
            const collections = await this.db.listCollections().toArray();
            // Extract and log the names of the collections
            const collectionNames = collections.slice(0, -1).map(collection => collection.name);
            return collectionNames;
        } catch (err) {
            console.error('Error listing collections:', err);
        }
    }

    async addSubject(collectionName) {
        console.log(`Creating collection: ${collectionName}`);
        
        await this.db.createCollection(collectionName);
        this.updateSubjects();
    }

    async deleteSubject(collectionName) {
        console.log(`Deleting collection: ${collectionName}`);
        
        await this.db.dropCollection(collectionName);
        this.updateSubjects();
    }

    async addMark(collection, mark) {
        await this.db.collection(collection).insertOne({id: await this.db.collection(collection).countDocuments() ,mark: parseFloat(mark)});
        
        this.updateSubjects();
    }
    
    async deleteMark(collection, id) {
        await this.db.collection(collection).deleteOne({id: parseInt(id)});

        this.updateSubjects();
    }

    static getAll() {
        return this.subjects;
    }

    async getMarksFromCollection(name) {
        try {
            // Fetch all documents from the 'math' collection
            const documents = await this.db.collection(name).find().toArray();
            return (documents.map(doc => doc.mark));
        } catch (err) {
            console.error(`Error fetching documents from ${name} collection:`, err);
        }
    }

}

module.exports = Subjects;