// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from "next";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import classes from "./news.module.css";

import { MongoClient, ServerApiVersion } from "mongodb";

type ValueType = {
  title: string;
  imageSrc: string;
  caption: string;
  description: string;
};
type ValueKeys = keyof ValueType;

const fieldName = {
  title: "Title",
  imageSrc: "Image Source",
  caption: "Caption",
  description: "Description",
};

const webUrlRegex =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const AddAnScenario = (props: any) => {
  const schema = Yup.object().shape({
    title: Yup.string()
      .required(`${fieldName["title"]} is Required`)
      .min(10, `${fieldName.title} should be atleast 3 characters long`)
      .max(20, "Oopsie too much !!"),
    imageSrc: Yup.string()
      .required(`${fieldName["imageSrc"]} is Required`)
      .matches(webUrlRegex, "Enter / Paste valid image url"),
    caption: Yup.string()
      .required(`${fieldName["caption"]} is Required`)
      .min(10, `${fieldName.caption} should be atleast 3 characters long`)
      .max(100, "Oopsie too much !!"),
    description: Yup.string()
      .required(`${fieldName["description"]} is Required`)
      .min(50, `${fieldName.description} should be atleast 10 characters long`)
      .max(2000, "Oopsie too much !!"),
  });

  const onSubmit = async (values: ValueType, formikProps: any) => {
    const { setSubmitting, resetForm } = formikProps;
    setSubmitting(true);
    // setTimeout(() => {
    //   console.log("resolved timeout at onSubmit");
    // }, 5000);
    // resetForm();
    setSubmitting(false);
  };
  return (
    <div className={classes["formWrapper"]}>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          title: "",
          imageSrc: "",
          caption: "",
          description: "",
        }}
      >
        {(formikProps) => {
          const {
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            isSubmitting,
          } = formikProps;
          console.log("values ", values);

          const InputField = ({ for: field }: { for: ValueKeys }) => (
            <div className={classes["dflex"]}>
              <label className={classes["inputLabel"]}>
                {fieldName[field]}:
              </label>
              <Field
                className={classes["inputElement"]}
                type="text"
                as={field === "description" ? "textarea" : undefined}
                name={field}
                value={values[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors[field]}
                isValid={touched[field] && !errors[field]}
              />
              <div className={classes["errorDiv"]}>
                <ErrorMessage name={field} />
              </div>
            </div>
          );

          return (
            <Form onSubmit={handleSubmit}>
              {InputField({ for: "title" })}
              {InputField({ for: "imageSrc" })}
              {InputField({ for: "caption" })}
              {InputField({ for: "description" })}
              <div className={classes["flexContentEnd"]}>
                <button
                  className={classes["submitButton"]}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Loading..." : `Submit${isValid ? " ✔" : ""}`}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Lorem from SSR");
//     }, 1);
//   });
//   const data = await promise.then((data) => data);

//   return {
//     props: {
//       dummyData: data,
//     },
//   };
// };

const CONNECT_MONGO = async () => {
  const uri = `mongodb+srv://praveen:tWrYq7QSaC3Ud4@cluster0.orewp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  const clientPromise = client.connect();
  console.log("CLient Connected !!");

  return clientPromise;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here
  const clientPromise = CONNECT_MONGO();

  const clientResponse = await clientPromise;
  const collection = clientResponse.db("NextJS_scenario");
  console.log("collection >>>>>", collection);

  return {
    props: {
      dummyData: "Lorem Ipsum",
    },
  };
};

export default AddAnScenario;