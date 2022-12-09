import { GetStaticProps } from "next";
import CONNECT_MONGO from "../components/mongo";
import ScenarioCard from "../components/scenarioCard";

const HomePage = (props: any) => {
  const { sceanarios = [] } = props;
  return (
    <>
      {sceanarios.map((scenario: any) => (
        <ScenarioCard
          key={scenario._id}
          title={scenario.title}
          caption={scenario.caption}
          imageSrc={scenario.imageSrc}
        />
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { scenarioCollection, closeDB } = await CONNECT_MONGO();

  const sceanarios = await scenarioCollection.find().toArray();
  closeDB();

  return {
    props: {
      sceanarios: sceanarios.map((scenario) => ({
        ...scenario,
        ["_id"]: scenario._id.toString(),
      })),
    },
  };
};

export default HomePage;
