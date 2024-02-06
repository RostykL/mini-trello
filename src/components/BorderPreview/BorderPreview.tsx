interface BorderPreviewProps {
  title: string;
}
const BorderPreview = ({ title }: BorderPreviewProps) => {
  return (
    <div className="aspect-[2/1] w-full max-w-[250px] rounded bg-gray-800 text-white p-2 font-bold">
      {title}
    </div>
  );
};

export default BorderPreview;
