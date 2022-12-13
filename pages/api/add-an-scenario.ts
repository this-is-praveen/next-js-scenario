import CONNECT_MONGO from "../../components/mongo";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const mongoProps = await CONNECT_MONGO();
    if (!mongoProps) return;

    const { scenarioCollection, closeDB } = mongoProps;
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
