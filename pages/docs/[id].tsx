import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllDocIds, getDocData } from "../../lib/docs";

const Post: NextPage = (props: any) => {
  console.log(props);
  return <p> Hi</p>;
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = getDocData(params!.id as string);
  return {
    props: {
      postData,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllDocIds();
  return {
    paths,
    fallback: false,
  };
};
