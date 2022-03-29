import DefaultPage from "../src/pages/DefaultPage";
import pagesGetStaticPaths from "../src/utils/initial-props/pagesGetStaticPaths";
import pagesGetStaticProps from "../src/utils/initial-props/pagesGetStaticProps";

export default DefaultPage

export const getStaticProps = pagesGetStaticProps
export const getStaticPaths = pagesGetStaticPaths