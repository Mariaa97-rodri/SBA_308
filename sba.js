// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// function getLearnerData(course, ag, submissions) {
//   // here, we would process this data to achieve the desired result.
//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

//   return result;
// }

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);

// You will create a script that gathers data, processes it, and then outputs a consistent result as described by a specification. This is a very typical situation in industry, and this particular scenario has been modified from a real application. The data you will use is provided below.
// You will be provided with four different types of data:
// A CourseInfo object, which looks like this:
// {
//   "id": number,
//   "name": string,
// }

// An AssignmentGroup object, which looks like this:
// {
//   "id": number,
//   "name": string,
//   // the ID of the course the assignment group belongs to
//   "course_id": number,
//   // the percentage weight of the entire assignment group
//   "group_weight": number,
//   "assignments": [AssignmentInfo],
// }

// Each AssignmentInfo object within the assignments array looks like this:
// {
//   "id": number,
//   "name": string,
//   // the due date for the assignment
//   "due_at": Date string,
//   // the maximum points possible for the assignment
//   "points_possible": number,
// }

// An array of LearnerSubmission objects, which each look like this:
// {
//     "learner_id": number,
//     "assignment_id": number,
//     "submission": {
//       "submitted_at": Date string,
//       "score": number
//     }
// }

// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
// {
//     // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores
// }

// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
// You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
// Use try/catch and other logic to handle these types of errors gracefully.
// If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
// Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.
// You may use as many helper functions as you see fit.
//Afterwards, alter the data to test for edge cases, error handling, and other potential issues.
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  // Use try/catch for error handling
  try {
    //Catches and handles any errors so program doesnt crash
    // Validate if AssignmentGroup belongs to the CourseInfo
    if (AssignmentGroup.course_id !== CourseInfo.id) {
      //if condition is true, we throw an error
      throw new Error("AssignmentGroup does not belong to the course!");
      //throw creates am error and stops execution
    }
    const result = [];
    //Create empty array to store our final results
    const assignmentMap = {};
    //assighmentMap[1] will give us the assignment with id:1
    //Build assignment loopup map
    //loop through all assignments and add each to our map
    for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
      //loop breakdown:
      //let i = 0l //initialize counter
      //i < AssignmentGroup.assignments.length; //condition to keep looping
      //i++ //increment counter by 1 each loop
      //get assignment at index i from assignemnts array
      const assignment = AssignmentGroup.assignments[i];
      //Add this assingment to our map using its ID as the key
      assignmentMap[assignment.id] = assignment;
      //After loop completes, assignmentMap looks like:
      //{
      //1: {id:1, name:"Declare a Variable", due_at:"2023-01-25", points_possible:50},
      //2: {id:2, name:"Write a Function", due_at:"2023-02-27", points_possible:150},
      //3: {id:3, name:"Code the World", due_at:"3156-11-15", points_possible:500}
      //}
    }
    //Step 5: Create temporary learner storage
    //object to store each learners data while we process submissions
    const learnerData = {};
    //Get the current date and time
    const now = new Date();
    //Step 6: Process each submission
    //Loop through every submission in the LearnerSubmissions array
    for (let i = 0; i < LearnerSubmissions.length; i++) {
      //Get the current submission we're processing
      const submission = LearnerSubmissions[i];
      //Extract learner ID and assignment ID into variables
      const learnerId = submission.learner_id;
      const assignmentId = submission.assignment_id;
      //Step 6A: Loop up assigment details
      //get the full assignment object from our lookup map
      const assignment = assignmentMap[assignmentId];
      //Step 6B: Validate assignment exists
      //Check if we found the assignment (it might not exist)
      if (!assignment) {
        //Skip this submission and move to the next one
        continue;
      }
      //Step 6C: Validate points possible
      if(assignment.points_possible <= 0) {
        //log error message to console
        console.error(`Invalid points_possible for assignment ${assignmentId}`);
        //skip this submission and move to the next one
        continue;
      }
      //Step 6D: Check if assignment is due
      //convert the due date string into a Date object
      const dueDate = new Date(assignment.due_at);
      //check if assignment is already due(dueDate is in the past)
      if (dueDate > now) {
        //skip this assignment 
        continue;
      }
      //Step6E: Calculate score with late penalty
      //Get the score the student earned
      let score = submission.submission.score;
      //using let (not const) because we might modify score later
      //convert submission date string into Date object
      const submittedDate = new Date(submission.submission.submitted_at);
      //check if submission was late
      const isLate = submittedDate > dueDate;
      //Apply 10% penalty if submission was late
      if (isLate) {
        //calculate 10% of points possible
        const penalty = assignment.points_possible * 0.1;
        //subtract penalty from score
        score = score - penalty;
      }
      //Step6F: initialize learner Data (first time)
      //Check if this is the first time we've seen this learner
      if (!learnerData[learnerId]) {
        //create new object for this learner
        learnerData[learnerId] = {
          id: learnerId,
          totalScore: 0,
          totalPossible: 0,
          assignments: {}
      };
    }  
  //step 6G: Calculate and store scores
  //calculate pthis assignment's score as a percentage
  const percentage = score / assignment.points_possible;
  //store this percentage in the learner's assignment object
  learnerData[learnerId].assignments[assignmentId] = percentage;
  //add this assignment's score to the learner's running total
  learnerData[learnerId].totalScore += score;
  //add this assignment's points possible to the running total
  learnerData[learnerId].totalPossible += assignment.points_possible;
}
//Step 7: convert to final format
//Loop through learnerData object to create final result array
for (const learnerId in learnerData) {
  //Get this learner's accumulated data
  const data = learnerData[learnerId];
  //Calculate the learners weighted average
  const avg = data.totalScore / data.totalPossible;
  //Create the result object for this learner
  const learnerResult = {
    id: data.id,
    avg:avg
  };
  //add individual assignmetn scores to the result object
  for (const assignmentId in data.assignments) {
    //Copy each assignment score to learnerResult
    learnerResult[assignmentId] = data.assignments[assignmentId];
  }
  //Add this learners result to the final results array
  result.push(learnerResult);
}
//Return the formatted results array
return result;
  } catch (error) {
    //Step 9 Error Handling
    //This code runs if any error was thrown in the try block
    console.error("Error:", error.message);
    //Return empty array instead of crashing
    return[];
  }
}

//Optional: Function that converts decimal avg to letter grade
function getLetterGrade(avg) {
  //Convert decimal to whole number percentage
  const percentage = Math.floor(avg * 100);
  //Switch statemnet to determine letter grade
  switch (true) {
    case (percentage >= 90):
      return "A";
    case (percentage >= 80):
      return "B";
    case (percentage >= 70):
      return "C";
    case (percentage >= 60):
      return "D";
    default:
      return "F";
  }
}

//Function that finds first failing student
function findFailingStudent(results) {
  console.log("\nChecking for failing students...");
  //loops trhoguh all students results
  for (let i = 0; i < results.length; i++) {
    //check if studnet is failing (below 60%)
    if (results[i].avg < 0.6) {
      //log failing student info
      console.log(`Learner ${results[i].id} is failing with an average of ${results[i].avg}`);
      break;
    }
  }
}
//Function demponstrating awway operations
function demonstrateArrayOps() {
  console.log("\nDemonstrating array operations...");
  //Create a simple array of numbers
  const numbers = [10, 20, 30, 40, 50];
  //Retrieve (get) an element from the array
  console.log("Retrieved first element:", numbers[0]);
  //Add element to end of array
  numbers.push(60);
  console.log("After push:", numbers);
  //Remove element from end of array 
  const removed = numbers.pop();
  console.log("Removed:", removed);
  console.log("After pop:", numbers);
}

//Run the program
console.log("===SBA 308 Results ===\n");
//Call our main function with the provided data
const result = getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions)
//Print the final results to console
console.log("Final Results:");
console.log(result);
//Show letter grades for each student
console.log("\nLetter Grades:");
result.forEach(learner => {
  //get letter grade for this learner
  const grade = getLetterGrade(learner.avg);
  //Print Learner ID, letter grade and percentage
  console.log(`Learner ${learner.id}: ${grade} (${(learner.avg * 100).toFixed(1)})`);
});
//Call function that demontrates break keyword
findFailingStudent(result);
//Call function that demonstrates array operations
demonstrateArrayOps();
console.log("\n=== Program Complete ===");