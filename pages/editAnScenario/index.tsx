import FormComponent from "../../components/formComponent";
import { useAppContext } from "../_app";

const EditAnScenario = (props: any) => {
  const { contextData } = useAppContext();
  const { editCardData = {} } = contextData || {};

  return <FormComponent type={"edit"} data={editCardData} />;
};

export default EditAnScenario;
