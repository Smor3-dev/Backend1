import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://Admin:ADMIN@cluster0.7tct5zu.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0' ;

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
}

initMongoDB()