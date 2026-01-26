import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import HowItWorks from '@/components/common/landingPage/HowItWorks';
import WhyStudentsLove from '@/components/common/landingPage/WhyStudentsLove';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyStudentsLove />
      </main>
      <Footer />
    </div>
  );
}