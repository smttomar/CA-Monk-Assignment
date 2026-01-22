import { useState } from "react";
import { useCreateBlog } from "../api/blogs";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const { mutate, isPending, isError } = useCreateBlog();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutate(
            {
                title,
                description,
                content,
                author,
                category,
                coverImage,
                date: new Date().toLocaleDateString(),
            },
            {
                onSuccess: () => {
                    navigate("/");
                },
            },
        );
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Create Blog</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <Input
                    placeholder="Cover Image URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                />

                {coverImage && (
                    <div className="rounded-md overflow-hidden border">
                        <img
                            src={coverImage}
                            alt="Cover preview"
                            className="w-full h-48 object-cover"
                        />
                    </div>
                )}

                <Input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <Textarea
                    placeholder="Short description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Textarea
                    placeholder="Content"
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <Input
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />

                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "Creating..." : "Create Blog"}
                </Button>

                {isError && (
                    <p className="text-sm text-red-500">Something went wrong</p>
                )}
            </form>
        </div>
    );
}

export default CreateBlog;
