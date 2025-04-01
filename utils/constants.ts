export const ISSUE_STATUS = {
    OPEN: "OPEN",
    CLOSED: "CLOSED",
} as const;

export type IssueStatus = typeof ISSUE_STATUS[keyof typeof ISSUE_STATUS]; 