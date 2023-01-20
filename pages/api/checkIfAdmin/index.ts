import { NextApiRequest, NextApiResponse } from "next";
import { machineIdSync } from "node-machine-id";
import CONNECT_MONGO from "../../../components/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const mongoProps = await CONNECT_MONGO();

    if (!mongoProps) return;

    const { closeDB, clientDB } = mongoProps;

    const authCollection = clientDB.collection("auth");

    const machineId = machineIdSync();

    const isEntryThere = await authCollection.findOne({ machineId });

    res.status(!!isEntryThere ? 200 : 202).json({ admin: !!isEntryThere });

    closeDB();
  }
};

export default handler;
