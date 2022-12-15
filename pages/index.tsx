import { GetStaticProps } from "next";
import Head from "next/head";
import CONNECT_MONGO from "../components/mongo";
import ScenarioCard from "../components/scenarioCard";
import classes from "../components/scenarioCard.module.css";

const HomePage = (props: any) => {
  const { sceanarios = [] } = props;
  return (
    <div className={classes["card_wrapper"]}>
      <Head>
        <title>Scenic</title>
        <meta name="description" content="This site was built with next_js" />
      </Head>
      {sceanarios.map((scenario: any) => (
        <ScenarioCard
          key={scenario._id}
          id={scenario._id}
          title={scenario.title}
          caption={scenario.caption}
          imageSrc={scenario.imageSrc}
        />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mongoProps = await CONNECT_MONGO();
  if (!mongoProps)
    return {
      props: {
        sceanarios: [],
      },
    };

  const { scenarioCollection, closeDB } = mongoProps;
  const sceanarios = await scenarioCollection.find().toArray();
  closeDB();

  return {
    props: {
      sceanarios: sceanarios.map((scenario) => ({
        ...scenario,
        ["_id"]: scenario._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
