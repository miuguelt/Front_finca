import IndexSection from "@/components/landing/IndexSection";
import FeatureCard from "@/components/landing/FeatureCard";
import Gallery from "@/components/landing/Gallery";
import AboutSection from "@/components/landing/AboutSection";

import { features, images } from "@/data";

const LandingPage = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <>
          <IndexSection />

          <section
            id="caracteristicas"
            className="py-16 flex h-auto bg-gray-100"
          >
            <div className="container m-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">
                Características del Sistema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4">
                {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
                ))}
              </div>
            </div>
          </section>

          <Gallery images={images} />

          <AboutSection />
        </>
      </main>
    </div>
  );
}

export default LandingPage;
