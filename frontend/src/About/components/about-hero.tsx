import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-r from-[#012169] to-[#1e3a8a] text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            TrustyFin Bank
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Building stronger communities through trusted financial partnerships since 1985
          </p>
        </div>
      </div>
    </section>
  );
}