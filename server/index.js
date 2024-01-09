const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST, IP_SERVER, API_VERSION } = require('./constants');
const app = require('./app');

const port = process.env.PORT  || 3977;

app.listen(port, () => {
    console.log(`Server is running on http://${IP_SERVER}:${port}/api/${API_VERSION}`)
})

async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/webpersonal`)
            console.log('La conexion a la DB ha sido exitosa');
        
    } catch (error) {
        console.log(error);
    
        }
        
    }
    
        


connectDB()
    