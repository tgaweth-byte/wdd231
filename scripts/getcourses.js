// JSON LIST OF COURSES
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: [
      'HTML',
      'CSS'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: [
      'Python'
    ],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: false
  }
]

//---------- GRAB A REFERENCE TO THE DIVISION WHERE WE DISPLAY THE COURSES 
const courseoutput = document.querySelector("#crsList")
const courseDetails = document.querySelector("#course-details")

// DISPLAY ALL Courses
document.querySelector('#all').addEventListener('click', () => {
  displayCourses(courses)
}); // end function

// DISPLAY WDD Courses
document.querySelector('#wdd').addEventListener('click', () => {
  const result = courses.filter((course) => course.subject === 'WDD');
  displayCourses(result)
}); // end function

// DISPLAY CSE Courses
document.querySelector('#cse').addEventListener('click', () => {
  const result = courses.filter((course) => course.subject === 'CSE');
  displayCourses(result)
}); // end function



// ---------------- LOOP THROUGH THE ARRAY OF SENT COURSES 
function displayCourses(filteredcourses) {
  courseoutput.innerHTML = '';
  filteredcourses.forEach(crs => {
    //console.log(crs)

    const courseCard = document.createElement('div')
    // add a class to the division
    switch (crs.completed) {
      case true:
        courseCard.className = "complete"
        break;
      default:
        courseCard.className = "needed"
    } // end switch

    courseCard.innerHTML = `${crs.subject} ${crs.number}`

    // added for modal dialog
    courseCard.addEventListener('click', () => {
      displayCourseDetails(crs);
    });

    // attach to html page
    courseoutput.appendChild(courseCard)


  });

  // USE REDUCE TO FIND THE TOTAL NUMBER OF CREDITS
  // https://www.freecodecamp.org/news/how-to-use-javascript-array-reduce-method/
  let completedCredits = filteredcourses
    .filter(course => course.completed)
    .reduce((acc, course) => acc + course.credits, 0);

  let totalCredits = filteredcourses.reduce((acc, course) => acc + course.credits, 0);

  let remainingCredits = totalCredits - completedCredits;

  document.querySelector('#totalCredits').innerHTML = `
    The total number of credits for completed courses is ${completedCredits}.
    The total number of credits for all courses listed above is ${totalCredits}.
    The total number of credits left to complete is ${remainingCredits}.
  `;

}


// auto display all the courses when the page opens
displayCourses(courses)