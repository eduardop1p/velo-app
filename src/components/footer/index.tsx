import { FaComments, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

import LogoTitle from '../logoTitle';

export default function Footer({ footerAddress }: { footerAddress?: boolean }) {
  return (
    <footer>
      <section className="bg-black w-full flex px-20 py-8 flex-col gap-4">
        <LogoTitle fontSize="text-4xl" color="text-primary" />
        <div className="flex w-full gap-5">
          <div className="flex flex-col gap-2 w-1/4">
            <span className="border-b-2 border-solid border-primary pb-1 text-base text-primary font-semibold">
              Contact us
            </span>
            <span className="text-xs text-primary font-normal">
              Service 24 hours a day, 7 days a week
            </span>
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <div className="flex border-b-2 border-solid border-primary pb-1 items-center gap-2">
              <div className="w-6 h-6 fill-primary flex-none">
                <FaComments />
              </div>
              <span className="text-base text-primary font-semibold">
                In-app chat and email
              </span>
            </div>
            <span className="text-xs text-primary font-normal">
              Support via in-app chat, 24 hours a day, 7 days a week.
            </span>
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <span className="text-base text-primary font-semibold border-b-2 border-solid border-primary pb-1">
              Social media
            </span>
            <div className="flex gap-4">
              <Link
                className="w-6 h-6 fill-primary flex-none"
                href="https://www.instagram.com/velo/"
              >
                <FaInstagram />
              </Link>
              <Link
                className="w-6 h-6 fill-primary flex-none"
                href="https://www.youtube.com/channel/velo"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/4">
            <span className="text-base text-primary font-semibold border-b-2 border-solid border-primary pb-1">
              Unlock your crypto world
            </span>
            <div className="flex gap-4">
              <Image
                width={126}
                height={68}
                className="flex-none rounded"
                src="/assets/imgs/velo-img-11.png"
                alt="velo-img-11"
              />
              <Image
                width={126}
                height={68}
                className="flex-none rounded"
                src="/assets/imgs/velo-img-12.png"
                alt="velo-img-12"
              />
            </div>
          </div>
        </div>
      </section>
      {footerAddress && (
        <section className="bg-footer-gray w-full px-20 py-5 flex justify-between items-center">
          <div className="text-primary text-sm font-normal">
            <p className="text-inherit">@{new Date().getFullYear()} Velo</p>
            <p className="text-inherit">VELO CRYPTO TECHNOLOGY</p>
          </div>
          <div className="text-primary text-sm font-normal">
            <p className="text-inherit">
              Lönnrotinkatu 31, 00180 Helsinki, Finland
            </p>
          </div>
          <Link
            href="/privacy-policy"
            className="text-sm text-primary font-normal hover:text-blue transition-colors duration-200"
          >
            Terms and Policies | Disclaimer
          </Link>
        </section>
      )}
    </footer>
  );
}
