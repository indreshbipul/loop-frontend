import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'

const heroImages = [
  'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1635749045243-dcc5c09e3032?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1647013629840-13c441a3221b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const aboutImage =
  'https://images.unsplash.com/photo-1692975444489-1e1b6fd82190?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' ;

  const aboutImageFallback =
  [
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1654861577468-dd7a0c2fcbfa?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ]

function Index() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex flex-col items-center font-[Inter,sans-serif]">

      {/* Hero Section */}
      <section className="w-[95%] max-w-7xl bg-white/95 rounded-3xl shadow-2xl p-8 md:p-12 mt-6 md:mt-10 flex flex-col md:flex-row items-center gap-10 animate-fade-in border border-gray-100 backdrop-blur-sm">
        <div className="w-full md:w-1/2 relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="rounded-2xl shadow-xl"
          >
            {heroImages.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative">
                  <img
                    src={src}
                    alt={`Luxury shopping scene ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-72 object-cover rounded-2xl transition-transform duration-500 hover:scale-105 border border-gray-200"
                    onError={e => { e.target.src = '/fallback.jpg' }}
                  />
                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight text-center leading-tight font-serif drop-shadow-lg">
            Loop Into Luxury
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 text-center font-medium">
            Authentic Luxury. Unbeatable Prices.<br />Only at <span className="text-black font-bold">Loop</span>.
          </p>
          <Link
            to="/product"
            className="inline-block px-10 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-full shadow-lg hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            aria-label="Shop luxury products"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* About/story Section */}
      <section id="about" className="w-[95%] max-w-7xl bg-white/95 rounded-3xl shadow-xl p-8 md:p-12 mt-10 flex flex-col md:flex-row items-center gap-10 animate-fade-in delay-200 border border-gray-100 backdrop-blur-sm">
        <img
          src={aboutImage}
          alt="Luxury brand authenticity tags"
          loading="lazy"
          className="w-full md:w-1/2 rounded-2xl shadow-lg mb-6 md:mb-0 max-h-96 object-cover border border-gray-200"
          onError={e => { e.target.src = '/fallback.jpg' }}
        />
        <div className="w-full md:w-1/2 flex flex-col items-stretch">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center font-serif">.....?</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 text-center leading-relaxed">
            Step into a world where high fashion meets smart value. At <span className="font-bold text-black">Loop</span>, we bring you genuine luxury clothing from the world’s most prestigious brands—<span className="font-semibold text-gray-900">at prices that make sense</span>.
            Every piece we offer is <span className="font-semibold text-gray-900">100% authentic</span>, curated with care, and designed to elevate your wardrobe without inflating your budget.
          </p>
           <Link
            to="/product"
            className="inline-block px-10 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-full shadow-lg hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
            aria-label="Shop luxury products"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Why Loop Section */}
      <section id="why" className="w-[95%] max-w-7xl bg-white/95 rounded-3xl shadow-xl p-8 md:p-12 mt-10 mb-10 flex flex-col items-center gap-10 animate-fade-in delay-400 border border-gray-100 backdrop-blur-sm">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center font-serif">Why Choose Loop?</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="rounded-2xl shadow-lg w-full mb-6"
          spaceBetween={30}
          slidesPerView={1}
        >
          {aboutImageFallback.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={src}
                alt={`Why Loop value visual ${idx + 1}`}
                loading="lazy"
                className="w-full h-60 object-cover rounded-2xl border border-gray-200"
                onError={e => { e.target.src = '/fallback.jpg' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed max-w-3xl">
          Whether you're looking for timeless classics or the latest runway trends, <span className="font-bold text-black">Loop</span> is your trusted destination for
          <span className="font-semibold text-gray-900"> premium quality, original style, and unbeatable value</span>.<br />
          Because true luxury <span className="font-bold">isn't just about the label—it's about how confidently you wear it.</span>
        </p>
      </section>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1);
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
        `}
      </style>
      {/* Google Fonts  */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
    </div>
  )
}

export default Index