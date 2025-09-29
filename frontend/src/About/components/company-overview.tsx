import { ImageWithFallback } from './figma/ImageWithFallback';

export function CompanyOverview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl mb-6 text-[#012169]">
              Your Trusted Financial Partner
            </h2>
            <p className="text-gray-600 mb-6">
              For nearly four decades, TrustyFin Bank has been committed to providing exceptional financial services 
              to individuals, families, and businesses across our communities. We believe that banking should be 
              personal, transparent, and focused on helping our customers achieve their financial goals.
            </p>
            <p className="text-gray-600 mb-8">
              With over 150 branches nationwide and cutting-edge digital banking solutions, we combine the 
              convenience of modern technology with the personal touch that comes from deep community roots.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#e31837] mb-2">150+</div>
                <div className="text-gray-600">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#e31837] mb-2">2M+</div>
                <div className="text-gray-600">Customers</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1696441315090-fe40d27275f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYW5rJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NTgwNzUzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="TrustyFin Bank headquarters building"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}