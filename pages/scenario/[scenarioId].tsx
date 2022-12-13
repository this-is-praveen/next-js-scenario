import { useRouter } from "next/router";

const ScenarioDetailPage = () => {
  const router = useRouter();
  const pathName = router.query.scenarioId;

  return (
    <>
      <h1>{pathName} Page</h1>
    </>
  );
};

export default ScenarioDetailPage;
