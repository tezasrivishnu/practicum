export class Question {
    questionText: QuestionContent[];
    options: Choice[];
    correct_feedback: string;
    wrong_feedback: string;
    questionType: string;
    max_marks: number;
}

export class Choice {
    correct: boolean;
    option: string;
}

export class QuestionContent {
    text: string;
    image: QuestionImage;
    attachment: string;
    attachmentName: string;

    constructor() {
        this.attachmentName = this.attachment.split('/').pop();
        console.log("from question content object");
        console.log(this.attachmentName);
    }
}

export class QuestionImage {
    imageName: string;
    imageSRC: string;
}