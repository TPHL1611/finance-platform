import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.accounts)[":id"]["$delete"]>;

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        //Xử lý thông tin gửi lên
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$delete"]({ param: { id } });
            return await response.json();
        },
        // Xử lý thành công
        onSuccess: () => {
            toast.success("Account deleted!");
            queryClient.invalidateQueries({ queryKey: ["accounts", { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        // Xử lý lỗi
        onError: () => {
            toast.error("Failed to delete account.");
        },
    });

    return mutation;
};
