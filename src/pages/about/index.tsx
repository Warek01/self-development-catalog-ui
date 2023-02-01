import { FC } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'

const AboutPage: FC = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
    </>
  )
}

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
