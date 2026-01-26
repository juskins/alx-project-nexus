import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import HowItWorks from '@/components/common/HowItWorks';
import WhyStudentsLove from '@/components/common/WhyStudentsLove';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <HowItWorks />
        <WhyStudentsLove />
      </main>
    </div>
  );
}