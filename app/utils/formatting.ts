export const formatIssueNumber = (number: number): string => {
    return `#${number}`;
};

export const formatCommentCount = (count: number): string => {
    return `${count} ${count === 1 ? "comment" : "comments"}`;
}; 