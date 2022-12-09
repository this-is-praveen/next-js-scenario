import CONNECT_MONGO from "../../components/mongo";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const { scenarioCollection, closeDB } = await CONNECT_MONGO();
    const payload = req.body;
    if (!payload) {
      closeDB();
      return;
    }
    const result = await scenarioCollection.insertOne(payload);
    closeDB();

    res.status(201).json({ message: "Inseted" });
  }
};

export default handler;
