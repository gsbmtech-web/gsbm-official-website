import { Helmet } from 'react-helmet-async';
import './PrivacyPolicy.css';

// ─────────────────────────────────────────────────────────────────────
// NOTE FOR MAINTAINERS
// Placeholders marked with [ ] must be filled before this is published.
// Review this page whenever a new tracking tool, form provider, or CRM
// is added to the site — an undisclosed processor is the most common
// reason a policy stops being accurate.
// ─────────────────────────────────────────────────────────────────────

const LAST_UPDATED = 'August 2026';

const CONTACT = {
  email: 'admissions@gsbm.co.in',
  phone: '+91 86676 90672',
  phoneHref: '+918667690672',
  address:
    "Ganesan School of Business Management, VMRF Campus, Vinayaka Nagar, Rajiv Gandhi Salai (Old Mahabalipuram Road), Chennai, Tamil Nadu, India",
};

const PrivacyPolicy = () => (
  <div className="pp-page">
    <Helmet>
      <title>Privacy Policy | GSBM – Ganesan School of Business Management</title>
      <meta
        name="description"
        content="How Ganesan School of Business Management (GSBM), Chennai collects, uses, stores and protects personal information submitted through its website, admission forms and advertising channels."
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.gsbm.co.in/privacy-policy" />
    </Helmet>

    <div className="pp-container">
      <header className="pp-header">
        <h1 className="pp-title">Privacy Policy</h1>
        <p className="pp-updated">Last updated: {LAST_UPDATED}</p>
      </header>

      <p className="pp-lead">
        Ganesan School of Business Management (&ldquo;GSBM&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) operates the MBA programme awarded by Vinayaka Mission&rsquo;s
        Research Foundation (Deemed to be University). This policy explains what personal
        information we collect through this website, our admission and enquiry forms and
        our advertising channels, how we use it, who we share it with, and the choices
        available to you.
      </p>

      <p className="pp-text">
        This policy applies to <strong>www.gsbm.co.in</strong> and to enquiry forms we
        operate on third-party advertising platforms. It does not apply to websites
        operated by other organisations that we may link to.
      </p>

      <section className="pp-section">
        <h2 className="pp-heading">1. Information We Collect</h2>
        <p className="pp-text">
          <strong>Information you provide.</strong> When you submit an admission
          application, enquiry form, callback request, blog contact form or scholarship
          query — on this website or through an advertising platform such as Google,
          Meta (Facebook and Instagram) or LinkedIn — we collect:
        </p>
        <ul className="pp-list">
          <li>Name and contact details, including phone number and email address</li>
          <li>Educational background, qualification and entrance examination details</li>
          <li>Work experience details, where you choose to provide them</li>
          <li>Documents you upload as part of an application, such as marksheets and identity proof</li>
          <li>Any other information you voluntarily include in your message</li>
        </ul>

        <p className="pp-text">
          <strong>Information collected automatically.</strong> When you visit this
          website, certain technical information is recorded by us and by the analytics
          and advertising services described in Section 4:
        </p>
        <ul className="pp-list">
          <li>IP address, approximate location, browser type, device type and operating system</li>
          <li>Pages visited, time spent, referring website and search terms that led you here</li>
          <li>Advertising identifiers such as the Google click identifier (GCLID), where you arrive from an advertisement</li>
        </ul>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">2. Why We Use Your Information</h2>
        <p className="pp-text">We use the information described above to:</p>
        <ul className="pp-list">
          <li>Respond to your enquiry and provide information about our MBA programme, specialisations, fees and scholarships</li>
          <li>Process and evaluate your application, including eligibility verification and interview scheduling</li>
          <li>Contact you by phone, email, SMS or WhatsApp regarding admissions and related follow-up</li>
          <li>Send admission updates, deadline reminders and programme announcements</li>
          <li>Understand how our website and advertising campaigns perform, and improve them</li>
          <li>Maintain institutional records and comply with applicable legal, regulatory and university requirements</li>
        </ul>
        <p className="pp-text">
          We process your information on the basis of the consent you give when
          submitting a form, and for the legitimate purposes of administering admissions
          and meeting our legal obligations. We do not use your personal information for
          automated decision-making that produces legal effects concerning you.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">3. Who We Share Information With</h2>
        <p className="pp-text">
          <strong>We do not sell or rent your personal information.</strong> We share it
          only in the following circumstances:
        </p>
        <ul className="pp-list">
          <li>
            <strong>Within GSBM</strong> — with our admissions, academic and placement
            teams, on a need-to-know basis
          </li>
          <li>
            <strong>Vinayaka Mission&rsquo;s Research Foundation</strong> — as the
            degree-awarding university, for admission verification, enrolment and
            examination purposes
          </li>
          <li>
            <strong>Service providers</strong> — organisations that operate parts of our
            infrastructure on our behalf, including our form and CRM provider (Zoho),
            website hosting provider (Vercel) and communication tools. These providers
            process data only on our instructions
          </li>
          <li>
            <strong>Regulatory and statutory authorities</strong> — where disclosure is
            required by law, court order, or by a regulator such as AICTE or UGC
          </li>
        </ul>
        <p className="pp-text">
          Some of these service providers operate infrastructure outside India. Where
          information is transferred outside India, we take reasonable steps to ensure it
          continues to be protected to a comparable standard.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">4. Cookies, Analytics and Advertising</h2>
        <p className="pp-text">
          This website uses cookies and similar technologies. Cookies that are strictly
          necessary allow the site to function — for example, remembering that you have
          already dismissed a notice. Other cookies help us understand site usage and
          measure our advertising.
        </p>
        <p className="pp-text">The third-party services we currently use include:</p>
        <ul className="pp-list">
          <li>
            <strong>Google Analytics and Google Ads</strong> — to measure website traffic
            and the performance of our advertising campaigns, including conversion
            tracking and remarketing
          </li>
          <li>
            <strong>Meta Pixel</strong> — to measure the performance of advertising on
            Facebook and Instagram
          </li>
          <li>
            <strong>Vercel Analytics</strong> — to measure website performance
          </li>
          <li>
            <strong>Zoho Forms</strong> — to receive and process application submissions
          </li>
        </ul>
        <p className="pp-text">
          These providers may set their own cookies and process data under their own
          privacy policies. You can control or delete cookies through your browser
          settings, and you can opt out of personalised advertising through the settings
          offered by Google and Meta. Blocking cookies may affect how parts of this
          website function.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">5. How Long We Keep Information</h2>
        <p className="pp-text">
          We retain enquiry and application information for as long as necessary to
          respond to you, process your application, and meet the record-keeping
          requirements that apply to admissions and academic records. Where you enrol,
          your information is retained as part of your student record in accordance with
          university and regulatory requirements. Where you do not enrol, we retain your
          enquiry details for a limited period so that we can respond to follow-up
          questions and future admission cycles, after which the information is deleted
          or anonymised.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">6. How We Protect Information</h2>
        <p className="pp-text">
          We apply reasonable technical and organisational safeguards to protect personal
          information against unauthorised access, alteration, disclosure or destruction.
          These include encrypted connections to this website, access controls limiting
          who within GSBM can view application data, and the use of established service
          providers for form handling and hosting. No method of transmission or storage
          is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">7. Your Rights and Choices</h2>
        <p className="pp-text">
          Subject to applicable law, including the Digital Personal Data Protection Act,
          2023, you may:
        </p>
        <ul className="pp-list">
          <li>Request access to the personal information we hold about you</li>
          <li>Ask us to correct information that is inaccurate, incomplete or out of date</li>
          <li>Request deletion of your personal information, where we are not required to retain it</li>
          <li>Withdraw the consent you previously gave, at any time</li>
          <li>Ask us to stop sending you promotional communications</li>
          <li>Nominate another individual to exercise these rights on your behalf in the event of your death or incapacity</li>
        </ul>
        <p className="pp-text">
          To exercise any of these rights, contact us using the details in Section 10. We
          may need to verify your identity before acting on a request. Withdrawing
          consent does not affect processing carried out before the withdrawal, and may
          mean we are unable to progress your application.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">8. Children&rsquo;s Information</h2>
        <p className="pp-text">
          Our programmes are intended for graduates, and this website is not directed at
          children. We do not knowingly collect personal information from a child without
          verifiable consent from a parent or lawful guardian. If you believe a child has
          provided information to us, contact us and we will take appropriate steps to
          delete it.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">9. Changes to This Policy</h2>
        <p className="pp-text">
          We may update this policy to reflect changes in our practices, the services we
          use, or applicable law. The revised version will be published on this page with
          an updated date at the top. We encourage you to review it periodically.
        </p>
      </section>

      <section className="pp-section">
        <h2 className="pp-heading">10. Contact and Grievance Redressal</h2>
        <p className="pp-text">
          For any question about this policy, or to exercise the rights described in
          Section 7, contact the GSBM Admissions Office:
        </p>
        <ul className="pp-contact">
          <li>
            <span className="pp-contact-label">Email</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            <span className="pp-contact-label">Phone</span>
            <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
          </li>
          <li>
            <span className="pp-contact-label">Address</span>
            <span>{CONTACT.address}</span>
          </li>
        </ul>
        <p className="pp-text">
          If your concern is not resolved to your satisfaction, you may escalate it to our
          Grievance Officer, appointed in accordance with applicable Indian law:{' '}
          <strong>[Grievance Officer name]</strong>, <strong>[grievance officer email]</strong>.
          We aim to acknowledge grievances within a reasonable period and to resolve them
          promptly.
        </p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;