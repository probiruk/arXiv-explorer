import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function LoadMoreButton({ isLoading, onClick }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center pt-4">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>Load More</>
        )}
      </button>
    </div>
  );
}
