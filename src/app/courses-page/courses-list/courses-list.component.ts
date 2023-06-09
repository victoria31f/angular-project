import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Course } from '../../types/course';
import { LoaderService } from '../../shared/loader/service/loader.service';
import {
    CoursesActions,
    selectCoursesLength,
    selectCoursesList,
} from 'src/app/state/courses';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
    private nextStartPoint = 5;
    public courses$ = this.store.select(selectCoursesList);
    public coursesCount$ = this.store.select(selectCoursesLength);

    constructor(public loaderService: LoaderService, private store: Store) {}

    public ngOnInit(): void {
        this.loadCourses();
    }

    private loadCourses(start?: number, count?: number): void {
        this.store.dispatch(CoursesActions.loadCourses({ start, count }));
    }

    public onLoadMoreClick(): void {
        this.nextStartPoint = this.nextStartPoint + 5;
        this.loadCourses(0, this.nextStartPoint);
    }

    public onDeleteCourse(courseId: string): void {
        const res = confirm('Do you really want to delete this course?');

        if (res) {
            this.store.dispatch(
                CoursesActions.deleteCourse({
                    id: courseId,
                    count: this.nextStartPoint,
                })
            );
        }
    }

    public courseTrackBy(index: number, course: Course): string {
        return course.id;
    }
}
