import { Metadata } from 'next';

import SearchFaq from '@/components/searchFaq';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Ask your questions in our FAQ | Velo',
};

export default function Page() {
  return (
    <>
      <main className="mt-20">
        <section className="flex flex-col px-20 py-14 items-center gap-4 bg-black-section">
          <h1 className="text-4xl font-medium text-primary">
            Common questions
          </h1>
          <div className="w-[350px] h-[290px] flex-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 310 278"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: '100%',
                height: '100%',
                transform: 'translate3d(0px, 0px, 0px)',
                contentVisibility: 'visible',
              }}
            >
              <defs>
                <clipPath>
                  <rect width="100%" height="100%" x="0" y="0"></rect>
                </clipPath>
                <linearGradient
                  id="__lottie_element_14"
                  spreadMethod="pad"
                  gradientUnits="userSpaceOnUse"
                  x1="-109.5"
                  y1="0.12399999797344208"
                  x2="109.5"
                  y2="0.12399999797344208"
                >
                  <stop offset="0%" stopColor="rgb(25,90,180)"></stop>
                  <stop offset="50%" stopColor="rgb(55,123,218)"></stop>
                  <stop offset="100%" stopColor="rgb(84,156,255)"></stop>
                </linearGradient>
                <linearGradient
                  id="__lottie_element_18"
                  spreadMethod="pad"
                  gradientUnits="userSpaceOnUse"
                  x1="-129"
                  y1="0.12399999797344208"
                  x2="129"
                  y2="0.12399999797344208"
                >
                  <stop offset="0%" stopColor="rgb(25,90,180)"></stop>
                  <stop offset="50%" stopColor="rgb(55,123,218)"></stop>
                  <stop offset="100%" stopColor="rgb(84,156,255)"></stop>
                </linearGradient>
              </defs>
              <g>
                <g
                  style={{ display: 'block' }}
                  transform="matrix(1,0,0,1,155.0035858154297,139.0020751953125)"
                  opacity="1"
                >
                  <g
                    opacity="1"
                    transform="matrix(0.8660253882408142,0.5,-0.5,0.8660253882408142,0,0)"
                  >
                    <path
                      fill="url(#__lottie_element_18)"
                      fillOpacity="1"
                      d=" M128.98715209960938,0 C128.98715209960938,0 128.98715209960938,0 128.98715209960938,0 C128.98715209960938,47.463401794433594 90.45055389404297,86 42.987152099609375,86 C42.987152099609375,86 -42.987152099609375,86 -42.987152099609375,86 C-90.45055389404297,86 -128.98715209960938,47.463401794433594 -128.98715209960938,0 C-128.98715209960938,0 -128.98715209960938,0 -128.98715209960938,0 C-128.98715209960938,-47.463401794433594 -90.45055389404297,-86 -42.987152099609375,-86 C-42.987152099609375,-86 42.987152099609375,-86 42.987152099609375,-86 C90.45055389404297,-86 128.98715209960938,-47.463401794433594 128.98715209960938,0z"
                    ></path>
                  </g>
                </g>
                <g
                  style={{ display: 'block' }}
                  transform="matrix(1,0,0,1,171.8855438232422,148.74916076660156)"
                  opacity="1"
                >
                  <g
                    opacity="1"
                    transform="matrix(0.8660253882408142,0.5,-0.5,0.8660253882408142,0,0)"
                  >
                    <path
                      fill="url(#__lottie_element_14)"
                      fillOpacity="1"
                      d=" M109.49297332763672,0 C109.49297332763672,0 109.49297332763672,0 109.49297332763672,0 C109.49297332763672,47.463401794433594 70.95637512207031,86 23.49297332763672,86 C23.49297332763672,86 -23.49297332763672,86 -23.49297332763672,86 C-70.95637512207031,86 -109.49297332763672,47.463401794433594 -109.49297332763672,0 C-109.49297332763672,0 -109.49297332763672,0 -109.49297332763672,0 C-109.49297332763672,-47.463401794433594 -70.95637512207031,-86 -23.49297332763672,-86 C-23.49297332763672,-86 23.49297332763672,-86 23.49297332763672,-86 C70.95637512207031,-86 109.49297332763672,-47.463401794433594 109.49297332763672,0z"
                    ></path>
                  </g>
                </g>
                <g
                  style={{ display: 'block' }}
                  transform="matrix(1,0,0,1,192.15548706054688,160.41966247558594)"
                  opacity="1"
                >
                  <g
                    opacity="1"
                    transform="matrix(0.8660253882408142,0.5,-0.5,0.8660253882408142,0,0)"
                  >
                    <path
                      fill="rgb(25,90,180)"
                      fillOpacity="1"
                      d=" M0,-86.05549621582031 C47.4940299987793,-86.05549621582031 86.05549621582031,-47.4940299987793 86.05549621582031,0 C86.05549621582031,47.4940299987793 47.4940299987793,86.05549621582031 0,86.05549621582031 C-47.4940299987793,86.05549621582031 -86.05549621582031,47.4940299987793 -86.05549621582031,0 C-86.05549621582031,-47.4940299987793 -47.4940299987793,-86.05549621582031 0,-86.05549621582031z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <SearchFaq />
        </section>
      </main>
      <Footer footerAddress />
    </>
  );
}
