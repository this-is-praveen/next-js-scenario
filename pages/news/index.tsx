// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from "next";

const NewsPage = (props: any) => {
  console.log("props :>> ", props);
  return <>News Page {props.dummyData}</>;
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Lorem from SSR");
    }, 5000);
  });
  const data = await promise.then((data) => data);

  return {
    props: {
      dummyData: data,
    },
  };
};

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   // const { data } = await  // your fetch function here
//   console.log("ctx", ctx);

//   return {
//     props: {
//       dummyData: "Lorem Ipsum",
//     },
//     revalidate: 2,
//   };
// };

export default NewsPage;
