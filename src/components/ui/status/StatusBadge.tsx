type Props = {
  online: boolean;
  label: string;
};

export default function StatusBadge({ online, label }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${
          online ? "bg-green-500" : "bg-red-500"
        }`}
      />

      <span className="font-medium">{label}</span>
    </div>
  );
}
