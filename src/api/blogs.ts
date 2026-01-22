import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./client";

export interface Blog {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    coverImage: string;
    content: string;
    author: string;
}
interface CreateBlogInput {
    title: string;
    category: string;
    description: string;
    date: string;
    coverImage: string;
    content: string;
    author: string;
}

const createBlog = async (blog: CreateBlogInput) => {
    const response = await apiClient.post("/blogs", blog);
    return response.data;
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await apiClient.get("/blogs");
    return response.data;
};

const fetchBlogById = async (id: string) => {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
};

export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
    });
};

export const useBlog = (id: string) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id),
        enabled: !!id,
    });
};
