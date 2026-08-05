export type TimelineElement = {
    id?: string | number;
    title?: string;
    company?: string;
    date?: string;
    description?: string;
    status?: 'completed' | 'in-progress' | 'pending' | 'error';
    // FIX 1: Proper typing for a React component or a function that returns one
    icon?: React.ReactNode | (() => React.ReactNode);
    // FIX 2: Added the missing color property
    color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';
};