import { Activity } from './activity';

export class Lesson {
    module_id: string;
    name: string;
    desc: string;
    activities: string[];
    content: Activity[];
}