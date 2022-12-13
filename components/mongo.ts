import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "process";

const CONNECT_MONGO = async () => {
  const userName = env.MONGO_USERNAME;
  const password = env.MONGO_PWD;
  const uri = `mongodb+srv://${userName}:${password}@cluster0.orewp.mongodb.net/?retryWrites=true&w=majority`;
  const connectProps: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  };
  const client = new MongoClient(uri, connectProps);
  try {
    const clientPromise = client.connect();
    const clientResponse = await clientPromise;
    const cliendDB = clientResponse.db("NextJS_scenario");
    const scenarioCollection = cliendDB.collection("scenario");

    return { scenarioCollection, closeDB: () => client.close() };
  } catch (error) {
    console.log("------------------------------------------------");
    console.error("Fail connection to Mongo >> ", error);

    return;
  }
};

export default CONNECT_MONGO;
