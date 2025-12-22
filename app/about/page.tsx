import PromoBar from '@/components/PromoBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// OPTIMIZATION: Enable ISR (Incremental Static Regeneration) to reduce server CPU load
// This page is static and doesn't need real-time data, so we can cache it
export const revalidate = 3600; // Revalidate every hour (ISR)

const values = [
  {
    title: 'Quality First',
    description: 'We maintain the highest standards in all our products and services',
    icon: '✓',
  },
  {
    title: 'Customer Focus',
    description: 'Your success is our priority. We build lasting partnerships',
    icon: '👥',
  },
  {
    title: 'Innovation',
    description: 'Continuously evolving to meet the latest technological demands',
    icon: '💡',
  },
  {
    title: 'Reliability',
    description: 'Trusted by industry leaders for consistent, dependable solutions',
    icon: '🔒',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900">
      <PromoBar />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About Dev Tech Enterprises
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the industry in electronic components and solutions since our founding
          </p>
        </section>

        {/* Company Story */}
        <section className="mb-16 md:mb-24">
          <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Dev Tech Enterprises was founded with a vision to provide high-quality electronic components 
                and solutions to businesses worldwide. We specialize in semiconductors, sensors, cables & wires, 
                switches, and laboratory equipment.
              </p>
              <p>
                Over the years, we have built a reputation for excellence, reliability, and innovation. 
                Our team of experienced professionals works tirelessly to ensure that our customers receive 
                the best products and services in the industry.
              </p>
              <p>
                We understand that every project is unique, and we pride ourselves on offering customized 
                solutions that meet the specific needs of our clients. From small startups to large enterprises, 
                we serve customers across various industries including electronics, automotive, aerospace, 
                telecommunications, and research institutions.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all shadow-sm"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16 md:mb-24">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 md:p-12 text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              To empower businesses and innovators with cutting-edge electronic components and solutions, 
              fostering technological advancement and driving success in an ever-evolving digital world.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partner With Us
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust Dev Tech Enterprises for their electronic component needs
          </p>
          <a
            href="/contact"
            className="inline-block bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Get in Touch
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

