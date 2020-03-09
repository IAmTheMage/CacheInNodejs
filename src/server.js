import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();

mongoose.connect('mongodb://localhost:27017/cachetest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB IS CONNECTED");
}).catch((err) => {
    console.log(err);
})

app.use(express.json())
app.use(router);

app.listen(3000, () => {
    
    console.log("Server is running on port 3000");
})