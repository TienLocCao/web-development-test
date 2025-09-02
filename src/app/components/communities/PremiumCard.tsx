export default function PremiumCard() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 text-center">
      <h4 className="font-semibold">Get Premium to boost your Medals</h4>
      <p className="text-sm mt-1 opacity-90">
        Your chance to boost your Medals and get benefits from premium features.
      </p>
      <button className="mt-3 bg-white text-purple-600 px-4 py-1.5 rounded font-medium text-sm">
        Upgrade
      </button>
    </div>
  );
}
