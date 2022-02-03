import React from "react";
// import { useQuery, gql, useApolloClient } from "@apollo/client"

import SEO from "../components/seo";
import Layout from "../components/layout";
// import Loading from "../components/loading"
import Scene from "../components/scene";

// const IS_LOADED = gql`
//   query IsLoaded {
//     isLoaded @client
//   }
// `

const IndexPage = () => {
  // const client = useApolloClient()
  // const { data } = useQuery(IS_LOADED)
  return (
    <Layout>
      <SEO title="hola :D" />
      {/* <Loading
        onLoad={() =>
          client.writeQuery({
            query: gql`
              query IS_LOADED {
                isLoaded
              }
            `,
            data: { isLoaded: true },
          })
        }
        isLoaded={data && data.isLoaded}
      /> */}
      <Scene />
    </Layout>
  );
};

export default IndexPage;
