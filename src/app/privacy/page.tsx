'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="label-tag mb-4">Legal</p>
            <h1 className="heading-hero mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Privacy Policy
            </h1>
            <p className="text-[14px] text-[#787878] mb-12">Last updated: March 21, 2026</p>

            <div className="prose-custom space-y-8">
              <div>
                <h2>1. Introduction</h2>
                <p>
                  OneWorldCourier (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the privacy of our users.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
                  parcel tracking platform and related services.
                </p>
              </div>

              <div>
                <h2>2. Information We Collect</h2>
                <h3>2.1 Personal Information</h3>
                <p>We may collect the following personal information:</p>
                <ul>
                  <li>Name and contact details (phone number, email address)</li>
                  <li>Shipment tracking credentials (Tracking ID, password)</li>
                  <li>Messages submitted through our contact form</li>
                  <li>IP address and browser information for security purposes</li>
                </ul>

                <h3>2.2 Shipment Data</h3>
                <p>We collect and store shipment-related data including:</p>
                <ul>
                  <li>Sender and recipient information</li>
                  <li>Package details (weight, dimensions, contents description)</li>
                  <li>Shipment status updates and timeline history</li>
                  <li>Delivery location and estimated delivery dates</li>
                </ul>

                <h3>2.3 Automatically Collected Information</h3>
                <p>
                  When you access our platform, we may automatically collect device information, browser type,
                  operating system, access times, and pages viewed. This information helps us improve our services.
                </p>
              </div>

              <div>
                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information to:</p>
                <ul>
                  <li>Provide real-time parcel tracking services</li>
                  <li>Authenticate users and secure shipment access</li>
                  <li>Send shipment status notifications and updates</li>
                  <li>Respond to customer inquiries and support requests</li>
                  <li>Improve our platform, features, and user experience</li>
                  <li>Ensure security and prevent unauthorized access</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2>4. Data Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share data with:</p>
                <ul>
                  <li><strong>Logistics partners:</strong> To facilitate shipment delivery and tracking</li>
                  <li><strong>Service providers:</strong> Third-party services that help us operate our platform (hosting, analytics)</li>
                  <li><strong>Legal authorities:</strong> When required by law, court order, or government regulation</li>
                </ul>
              </div>

              <div>
                <h2>5. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul>
                  <li>Encrypted credential-based access for all shipment data</li>
                  <li>Secure HTTPS connections across our entire platform</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls limiting data access to authorized personnel only</li>
                </ul>
                <p>
                  While we strive to protect your information, no method of transmission over the Internet
                  is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2>6. Data Retention</h2>
                <p>
                  We retain personal and shipment data for as long as necessary to provide our services and
                  fulfill the purposes outlined in this policy. Shipment tracking data is retained for up to
                  12 months after delivery completion. Contact form submissions are retained for up to 6 months.
                </p>
              </div>

              <div>
                <h2>7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Lodge a complaint with a data protection authority</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us through our contact page.
                </p>
              </div>

              <div>
                <h2>8. Cookies</h2>
                <p>
                  Our platform uses essential cookies to maintain session state and authentication tokens.
                  We do not use tracking cookies or third-party advertising cookies. Authentication tokens
                  are stored in your browser&rsquo;s local storage and are used solely for session management.
                </p>
              </div>

              <div>
                <h2>9. Children&rsquo;s Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 13. We do not knowingly
                  collect personal information from children. If we become aware that we have collected
                  data from a child, we will take steps to delete it promptly.
                </p>
              </div>

              <div>
                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material
                  changes by posting the updated policy on this page with a revised &ldquo;Last updated&rdquo; date.
                  Your continued use of our services after any changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please reach out
                  to us through our contact page or email us at support@oneworldcourier.com.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
