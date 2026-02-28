export default function Footer() {
    return (
      <footer className="bg-[#0b1220] text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">SmartCatalogue</h3>
            <p className="text-sm">
              Empowering small businesses to create beautiful product catalogues.
            </p>
          </div>
  
          <div>
            <h4 className="text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Templates</li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
  
        <p className="text-center text-sm text-gray-400 mt-12">
          © 2026 SmartCatalogue. All rights reserved.
        </p>
      </footer>
    );
  }
  