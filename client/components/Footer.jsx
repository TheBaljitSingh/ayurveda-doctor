import React from 'react'
import { FaLeaf } from "react-icons/fa6";

export default function Footer() {
  return (
    <div>

  {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaLeaf className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">AyurVeda Portal</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted partner in traditional Ayurvedic healing and natural wellness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Consultation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Panchakarma
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Herbal Medicine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Lifestyle Counseling
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Our Doctors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 info@ayurvedaportal.com</p>
                <p>📞 +91 1234 567 789</p>
                <p>📍 123 Wellness Street, Mumbai</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AyurVeda Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
