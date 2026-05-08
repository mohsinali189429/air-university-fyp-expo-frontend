export default function Loader({ text = "Loading..." }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center py-16 text-center"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"
        role="status"
      />
      <p className="mt-4 text-gray-600 text-sm">{text}</p>
    </div>
  );
}
