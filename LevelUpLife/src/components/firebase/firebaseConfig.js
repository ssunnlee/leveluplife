import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import {
  getDatabase,
  set,
  child,
  get,
  ref,
  remove,
  update,
  push,
} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  databaseURL: "https://test-ab3dd-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyBvGI-21RbaaJ4CWaxkfQhh-FpTEtI-87Y",
  authDomain: "test-ab3dd.firebaseapp.com",
  projectId: "test-ab3dd",
  storageBucket: "test-ab3dd.appspot.com",
  messagingSenderId: "102948445889",
  appId: "1:102948445889:web:6c8477824c7364071bfe40",
  measurementId: "G-0Q9XWFH28T",
};

export const initCounter = () => {
  console.log("initCounter called");
  const db = database;

  set(ref(db, "counter/"), {
    firstIntake: 0,
    dayCounter: 0,
    currentDay: 0,
  });
};

export const convertBmiToString = (bmi) => {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 24.9) {
    return "healthy";
  } else if (bmi < 29.9) {
    return "overweight";
  } else {
    return "obese";
  }
};

export const initThresholds = () => {
  console.log("initThresholds called");
  const db = database;
  set(ref(db, "thresholds/"), {
    underweight: { cholesterol: 300 },
    healthy: { cholesterol: 300 },
    overweight: { cholesterol: 300 },
    obese: { cholesterol: 300 },
  });
};

export const updateUserModel = (name, age, height, weight, gender) => {
  console.log("updateUserModel called");
  const db = database;
  const bmi = weight / Math.pow(height, 2);
  set(ref(db, "userParams/"), {
    name: name,
    age: age,
    height: height,
    weight: weight,
    bmi: bmi,
    gender: gender,
  });
};

const userIntakerHelper = async (section) => {
  try {
    var db = database;
    const snapshot = await get(child(ref(db), `${section}/`));
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const checkThresholds = async () => {
  var counter = await userIntakerHelper("counter");
  const intakes = await userIntakerHelper("intakes");
  const thresholds = await userIntakerHelper("thresholds");
  const userParams = await userIntakerHelper("userParams");
  var recString = "Recommendations:\n";
  counter = counter.dayCounter;
  const bmiString = convertBmiToString(userParams.bmi);
  for (var [intakeType, intakeAmt] of Object.entries(intakes)) {
    if (intakeType == "cholesterol") {
      if (intakeAmt[counter] > thresholds[bmiString][intakeType]) {
        recString = recString.concat(
          "You have exceeded the recommended daily amount of cholesterol(300mg)\n"
        );
      } else if (intakeAmt[counter] > thresholds[bmiString][intakeType] * 0.8) {
          recString = recString.concat(
          `You have exceeded 80% of the recommended daily amount of cholesterol(${
            thresholds[bmiString][intakeType] * 0.8
          }mg)\n`
        );
      }
    }
  }


  if (recString != "Recommendations:\n") {
    console.log(recString)
    return recString;
  } else {
    console.log("You adhered to all recommended daily amount of nutrients. Great work!\n")
    return "You adhered to all recommended daily amount of nutrients. Great work!\n";
  }
};

export const userIntake = async (
  fat,
  protein,
  carbs,
  cholesterol,
  calories
) => {
  console.log("userIntake called");

  var db = database;
  var initIntake = 0;
  var dayCounter = 0;

  const data = await userIntakerHelper("counter");
  initIntake = data.firstIntake;
  dayCounter = data.dayCounter;

  if (initIntake == 0) {
    const date = new Date();
    const currentDay = date.getDate();
    set(ref(db, "counter/"), {
      firstIntake: 0,
      dayCounter: 0,
      currentDay: currentDay,
    });

    set(ref(db, "intakes/"), {
      fat: { [dayCounter]: fat },
      protein: { [dayCounter]: protein },
      carbs: { [dayCounter]: carbs },
      cholesterol: { [dayCounter]: cholesterol },
      calories: { [dayCounter]: calories },
    });
    set(ref(db, "counter/"), {
      dayCounter: 0,
      firstIntake: 1,
      currentDay: currentDay,
    });
  } else {
    const date = new Date();
    const currentDay = date.getDate();

    const currentDayData = await userIntakerHelper("counter");
    if (currentDayData.currentDay != currentDay) {
      set(ref(db, "counter/"), {
        dayCounter: currentDayData.dayCounter + 1,
        firstIntake: 1,
        currentDay: currentDay,
      });
      dayCounter = currentDayData.dayCounter + 1;
    }

    get(child(ref(db), `intakes/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          for (var [key, value] of Object.entries(snapshot.val())) {
            const newValue = eval(key) + parseInt(eval(value[dayCounter]));
            const updates = {};
            if (value[dayCounter] != null) {
              updates["/intakes/" + key + "/" + dayCounter] = newValue;
              update(ref(db), updates);
            } else {
              updates["/intakes/" + key + "/" + dayCounter] = eval(key);
              update(ref(db), updates);
            }
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const res = await checkThresholds();
  return res;
};

// export const testFunction2 = (exerciseKey) => {
//   console.log("called tf2");
//   const dbRef = ref(database);
//   get(child(dbRef, `MaybeDisliked/`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//         for (const [key, value] of Object.entries(snapshot.val())) {
//           console.log(key, value);
//         }
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// export const testFunction3 = (exerciseKey) => {
//   console.log("called tf3");
//   const db = database;

//   //Delete data
//   remove(ref(db, `MaybeDisliked/${exerciseKey}`)).then(() => {
//     console.log("location removed");
//   });

//   const updates = {};
//   updates["/LikedExercises/" + `${exerciseKey}`] = 0;
//   update(ref(db), updates);
// };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
