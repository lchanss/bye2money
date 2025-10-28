type TagProps = {
  label: string;
  color: string;
};

export default function Tag({ label, color }: TagProps) {
  return (
    <div
      className={`${color} text-light-12 flex h-14 w-23 items-center justify-center`}
    >
      {label}
    </div>
  );
}
