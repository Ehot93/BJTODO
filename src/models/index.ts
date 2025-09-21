export interface TaskProps {
    id: string,
    username: string;
    email: string;
    text: string;
    isDone: boolean;
}

export interface Credentials {
    username: string | null;
    password: string | null
}