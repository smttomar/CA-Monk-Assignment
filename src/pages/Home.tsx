import { useBlogs } from "../api/blogs";
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

function Home() {
    const { data, isLoading, isError, refetch } = useBlogs();

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

    return (
        <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((blog) => (
                <Card key={blog.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{blog.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground line-clamp-3">
                        {blog.content}
                    </CardContent>

                    <CardFooter className="mt-auto">
                        <Link to={`/blog/${blog.id}`}>
                            <Button variant="default">Read more</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default Home;
