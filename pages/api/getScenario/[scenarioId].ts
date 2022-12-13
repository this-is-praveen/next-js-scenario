import CONNECT_MONGO from "../../../components/mongo";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const mongoProps = await CONNECT_MONGO();
    if (!mongoProps) return;
    const {
      query: { scenarioId },
    } = req;
    const { scenarioCollection, closeDB } = mongoProps;
    if (!scenarioId) {
      closeDB();
      return;
    }
    const scenario_id = new ObjectId(
      Array.isArray(scenarioId) ? scenarioId[0] : scenarioId
    );

    const result = await scenarioCollection.findOne({
      _id: scenario_id,
    });

    res.status(200).json({ response: result});
  }
};

export default handler;
