export default function FormLoading() {
  return (
    <div className="w-full h-full bg-blue rounded cursor-default absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
      <div className="w-6 h-6 flex-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            margin: 'auto',
            background: 'transparent',
            display: 'block',
            shapeRendering: 'auto',
            animationPlayState: 'running',
            animationDelay: '0s',
          }}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#fff"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
            style={{
              animationPlayState: 'running',
              animationDelay: '0s',
            }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              style={{
                animationPlayState: 'running',
                animationDelay: '0s',
              }}
            ></animateTransform>
          </circle>
        </svg>
      </div>
    </div>
  );
}
