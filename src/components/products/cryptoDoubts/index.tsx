import Doubts from './doubts';

export default function CryptoDoubts({
  doubts,
}: {
  doubts: { title: string; description: string }[];
}) {
  return (
    <section className="w-full bg-primary px-20 py-14">
      <h2 className="text-2xl text-black font-normal">Doubts?</h2>
      {doubts.map((val, index) => (
        <Doubts
          key={index.toString()}
          title={val.title}
          description={val.description}
        />
      ))}
    </section>
  );
}
