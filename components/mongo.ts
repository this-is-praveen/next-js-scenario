import { MongoClient } from "mongodb";

const CONNECT_MONGO = async () => {
  const uri = `mongodb+srv://praveen:xExOPK8rUalBzzYd@cluster0.orewp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  const clientPromise = client.connect();
  const clientResponse = await clientPromise;

  const cliendDB = clientResponse.db("NextJS_scenario");
  const scenarioCollection = cliendDB.collection("scenario");

  return { scenarioCollection, closeDB: () => client.close() };
};

export default CONNECT_MONGO;
