export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="w-[90%] mx-auto mt-4 mb-6">
      <div className="relative inline-block ">
        <h1 className="text-4xl font-bold text-gray-900 relative z-10 inline-block">
          {title}
          <span className="absolute -bottom-2 left-0 w-[90%] h-2 bg-accent rounded-full z-0"></span>
        </h1>
      </div>
    </div>
  );
}
