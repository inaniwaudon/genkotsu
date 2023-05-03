import { IndexPage, IndexPageProps } from "@/components/pages/IndexPage";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async ({query}) => {
  const text = query.text
  const isValidString = typeof text === 'string' && text.length > 0
  return {
    props: {initialText: isValidString ? text : null}
  }
}

const Index: NextPage<IndexPageProps> = IndexPage

export default Index;