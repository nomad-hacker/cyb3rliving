import Heading from "./Heading";
import RemoveFiltersButton from "./RemoveFiltersButton";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}) => {
  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <RemoveFiltersButton className="w-full py-3 bg-white border-2 border-black font-semibold text-black  hover:opacity-80 transition" />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
