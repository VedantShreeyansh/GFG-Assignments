

const Services = () => {
  return (
    <section id="services" className="flex justify-center items-center py-12 mx-3">
      <div className="rounded-lg shadow-lg max-w-6xl w-full p-8 bg-white">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Services</h2>
        <ul className="space-y-3">
          <li>
            <h3 className="text-xl font-semibold">Product Sourcing</h3>
            <p>We help you find and source the best products from trusted suppliers, ensuring quality and value for your needs.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Custom Orders</h3>
            <p>Place personalizes or bulk orders tailored to your requirements, including custom packaging and branding.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Fast & Secure Shipping</h3>
            <p>Enjoy quick, reliable and trackable shipping options to your doorstep, with secure packaging for every order.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Gift Wrapping</h3>
            <p>Make your gifts special with our premium gifts wrapping and personalized message services.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">24/7 Customer Support</h3>
            <p>Our support team is available around the clock to assist you with any queries or issues.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Easy Returns & Exchanges</h3>
            <p>Hassle-free returns and exchanges within 30 days, ensuring your complete satisfaction.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Services;