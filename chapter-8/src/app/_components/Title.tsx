export default function Title({ title }: { title: string }) {
  return (
    <div className="flex justify-between py-5 px-7">
      <p className="font-bold text-lg ">{title}</p>
    </div>
  );
}
