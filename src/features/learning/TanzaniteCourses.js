// features/learning/TanzaniteCourses.js
export default function TanzaniteCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('https://api.tanzanite.academy/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}