export default function LoadingSpinner({ size = "large" }) {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-2",
    large: "h-12 w-12 border-3"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-primary-600 border-r-primary-600 border-b-primary-200 border-l-primary-200`} />
      <p className="mt-4 text-gray-600 text-sm font-medium">Loading amazing content...</p>
      <div className="mt-2 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary-600 animate-pulse rounded-full" style={{ width: '60%' }} />
      </div>
    </div>
  );
} 