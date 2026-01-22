import { useParams, Link } from "react-router-dom";
import { useBlog } from "../api/blogs";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, refetch } = useBlog(id || "");

    if (isLoading) {
        return (
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 flex flex-col items-center justify-center gap-3">
                <p className="text-sm text-muted-foreground">
                    Failed to load blogs. Please try again.
                </p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        );
    }

    if (!data) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Card className="overflow-hidden">
                {data.coverImage && (
                    <img
                        src={data.coverImage}
                        alt={data.title}
                        className="w-full h-64 object-cover"
                    />
                )}

                <CardHeader>
                    <CardTitle className="text-3xl leading-tight">
                        {data.title}
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                        {data.category} • {data.date}
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-lg text-muted-foreground">
                        {data.description}
                    </p>

                    <div className="leading-relaxed whitespace-pre-line">
                        {data.content}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        — {data.author}
                    </p>

                    <Link to="/">
                        <Button>Back</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default BlogDetail;
