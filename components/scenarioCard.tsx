import { useRouter } from "next/router";
import classes from "./scenarioCard.module.css";

interface IScenarioCard {
  title: string;
  caption: string;
  id: string;
  imageSrc: string;
}

const ScenarioCard = (props: IScenarioCard) => {
  const { title, caption, id, imageSrc } = props;
  const router = useRouter();

  const handleExplore = () => {
    router.push(`/scenario/${id}`)
  }

  return (
    <div>
      <div className={classes["card"]}>
        <picture className="textCenter">
          <source srcSet={imageSrc} type="image/webp" />
          <img
            className={`${classes["borderRadius12"]} mw100`}
            src={imageSrc}
            alt={title}
          />
        </picture>
        <div className={classes["titleText"]}>{title}</div>
        <div className={classes["captionText"]}>{caption}</div>
        <div className={classes["explore_div"]}>
          <button className={classes["explore"]} onClick={handleExplore}>Explore</button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
