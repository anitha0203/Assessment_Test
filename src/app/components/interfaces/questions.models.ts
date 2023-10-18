export interface Questions {
    id: Int16Array;
    question: string;
    option1: string;
    option2: string;
    option3: string | null;
    option4: string | null;
    correct: string;
    ques_type: string;
}
