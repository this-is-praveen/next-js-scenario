import ScenarioCard from "../components/scenarioCard";

const HomePage = () => {
  console.count("Home");
  return (
    <>
      <h1>Home Page</h1>
      <ScenarioCard
        title="Test 1"
        caption="Hello this is caption"
        imageSrc={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ocean_and_mountain.jpg/1024px-Ocean_and_mountain.jpg"
        }
      />
    </>
  );
};

export default HomePage;
