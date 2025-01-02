import Link from "next/link";

const page = () => {
  return (
    <section className=" py-4 lg:py-10">
      <div className="container">
        <div className=" flex flex-col gap-3">
          <p>
            <span>
              <b>PRIVACY POLICY</b>
            </span>
          </p>
          <div>
            <p>
              We respect and value your privacy. Please note that this Privacy
              Policy is in relation to our website (hereinafter referred to as
              “we”or “us”).
            </p>
            <p>
              We are committed to ensure protection of personally identifiable
              information that is provided to us via our website. This Privacy
              Policy explains the type of information collected from you, how
              the information is used and under what circumstances we may
              disclose the information to third parties. You should take note
              that this Privacy Policy can only be applied on information
              collected by us via our website and cannot be applied to
              information collected from other sources.
            </p>
          </div>
          <p>
            <b>1. Website Users </b>
          </p>
          <div>
            <p>
              As standard practice, we collect non-personally identifying
              information that is made available by servers and web browsers.
              This general information is such as date and time of each user
              request, type of browser, referring site and language preference.
              Our sole reason for collecting non-personally identifying
              information is to ensure we understand our users better.
            </p>
            <p>
              We collect other types of personally identifying information such
              as Internet Protocol (IP) for users who log in to our site. We
              only disclose log in information and IP addresses as per the
              guidelines provided herein below.
            </p>
          </div>
          <p>
            <b>2. Collection of Personally-Identifying Information </b>
          </p>
          <p>
            Many at times users to our website tend to engage us in a manner
            that requires us to collect their personally-identifying
            information. The type and amount of information we collect from the
            user will be influenced by the nature of interaction between the
            user and our website.
          </p>
          <p>
            <b>3. How do we collect your personal data?</b>
          </p>
          <div>
            <p>We collect your personal data in the following ways:</p>
            <ul>
              <li>
                <span>When you sign up </span>– when you sign up, we collect
                certain personal data, so you can use our website such as your
                email address and name.
              </li>
              <li>
                <span>Through your use of our website</span>– when you use our
                website, we collect personal data about your use of our website,
                such as what keywords you are tracking.
              </li>
              <li>
                <span>
                  Personal data collected that enables us to provide you with
                  additional features/functionality
                </span>
                &nbsp;– from time to time, you also may provide us with
                additional personal data or give us your permission to collect
                additional personal data e.g. to provide you with more features
                or functionality. You always will have the option to change your
                mind and withdraw your consent at any time.
              </li>
              <li>
                <span>From third parties</span>&nbsp;– we will receive personal
                data about you and your activity from third parties, including
                advertisers and partners we work with in order to provide you
                with the use of our services.
              </li>
            </ul>
          </div>
          <p>
            <b>4. Security of Personal Information </b>
          </p>
          <p>
            Security for all personal information is extremely important to us.
            We have implemented technical, administrative and physical security
            measures to attempt to protect your personal information from
            unauthorized access and improper use. We also protect your personal
            information offline.
            <span>&nbsp; </span>The computers/servers in which we store personal
            information are kept in a secure environment. We continually review
            all such measures and update them when appropriate.
          </p>
          <p>
            <b>5. Link to other sites </b>
          </p>
          <p>
            We submit that the service we offer through our website may contain
            links to external third party websites that are not under our
            control. In the event a user clicks on a third party link they will
            be automatically redirected to a third party website. We advise that
            the user reviews the Terms and Conditions as well as Privacy Policy
            of the other external sites every time they visit.
          </p>
          <p>
            <b>6. Use of Cookies</b>
          </p>
          <p>
            Cookies are pieces of information that a website transfers to an
            individual’s computer hard drive for record keeping purposes.
            Cookies make using our website easier by, among other things, saving
            your passwords and preferences for you. These cookies are restricted
            for use only on our website, and do not transfer any personal
            information to any other party. Most browsers are initially set up
            to accept cookies. You can, however, reset your browser to refuse
            all cookies or indicate when a cookie is being sent. Please consult
            the technical information relevant to your browser for instructions.
            If you choose to disable your cookies setting or refuse to accept a
            cookie, some parts of the website may not function properly or may
            be considerably slower.
          </p>
          <p>
            <b>7.</b> <b>Acceptance </b>
          </p>
          <div>
            <p>
              7.1 You agree that if you are unsure of the meaning of any part of
              this Privacy Policy or have any questions or complaints regarding
              this Privacy Policy, you will not hesitate to contact us.
            </p>
            <p>
              7.2<b> </b>By using the website, you accept the policies set forth
              in this Privacy Policy. If you do not agree to this policy, please
              do not use the website. This Privacy Policy may be revised from
              time to time. You are bound by any such revisions and should
              therefore periodically visit our website to review the then
              current Privacy Policy to which you are bound.
            </p>
          </div>
          <p>
            <b>8.</b> <b>Data Deletion Requests</b>
          </p>
          <p>
            Users have the right to request the deletion of their personal data
            held by Gigg’s meat. To initiate a data deletion request, please go
            to <Link href="/contact-us">contact us</Link> page and fill out a
            form. We will respond to your request within 3-4 days and will
            proceed with the deletion of your data in accordance with applicable
            laws and regulations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
