export default function FilterBar() {
  return (
    <div className="flex justify-end mb-4">
      <select className="border rounded px-3 py-1 text-sm">
        <option value="beauty">Beauty</option>
        <option value="tech">Tech</option>
        <option value="health">Health</option>
      </select>
    </div>
  );
}
