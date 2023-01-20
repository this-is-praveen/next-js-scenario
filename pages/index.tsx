import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CONNECT_MONGO from "../components/mongo";
import ScenarioCard from "../components/scenarioCard";
import classes from "../components/scenarioCard.module.css";
import { useAppContext } from "./_app";

const HomePage = (props: any) => {
  const { sceanarios = [] } = props;
  const { query, replace } = useRouter();
  const { setContextData } = useAppContext();

  const adminCheck = async (endPoint: string) => {
    const response = await fetch(`/api/${endPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status) {
      setContextData((prevState: any) => ({
        ...prevState,
        isAdmin: response.status === 200,
      }));
      if (endPoint === "makeCurrentUserAdmin") {
        replace("/");
      }
    }
  };

  useEffect(() => {
    const isAddAdmin = query?.makeMeAnAdmin === "";
    if (isAddAdmin) {
      adminCheck("makeCurrentUserAdmin");
    }
  }, [query]);

  useEffect(() => {
    console.log("************88");
    adminCheck("checkIfAdmin");
  }, []);

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
  };
};

export default HomePage;
