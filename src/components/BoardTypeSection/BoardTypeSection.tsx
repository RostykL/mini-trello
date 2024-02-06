import BorderPreview from "src/components/BorderPreview";

interface BoardTypeSectionProps {
  title: string;
}

const BoardTypeSection = ({ title }: BoardTypeSectionProps) => {
  return (
    <article>
      <h1 className="text-2xl font-bold tracking-wider text-gray-800">
        {title}
      </h1>
      <section className="p-2">
        <BorderPreview title="Закупи" />
      </section>
    </article>
  );
};

export default BoardTypeSection;
