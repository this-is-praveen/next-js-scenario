import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import classes from "./scenarioCard.module.css";

export interface IScenarioCard {
  title: string;
  caption: string;
  id: string;
  imageSrc: string;
  description?: string;
  detailsPage?: boolean;
}

const ScenarioCard = (props: IScenarioCard) => {
  const { title, caption, id, imageSrc, detailsPage = false } = props;
  const router = useRouter();

  const handleExplore = () => {
    router.push(`/scenario/${id}`);
  };

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
        {detailsPage && <div>{props.description}</div>}
        <div className={classes["explore_div"]}>
          {detailsPage ? (
            <BackButton
              onClick={() => {
                router.back();
              }}
              className={classes["back_button"]}
            />
          ) : (
            <button className={classes["explore"]} onClick={handleExplore}>
              Explore
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const BackButton = ({
  onClick,
  className,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className: string;
}) => {
  return (
    <button className={className} onClick={onClick}>
      <svg
        height="16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 1024 1024"
      >
        <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
      </svg>
      <span>Back</span>
    </button>
  );
};

export default ScenarioCard;
