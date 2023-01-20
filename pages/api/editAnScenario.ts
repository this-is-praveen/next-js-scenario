import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import CONNECT_MONGO from "../../components/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const mongoProps = await CONNECT_MONGO();
    if (!mongoProps) return;

    const { scenarioCollection, closeDB } = mongoProps;
    const payload = req.body;
    if (!payload) {
      closeDB();
      return;
    }
    const result = await scenarioCollection.findOneAndReplace(
      {
        _id: new ObjectId(payload.id),
      },
      {
        caption: payload.caption,
        description: payload.description,
        title: payload.title,
        imageSrc: payload.imageSrc,
      }
    );
    console.log("result", new ObjectId(payload.id), result);
    closeDB();

    res.status(204).json({ message: "Updated" });
  }
};

export default handler;
