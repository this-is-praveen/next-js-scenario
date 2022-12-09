import classes from "./scenarioCard.module.css";

interface IScenarioCard {
  title: string;
  caption: string;
  description?: string;
  imageSrc: string;
}

const ScenarioCard = (props: IScenarioCard) => {
  const { title, caption, description = "", imageSrc } = props;

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
      </div>
    </div>
  );
};

export default ScenarioCard;
