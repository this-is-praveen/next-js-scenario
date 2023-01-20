import { useRouter } from "next/router";
import { CSSProperties } from "react";
import { useAppContext } from "../pages/_app";
import EditIcon from "./editIcon";
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
  const {
    contextData: { isAdmin = false },
    setContextData,
  } = useAppContext();
  const handleExplore = () => {
    router.push({ pathname: `/scenario/${id}` });
  };
  const handleBack = () => {
    router.back();
  };

  const editIconParentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const isAdminAndDetailsPage = isAdmin && detailsPage;

  return (
    <div className={classes["card"]}>
      <div style={isAdminAndDetailsPage ? editIconParentStyle : {}}>
        {isAdminAndDetailsPage && (
          <EditIcon
            style={{ alignSelf: "end" }}
            onClick={() => {
              setContextData((prevState: any) => ({
                ...prevState,
                editCardData: props,
              }));
              router.push({
                pathname: `/editAnScenario`,
              });
            }}
          />
        )}
        <picture>
          <img
            className={`${
              classes[detailsPage ? "card_image_details" : "card_image"]
            }`}
            src={imageSrc}
            alt={title}
          />
        </picture>
      </div>

      <section
        className={`${classes["card_details"]} ${
          classes[detailsPage ? "flex_col" : "flex_row"]
        }`}
      >
        <div>
          <div
            className={classes[detailsPage ? "titleText_details" : "titleText"]}
          >
            {title}
          </div>
          <div
            className={
              classes[detailsPage ? "captionText_details" : "captionText"]
            }
          >
            {caption}
          </div>
          {detailsPage && (
            <div className={classes["description"]}>{props.description}</div>
          )}
        </div>
        <div className={classes["explore_div"]}>
          <div
            className={classes["button_style"]}
            onClick={detailsPage ? handleBack : handleExplore}
          >
            {detailsPage ? "Back" : "More Details"}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScenarioCard;
