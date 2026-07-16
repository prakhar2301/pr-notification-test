export function timeAgo(dateString) {

    const now = new Date();

    const created = new Date(dateString);

    const diffMs = now - created;

    const seconds = Math.floor(diffMs / 1000);

    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (days === 1) {
        return "Yesterday";
    }

    if (days < 30) {
        return `${days} days ago`;
    }

    return created.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}
