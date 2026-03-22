'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="label-tag mb-4">Legal</p>
            <h1 className="heading-hero mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Terms of Service
            </h1>
            <p className="text-[14px] text-[#787878] mb-12">Last updated: March 21, 2026</p>

            <div className="prose-custom space-y-8">
              <div>
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the OneWorldCourier platform (&ldquo;Service&rdquo;), you agree to be bound by
                  these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not use our Service.
                  These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </div>

              <div>
                <h2>2. Description of Service</h2>
                <p>
                  OneWorldCourier provides a real-time parcel tracking platform that allows businesses to create
                  shipments with unique tracking credentials, and allows recipients to track their parcels using
                  those credentials. Our Service includes:
                </p>
                <ul>
                  <li>Shipment creation and management (for authorized administrators)</li>
                  <li>Real-time parcel tracking with credential-based access</li>
                  <li>Shipment timeline and status updates</li>
                  <li>Contact and customer support functionality</li>
                </ul>
              </div>

              <div>
                <h2>3. User Accounts and Credentials</h2>
                <h3>3.1 Admin Accounts</h3>
                <p>
                  Admin accounts are created by OneWorldCourier for authorized business users. You are responsible
                  for maintaining the confidentiality of your admin credentials and for all activities that occur
                  under your account.
                </p>

                <h3>3.2 Tracking Credentials</h3>
                <p>
                  Each shipment is assigned a unique Tracking ID and password. These credentials are generated
                  by the admin and shared with the intended recipient. You must not share tracking credentials
                  with unauthorized third parties.
                </p>

                <h3>3.3 Account Security</h3>
                <p>
                  You agree to immediately notify OneWorldCourier of any unauthorized use of your account
                  or any other breach of security. We are not liable for any loss or damage arising from
                  your failure to safeguard your credentials.
                </p>
              </div>

              <div>
                <h2>4. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
                  <li>Attempt to gain unauthorized access to any part of the Service or its systems</li>
                  <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                  <li>Use automated means (bots, scrapers) to access the Service without permission</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Upload or transmit malicious code, viruses, or harmful content</li>
                  <li>Attempt to reverse-engineer or decompile any part of the Service</li>
                </ul>
              </div>

              <div>
                <h2>5. Shipment Tracking</h2>
                <h3>5.1 Accuracy of Information</h3>
                <p>
                  While we strive to provide accurate and up-to-date tracking information, OneWorldCourier
                  does not guarantee the absolute accuracy, completeness, or timeliness of shipment data.
                  Tracking information is provided as-is based on data entered by administrators and logistics partners.
                </p>

                <h3>5.2 Delivery Estimates</h3>
                <p>
                  Estimated delivery dates are approximations and are not guaranteed. Actual delivery times
                  may vary due to factors beyond our control, including weather, customs processing, and carrier delays.
                </p>
              </div>

              <div>
                <h2>6. Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and functionality are owned by OneWorldCourier
                  and are protected by international copyright, trademark, and other intellectual property laws.
                  You may not copy, modify, distribute, or create derivative works from any part of the Service
                  without our prior written consent.
                </p>
              </div>

              <div>
                <h2>7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, OneWorldCourier and its affiliates,
                  officers, employees, and agents shall not be liable for:
                </p>
                <ul>
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Any damages resulting from unauthorized access to your data</li>
                  <li>Any interruption or cessation of the Service</li>
                  <li>Any loss or damage to parcels being tracked through our platform</li>
                </ul>
                <p>
                  OneWorldCourier is a tracking platform and is not responsible for the physical handling,
                  transportation, or delivery of parcels. Liability for shipment-related issues rests with
                  the respective courier or logistics provider.
                </p>
              </div>

              <div>
                <h2>8. Disclaimer of Warranties</h2>
                <p>
                  The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any warranties
                  of any kind, either express or implied, including but not limited to implied warranties
                  of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
              </div>

              <div>
                <h2>9. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless OneWorldCourier and its affiliates from
                  any claims, damages, losses, liabilities, and expenses (including legal fees) arising from
                  your use of the Service or violation of these Terms.
                </p>
              </div>

              <div>
                <h2>10. Termination</h2>
                <p>
                  We may terminate or suspend your access to the Service immediately, without prior notice,
                  for any reason, including breach of these Terms. Upon termination, your right to use the
                  Service will immediately cease. All provisions of these Terms which by their nature should
                  survive termination shall survive.
                </p>
              </div>

              <div>
                <h2>11. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India,
                  without regard to its conflict of law provisions. Any disputes arising under these Terms
                  shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </div>

              <div>
                <h2>12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material,
                  we will provide at least 30 days&rsquo; notice prior to any new terms taking effect. What constitutes
                  a material change will be determined at our sole discretion. Your continued use of the Service
                  after any changes constitutes acceptance of the new Terms.
                </p>
              </div>

              <div>
                <h2>13. Contact Us</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us through our
                  contact page or email us at support@oneworldcourier.com.
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
