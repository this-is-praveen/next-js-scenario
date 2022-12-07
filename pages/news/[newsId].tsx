import { useRouter } from "next/router";

const NewsDetailPage = () => {
  const router = useRouter();
  const pathName = router.query.newsId;
  console.log("pathName ", pathName);

  return (
    <>
      <h1>{pathName} Page</h1>
    </>
  );
};

export default NewsDetailPage;
