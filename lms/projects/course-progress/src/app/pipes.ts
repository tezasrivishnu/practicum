import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'user'})
export class UserPipe implements PipeTransform {
  transform(value: any, user: string): any {
    return user ? value.filter(d => d.userId._id == user): value;
  }
}


@Pipe({name: 'program'})
export class ProgramPipe implements PipeTransform {
  transform(value: any, program: string): any {
    return program ? value.filter(d => d.programId._id == program): value;
  }
}

@Pipe({name: 'course'})
export class CoursePipe implements PipeTransform {
  transform(value: any, course: string): any {
    return course ? value.filter(d => d.courseId._id == course): value;
  }
}

@Pipe({name: 'courseInstance'})
export class CourseInstancePipe implements PipeTransform {
  transform(value: any, courseInstance: string): any {
    return courseInstance ? value.filter(d => d.courseInstanceId._id == courseInstance): value;
  }
}

@Pipe({name: 'module'})
export class ModulePipe implements PipeTransform {
  transform(value: any, module: string): any {
    return module ? value.filter(d => d.moduleId == module): value;
  }
}

@Pipe({name: 'activityType'})
export class ActivityTypePipe implements PipeTransform {
  transform(value: any, activityType: string): any {
    return activityType ? value.filter(d => d.activityType == activityType ): value;
  }
}

@Pipe({name: 'evaluationStatus'})
export class EvaluationStatusPipe implements PipeTransform {
  transform(value: any, evaluationStatus: string): any {
    // console.log(evaluationStatus);
    // console.log(evaluationStatus != "all");
    return evaluationStatus != "all" ? value.filter(d => d.evaluationStatus == evaluationStatus && d.activityType != 'quiz'): value;
  }
}
