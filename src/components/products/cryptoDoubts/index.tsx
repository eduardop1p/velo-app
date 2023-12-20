import Doubts from './doubts';

export default function CryptoDoubts({
  doubts,
}: {
  doubts: {
    doubts1: {
      title: string;
      description: string;
    };
    doubts2?: {
      title: string;
      description: string;
    };
    doubts3?: {
      title: string;
      description: string;
    };
    doubts4?: {
      title: string;
      description: string;
    };
    doubts5?: {
      title: string;
      description: string;
    };
  };
}) {
  return (
    <section className="w-full bg-primary px-20 py-14">
      <h2 className="text-2xl text-black font-normal">Doubts?</h2>
      <Doubts doubts={doubts} />
    </section>
  );
}
