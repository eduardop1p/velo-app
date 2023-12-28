import { Metadata } from 'next';
import Link from 'next/link';

import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Policies and Terms of Use | Velo',
};

export default function Page() {
  return (
    <>
      <main className="mt-20 bg-black p-10 flex justify-center items-center">
        <section className="bg-primary flex flex-col gap-4 w-full p-10 rounded">
          <div className="flex flex-col gap-2">
            <h1 className="text-black text-2xl font-medium ">
              Velo Wallet Terms of Service and Policy
            </h1>
            <h3 className="text-black text-lg font-medium">
              Last Updated: 2023/12/28
            </h3>
            <p className="text-sm text-black font-normal">
              Welcome to Velo Wallet, a secure and efficient cryptocurrency
              management solution. These Terms of Service and Privacy Policy
              establish the conditions governing the relationship between you,
              the user, and Velo Wallet. We recommend careful attention to these
              terms before proceeding to use our services.
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              1. Acceptance of Terms:
            </h1>
            <p className="text-sm text-black font-normal">
              By accessing or using Velo Wallet, you expressly agree to respect
              and fully comply with these Terms of Service. Any objection to any
              part of these terms should result in refraining from using our
              services.
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              2. Registration and Security:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                When registering with Velo Wallet, you agree to provide accurate
                and up-to-date information.
              </li>
              <li className="text-sm text-black font-normal">
                You are responsible for the confidentiality of your login
                credentials and must promptly notify us of any unauthorized
                activity on your account.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              3. Responsible Use:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                Velo Wallet is intended to be used ethically and legally. Misuse
                of services for illicit or harmful activities is not permitted.
              </li>
              <li className="text-sm text-black font-normal">
                Users commit to not interfering with the proper functioning of
                the platform and not harming other users.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              4. Data Protection:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                Our commitment to protecting your personal data is detailed in
                our Privacy Policy.
              </li>
              <li className="text-sm text-black font-normal">
                We use encryption and advanced security measures to ensure the
                integrity and confidentiality of transactions made through Velo
                Wallet.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              5. Risks and Investments:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                The value of cryptocurrencies is highly volatile, and users
                acknowledge assuming all risks associated with their
                investments.
              </li>
              <li className="text-sm text-black font-normal">
                We recommend diligent research and seeking financial advice
                before making significant investment decisions.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              6. Legal Compliance:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                Velo Wallet commits to complying with all applicable laws and
                regulations related to cryptocurrencies and financial
                transactions.
              </li>
              <li className="text-sm text-black font-normal">
                We actively collaborate with competent authorities to maintain
                the integrity and compliance of our service.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              7. Updates and Modifications:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                We reserve the right to modify these Terms of Service. Users
                will be notified of significant changes in advance, and
                continued use constitutes acceptance of the changes.
              </li>
              <li className="text-sm text-black font-normal">
                We will maintain records of previous versions of these Terms for
                user reference.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              8. Account Termination:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                We reserve the right to terminate accounts that violate these
                Terms of Service or engage in fraudulent activities.
              </li>
              <li className="text-sm text-black font-normal">
                In cases of account termination, we will provide prior
                notification when possible.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">
              9. Limitation of Liability:
            </h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                We are not liable for losses or damages arising from the use of
                Velo Wallet, except as required by law.
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-black text-lg font-medium ">10. Contact:</h1>
            <ul className="list-disc ml-4">
              <li className="text-sm text-black font-normal">
                For questions, suggestions, or concerns, our support team is
                available via{' '}
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="text-blue text-sm font-normal underline cursor-pointer"
                >
                  {process.env.NEXT_PUBLIC_EMAIL}
                </Link>{' '}
                and other contact methods listed on our website.
              </li>
            </ul>
            <p className="text-sm text-black font-normal">
              By proceeding to use Velo Wallet, you confirm your agreement with
              these Terms of Service. Thank you for choosing our platform, and
              we are committed to providing a secure and efficient experience in
              managing your cryptocurrencies.
            </p>
          </div>
        </section>
      </main>
      <Footer footerAddress />
    </>
  );
}
