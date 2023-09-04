"use client";

import { useRouter, useSearchParams } from "next/navigation";

const RemoveFiltersButton = ({ className }: { className: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams || searchParams.toString() === "") {
    return null;
  }

  return (
    <button
      className={className}
      onClick={() => {
        router.push("/");
      }}
    >
      Remove all filters
    </button>
  );
};

export default RemoveFiltersButton;
