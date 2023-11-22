import { twentyFourHours } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useFetchQuery(props) {
  const [fetchError, setFetchError] = useState();

  const res = useQuery({
    enabled: props.enable,
    queryKey: props.queryKey,
    queryFn: async () => {
      const data = await fetch(props.fetchUrl, {
        method: props.method,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = res.json();

        return data;
      });

      return data;
    },
    cacheTime: props.cacheTime ?? twentyFourHours,
    staleTime: props.staleTime ?? twentyFourHours,
    retry: false,
    onSuccess: () => {
      props.refetch && void props.refetch();
    },
    onError: (error) => {
      if (error instanceof Error) {
        setFetchError(error);
      }
    },
  });

  return {
    ...res,
    fetchError,
  };
}
