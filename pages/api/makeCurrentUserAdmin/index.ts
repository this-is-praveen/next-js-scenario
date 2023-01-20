import { NextApiRequest, NextApiResponse } from "next";
import { machineIdSync } from "node-machine-id";
import CONNECT_MONGO from "../../../components/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const machineId = machineIdSync();

    const mongoProps = await CONNECT_MONGO();
    if (!mongoProps) return;

    const { closeDB, clientDB } = mongoProps;

    const auth = clientDB.collection("auth");
    const hasExisting = await auth.findOne({ machineId });
    if (!hasExisting) {
      const inserted = await auth.insertOne({ machineId });
      res.status(inserted.acknowledged ? 200 : 400).json({
        response: inserted.insertedId,
        message: inserted.acknowledged ? "success" : "failed",
      });
    } else {
      res.status(422).json({ response: "Already Exist" });
    }

    closeDB();
  }
};

export default handler;
