import Signin from './signin';
import Dashboard from './dashboard';
import Details from './details';
import Attend from './attend';
import Upload from './upload';
import CASLogin from './CASLogin';
import Courses from './Courses';
import CourseDetails from './CourseDetails';
import Submissions from './Submissions';

export default {
  signin: {
    title: "signin",
    component: Signin
  },
  dashboard: {
    title: "dashboard",
    component: Dashboard
  },
  details: {
    title: "details",
    component: Details
  },
  attend: {
    title: "attend",
    component: Attend
  },
  upload: {
    title: "upload",
    component: Upload
  },
  casLogin: {
    title: "casLogin",
    component: CASLogin
  },
  courses: {
    title: "courses",
    component: Courses
  },
  coursedetails: {
      title: "coursedetails",
      component: CourseDetails
  },
  submissions: {
      title: "submissions",
      component: Submissions
  }
}
