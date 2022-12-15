import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "../../common/functions";
import ScenarioCard, { IScenarioCard } from "../../components/scenarioCard";

const ScenarioDetailPage = () => {
  const router = useRouter();
  const scenarioId = router.query.scenarioId;
  const [response, setResponse] = useState<IScenarioCard>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!scenarioId) return;
    const callApi = async () => {
      const response = await fetch(`/api/getScenario/${scenarioId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      setResponse(res.response ?? []);
      setLoading(false);
    };
    setLoading(true);
    callApi();
  }, [scenarioId]);
  const Helmet = (
    <Head>
      <title>{response?.title} Scenario</title>
      <meta
        name="description"
        content={response?.description || "Loading..."}
      />
    </Head>
  );
  return (
    <Fragment>
      {Helmet}
      {!!response && !loading ? (
        <ScenarioCard detailsPage={true} {...response} />
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default ScenarioDetailPage;
