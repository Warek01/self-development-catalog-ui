import { FC } from 'react'
import { GetStaticProps } from 'next'

const AboutPage: FC = () => {
  return <div>About</div>
}

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {}
  }
}
