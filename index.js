const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json());

// https://cloud.mongodb.com/v2/636704132254724d232a695d#metrics/replicaSet/63670521f4375f2b21c9b275/explorer/assignment11db/service3/find

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kyk1ijo.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run6() {
    try {
        const serviceCollection6 = client.db('assignment11db').collection('service6');
        const addedServiceCollection = client.db('assignment11db').collection('addedService');
        const reviewCollection = client.db('assignment11db').collection('reviews');
        const blogCollection = client.db('assignment11db').collection('blog')

        app.get('/service6', async (req, res) => {
            const query = {};
            const cursor = serviceCollection6.find(query);
            const service6 = await cursor.toArray();
            res.send(service6)
        });

        // Extra Limit Test

        app.get('/service6/3', async (req, res) => {
            const query = {};
            const cursor = serviceCollection6.find(query).limit(3);
            const service6 = await cursor.toArray();
            res.send(service6)
        });

        app.get('/service6/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection6.findOne(query);
            res.send(service)
        })
        app.get('/service6/3/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection6.findOne(query);
            res.send(service)
        })

        // Blog get

        app.get('/blog/', async (req, res) => {
            const query = {};
            const cursor = blogCollection.find(query);
            const blog4 = await cursor.toArray();
            res.send(blog4)
        });



        // Added Service Page's  backend

        app.post('/addedService', async (req, res) => {
            const service = req.body;
            const result = await addedServiceCollection.insertOne(service);
            res.send(result)

        })


        // Review Post '/service6/:id'

        app.post('/reviews', async (req, res) => {
            const reviews = req.body;
            const review = await reviewCollection.insertOne(reviews);
            console.log(review);
            res.send(review)
        })


        // (xomovid679@fgvod.com,nosel60130@klblogs.com,wenekex651@jernang.com)


        // Review Get by email

        app.get('/reviews', async (req, res) => {
            let query = {}
            if (req?.query?.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })


        // Show Specific Review on base id

        app.get('/review', async (req, res) => {
            let query = {}
            if (req?.query?.id) {
                query = {
                    id: req.query.id
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });


        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);

        })

    }
    finally {

    }
}
run6().catch(err => console.log(err));

async function run3() {
    try {
        const serviceCollection3 = client.db('assignment11db').collection('service3');
        app.get('/service3', async (req, res) => {
            const query = {};
            const cursor = serviceCollection3.find(query);
            const service3 = await cursor.toArray();
            res.send(service3)
        });

        app.get('/service3/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection3.findOne(query);
            res.send(service)
        })
    }
    finally {

    }
}
run3().catch(err => console.log(err));


const s3 = require('./data/service3.json');
const s6 = require('./data/service6.json');


// app.get('/service3', (req, res) => {
//     res.send(s3)
// });
// app.get('/service6', (req, res) => {
//     res.send(s6)
// });

app.listen(port, () => {
    console.log(`All ok ${port} `);
})
