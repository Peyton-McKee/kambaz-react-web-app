/* eslint-disable @typescript-eslint/no-explicit-any */

export const findEnrollment = (
  enrollments: any[],
  courseId: string,
  userId: string
) =>
  enrollments.find(
    (enrollment: any) =>
      enrollment.user === userId && enrollment.course === courseId
  );

export const isUserEnrolledInCourse = (
  enrollments: any[],
  courseId: string,
  userId: string
) => !!findEnrollment(enrollments, courseId, userId);
