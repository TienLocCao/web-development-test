"use client";

export default function PostSkeleton() {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 animate-pulse">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div>
              <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        {/* Content */}
        <div className="mb-4">
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-3" />
          <div className="h-3 w-full bg-gray-200 rounded mb-2" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </article>
  );
}
