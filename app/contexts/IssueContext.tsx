import React, { createContext, useContext, ReactNode } from 'react';
import { IssueDetail } from '../graphql/types/issues';

interface IssueContextType {
    issue: IssueDetail | null;
    setIssue: (issue: IssueDetail | null) => void;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export function IssueProvider({ children }: { children: ReactNode }) {
    const [issue, setIssue] = React.useState<IssueDetail | null>(null);

    return (
        <IssueContext.Provider value={{ issue, setIssue }}>
            {children}
        </IssueContext.Provider>
    );
}

export function useIssue() {
    const context = useContext(IssueContext);
    if (context === undefined) {
        throw new Error('useIssue must be used within an IssueProvider');
    }
    return context;
} 