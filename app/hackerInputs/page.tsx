import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import HackerInput from "./HackerInput";


    return (
      <ClientOnly>
        {/* <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        /> */}
      </ClientOnly>
    );
  

  return (
    <ClientOnly>
      <HackerInput />
    </ClientOnly>
  );
};

export default HackerInput;
