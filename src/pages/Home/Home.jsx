import { Header } from '../../components/Header/Header'
import { Hero } from '../../components/Hero/Hero'
import { TrustBar } from '../../components/TrustBar/TrustBar'
import { About } from '../../components/About/About'
import { Services } from '../../components/Services/Services'
import { Process } from '../../components/Process/Process'
import { Gallery } from '../../components/Gallery/Gallery'
import { CTA } from '../../components/CTA/CTA'
import { Footer } from '../../components/Footer/Footer'
import { WhatsAppButton } from '../../components/WhatsAppButton/WhatsAppButton'

export function Home({ content }) {
  return (
    <>
      <Header content={content} />
      <main>
        <Hero content={content} />
        <TrustBar content={content} />
        <About content={content} />
        <Services content={content} />
        <Process content={content} />
        <Gallery content={content} />
        <CTA content={content} />
      </main>
      <Footer content={content} />
      <WhatsAppButton content={content} />
    </>
  )
}
