import CoursePreview, { CoursePreviewProps } from "./CoursePreview";

export default function Dashboard() {
  const coursePreviews: CoursePreviewProps[] = [
    {
      courseId: "1",
      title: "CS1234 React JS",
      description: "Full Stack software developer",
      imgSrc: "/images/teslabot.png",
    },
    {
      courseId: "2",
      title: "CS1235 React TS",
      description: "Frontend software developer",
      imgSrc: "/images/teslabot.png",
    },
    {
      courseId: "3",
      title: "CS1236 Some Other Course",
      description: "Another Course Description",
      imgSrc: "/images/teslabot.png",
    },
    {
      courseId: "4",
      title: "CS1237 Yet Another Course",
      description: "Yet Another Course Description",
      imgSrc: "/images/teslabot.png",
    },
    {
      courseId: "5",
      title: "CS1238 Yet Another Course Again",
      description: "Yet Another Course Description Again",
      imgSrc: "/images/teslabot.png",
    },
    {
      courseId: "6",
      title: "CS1238 Yet Another Course Again Once More",
      description: "Yet Another Course Description Again Once More",
      imgSrc: "/images/teslabot.png",
    },
    {
      courseId: "7",
      title: "CS1238 Last Course",
      description: "Last Course Description",
      imgSrc: "/images/teslabot.png",
    },
  ];
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        {coursePreviews.map((course) => (
          <CoursePreview {...course} />
        ))}
      </div>
    </div>
  );
}
