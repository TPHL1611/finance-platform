import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        //Xử lý thông tin gửi lên
        mutationFn: async (json) => {
            const response = await client.api.categories.$post({ json });
            return await response.json();
        },
        // Xử lý thành công
        onSuccess: () => {
            toast.success("Category created!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        // Xử lý lỗi
        onError: () => {
            toast.error("Failed to create category.");
        },
    });

    return mutation;
};
