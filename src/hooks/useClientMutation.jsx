import { useMutation } from "@tanstack/react-query";

export default function useClientMutation({ endPoint, method, body, refetch }) {
  return useMutation({
    mutationFn: async () => {
      return await fetch(endPoint, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    onSuccess: () => {
      refetch && void refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
