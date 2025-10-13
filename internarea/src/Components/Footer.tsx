import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-white text-xl font-bold">InternArea</h2>
          <p className="mt-3 text-sm">
            Empowering students with internships, jobs, and trainings to
            kickstart their career journey.
          </p>
        </div>

        {/* Internships */}
        <div>
          <h3 className="text-white font-semibold mb-3">Internships</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">By Location</a></li>
            <li><a href="#" className="hover:text-white">By Stream</a></li>
            <li><a href="#" className="hover:text-white">Summer Internships</a></li>
            <li><a href="#" className="hover:text-white">Work from Home</a></li>
          </ul>
        </div>

        {/* Jobs & Trainings */}
        <div>
          <h3 className="text-white font-semibold mb-3">Jobs & Trainings</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Fresher Jobs</a></li>
            <li><a href="#" className="hover:text-white">Online Trainings</a></li>
            <li><a href="#" className="hover:text-white">Placement Guarantee</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect with us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-blue-500" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="w-6 h-6 hover:text-blue-400" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-pink-500" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-sky-400" /></a>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm text-gray-400">
        <p className="mb-2 sm:mb-0">
          <i className="bi bi-geo-alt-fill mr-2"></i> Get Android App
        </p>

      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} InternArena. All rights reserved.
      </div>
    </footer>
  );
}
