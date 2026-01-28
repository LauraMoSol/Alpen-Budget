export default function GraphCard({ title, image }) {
  return (
    <div className="reveal bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center min-w-[300px]">
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <img src={image} alt={title} className="rounded-md object-contain" />
    </div>
  );
}
