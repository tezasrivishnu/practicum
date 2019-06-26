import { Question } from './question'

export class ActivityContent {
    activityType: string;
    title: string;
    videoURL: string;
    videoResources: string;
    questions: Question[];
}