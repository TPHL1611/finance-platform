import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.accounts)["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<(typeof client.api.accounts)["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        //Xử lý thông tin gửi lên
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json });
            return await response.json();
        },
        // Xử lý thành công
        onSuccess: () => {
            toast.success("Accounts deleted!");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            //Todo: Also invalidate summary
        },
        // Xử lý lỗi
        onError: () => {
            toast.error("Failed to delete accounts.");
        },
    });

    return mutation;
};
