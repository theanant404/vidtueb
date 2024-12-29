import dotenv from 'dotenv';
import {app} from './app.js';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env'
});

const PORT =process.env.PORT || 8000;
// console.log(`PORT: ${PORT}`);
connectDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is listening on port https://localhost:${PORT}`);
        }
    );
})
.catch((error) => {
    console.error("mongodb connection error",error.message);
    process.exit(1);
});


