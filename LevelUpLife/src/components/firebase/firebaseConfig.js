import { initializeApp, apps } from "firebase/app";

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
import { getEdamamData } from "./recipeAPI";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
/*
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
*/

// Conner's firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDgc_JdtnDkO5-8UbRZwQV_cVUtDY7AOok",
  authDomain: "leveluplife-81ced.firebaseapp.com",
  databaseURL: "https://leveluplife-81ced-default-rtdb.firebaseio.com",
  projectId: "leveluplife-81ced",
  storageBucket: "leveluplife-81ced.appspot.com",
  messagingSenderId: "453247823364",
  appId: "1:453247823364:web:7779eb606f763a76150f51"
};

export const initCounter = (uid) => {
  console.log("initCounter called");
  const db = database;

  set(ref(db, "counter/" + uid), {
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
    male: {
      "14-18": {
        calories: 2100,
        cholesterol: 300,
        fiber: 22.5,
        fat: 44,
        protein: 52,
      },
      "19-30": {
        calories: 2200,
        cholesterol: 300,
        fiber: 32.5,
        fat: 44,
        protein: 56,
      },
      "31-50": {
        calories: 2000,
        cholesterol: 300,
        fiber: 32.5,
        fat: 44,
        protein: 56,
      },
      "51+": {
        calories: 1800,
        cholesterol: 300,
        fiber: 28.0,
        fat: 44,
        protein: 56,
      },
    },
    female: {
      "14-18": {
        calories: 1500,
        cholesterol: 300,
        fiber: 22.5,
        fat: 33,
        protein: 46,
      },
      "19-30": {
        calories: 1600,
        cholesterol: 300,
        fiber: 26.5,
        fat: 33,
        protein: 46,
      },
      "31-50": {
        calories: 1500,
        cholesterol: 300,
        fiber: 26.5,
        fat: 33,
        protein: 46,
      },
      "51+": {
        calories: 1300,
        cholesterol: 300,
        fiber: 22.0,
        fat: 33,
        protein: 46,
      },
    },
  });
};

export const updateUserModel = (uid, name, age, height, weight, gender) => {
  console.log("updateUserModel called " + uid);
  const db = database;
  set(ref(db, "userParams/" + uid), {
    name: name,
    age: age,
    height: height,
    weight: weight,
    gender: gender,
  });
};

export const userIntakerHelper = async (section, uid) => {
  try {
    var db = database;
    const snapshot = await get(child(ref(db), `${section}/` + uid));
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const thresholdsHelper = async (section, uid) => {
  try {
    var db = database;
    const snapshot = await get(child(ref(db), `${section}/`));
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const ageToRange = (age) => {
  var astring = "";
  if (age > 51) {
    astring = "51+";
  } else if (age > 31) {
    astring = "31-50";
  } else if (age > 19) {
    astring = "19-30";
  } else if (age > 14) {
    astring = "14-18";
  }
  return astring;
};

export const getSummary = async (uid) => {
  console.log("getting summary for", uid)
  var counter = await userIntakerHelper("counter", uid);
  var currentDay = counter.dayCounter;
  const firstDayIndex = currentDay > 7 ? currentDay - 7 : 0;
  const intakes = await userIntakerHelper("intakes", uid);
  const thresholds = await thresholdsHelper("thresholds", uid);
  console.log(thresholds == null);
  console.log(thresholds);
  console.log("intakes", intakes);
  console.log("printing thresholds");
  const userParams = await userIntakerHelper("userParams", uid);
  const ageRangeString = ageToRange(userParams.age);
  const genderString = userParams.gender;

  var avgCalories = 0;
  var avgCholesterol = 0;
  var avgFat = 0;
  var avgProtein = 0;
  var avgFiber = 0;

  var resultString = "Seven Day Summary: \n\n";

  //diet=low-carb&diet=low-fat
  var dietParamString = "";
  var maxCalorieMeal = "";
  console.log(intakes);

  for (var [intakeType, intakeAmt] of Object.entries(intakes)) {
    if (intakeType == "calories") {
      days = 0;
      for (let i = firstDayIndex; i < currentDay; i++) {
        avgCalories += intakeAmt[i];
        days++;
        console.log("avgCalories", avgCalories, i);
      }

      days = days > 0 ? days : 1;

      avgCalories = Math.floor(avgCalories / days);

      var thresholdAmt = thresholds[genderString][ageRangeString][intakeType];
      console.log("thresholdAmt", thresholdAmt);
      console.log("avgCalories", avgCalories);

      var percentage = Math.floor((avgCalories / thresholdAmt) * 100);
      maxCalorieMeal = `0-${Math.floor(thresholdAmt) / 3}`;

      resultString += `Calories: ${percentage}% (${avgCalories} cal/${thresholdAmt} cal) of daily recommended limit\n`;
    }

    if (intakeType == "cholesterol") {
      for (let i = firstDayIndex; i < currentDay; i++) {
        avgCholesterol += intakeAmt[i];
      }

      avgCholesterol = Math.floor(avgCholesterol / days);

      var thresholdAmt = thresholds[genderString][ageRangeString][intakeType];
      var percentage = Math.floor((avgCholesterol / thresholdAmt) * 100);

      resultString += `Cholesterol: ${percentage}% (${avgCholesterol} mg/${thresholdAmt} mg) of daily recommended limit\n`;
    }

    if (intakeType == "fat") {
      for (let i = firstDayIndex; i < currentDay; i++) {
        avgFat += intakeAmt[i];
      }
      avgFat = Math.floor(avgFat / days);

      var thresholdAmt = thresholds[genderString][ageRangeString][intakeType];
      var percentage = Math.floor((avgFat / thresholdAmt) * 100);

      if (percentage > 100) {
        dietParamString += "diet=low-fat&";
      }

      resultString += `Fat: ${percentage}% (${avgFat} g/${thresholdAmt} g) of daily recommended limit\n`;
    }

    if (intakeType == "protein") {
      for (let i = firstDayIndex; i < currentDay; i++) {
        avgProtein += intakeAmt[i];
      }

      avgProtein = Math.floor(avgProtein / days);

      var thresholdAmt = thresholds[genderString][ageRangeString][intakeType];
      var percentage = Math.floor((avgProtein / thresholdAmt) * 100);
      if (percentage < 100) {
        dietParamString += "diet=high-protein&";
      }

      resultString += `Protein: ${percentage}% (${avgProtein} g/${thresholdAmt} g) of daily recommended intake\n`;
    }

    if (intakeType == "fiber") {
      for (let i = firstDayIndex; i < currentDay; i++) {
        avgFiber += intakeAmt[i];
      }
      avgFiber = Math.floor(avgFiber / days);

      var thresholdAmt = thresholds[genderString][ageRangeString][intakeType];
      var percentage = Math.floor((avgFiber / thresholdAmt) * 100);
      if (percentage < 100) {
        dietParamString += "diet=high-fiber&";
      }

      resultString += `Fiber: ${percentage}% (${avgFiber} g/${thresholdAmt} g) of daily recommended intake\n`;
    }
  }

  //console.log(resultString);
  var dataDictionary = {};
  console.log(dietParamString);
  console.log(maxCalorieMeal);
  const threeRecipesDataPromise = await getEdamamData(dietParamString, maxCalorieMeal);
  console.log("bruh", typeof (threeRecipesDataPromise));
  console.log("bruh", threeRecipesDataPromise);

  //threeRecipesDataPromise.then((recipes) => dataDictionary["threeRecipesData"] = recipes);
  //threeRecipesDataPromise.catch((error) => console.log(error.code, error.message));
  dataDictionary["summaryString"] = resultString;

  console.log("returning dictionary");
  return dataDictionary;
};

const checkThresholds = async (uid) => {
  console.log("checking thresholds");
  var counter = await userIntakerHelper("counter", uid);
  const intakes = await userIntakerHelper("intakes", uid);
  const userParams = await userIntakerHelper("userParams", uid);
  var recString = "Recommendations:\n";
  counter = counter.dayCounter;
  const ageRangeString = ageToRange(userParams.age);
  const genderString = userParams.gender;
  const thresholds = await thresholdsHelper("thresholds");
  for (var [intakeType, intakeAmt] of Object.entries(intakes)) {
    console.log(intakeType);
    if (intakeType == "calories") {
      console.log(thresholds == null);
      console.log(counter == null);
      console.log("thresholds", thresholds);
      console.log("gender", genderString);
      console.log("age", ageRangeString);
      console.log("counter", counter);
      console.log("intakeamt", intakeAmt);
      if (intakeAmt[counter] > thresholds[genderString][ageRangeString][intakeType]) {
        console.log("safe");
        recString = recString.concat(
          `You have exceeded the recommended daily limit of calories(${thresholds[genderString][ageRangeString][intakeType]} cal)\n`
        );
      } else if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType] * 0.8
      ) {
        recString = recString.concat(
          `You have exceeded 80% of the recommended daily limit of calories(${thresholds[genderString][ageRangeString][intakeType] * 0.8
          } cal)\n`
        );
      }
    }

    if (intakeType == "cholesterol") {
      if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType]
      ) {
        recString = recString.concat(
          `You have exceeded the recommended daily limit of cholesterol(${thresholds[genderString][ageRangeString][intakeType]} mg)\n`
        );
      } else if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType] * 0.8
      ) {
        recString = recString.concat(
          `You have exceeded 80% of the recommended daily limit of cholesterol(${thresholds[genderString][ageRangeString][intakeType] * 0.8
          } mg)\n`
        );
      }
    }

    if (intakeType == "fat") {
      if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType]
      ) {
        recString = recString.concat(
          `You have exceeded the recommended daily limit of fat(${thresholds[genderString][ageRangeString][intakeType]} grams)\n`
        );
      } else if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType] * 0.8
      ) {
        recString = recString.concat(
          `You have exceeded 80% of the recommended daily limit of fat(${thresholds[genderString][ageRangeString][intakeType] * 0.8
          } grams)\n`
        );
      }
    }

    if (intakeType == "protein") {
      if (
        intakeAmt[counter] <
        thresholds[genderString][ageRangeString][intakeType]
      ) {
        recString = recString.concat(
          `You have not met the recommended daily intake of protein(${thresholds[genderString][ageRangeString][intakeType]} grams)\n`
        );
      } else if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType]
      ) {
        recString = recString.concat(
          `You have met the recommended daily intake of proteins(${thresholds[genderString][ageRangeString][intakeType]} grams)\n`
        );
      } else if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType] * 0.8
      ) {
        recString = recString.concat(
          `You have consumed 80% of the recommended daily intake of proteins(${thresholds[genderString][ageRangeString][intakeType] * 0.8
          } grams)\n`
        );
      }
    }

    if (intakeType == "fiber") {
      if (
        intakeAmt[counter] <
        thresholds[genderString][ageRangeString][intakeType]
      ) {
        recString = recString.concat(
          `You have not met the recommended daily intake of fiber(${thresholds[genderString][ageRangeString][intakeType]} grams)\n`
        );
      } else if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType]
      ) {
        recString = recString.concat(
          `You have met the recommended daily intake of fiber(${thresholds[genderString][ageRangeString][intakeType]} grams)\n`
        );
      } else if (
        intakeAmt[counter] >
        thresholds[genderString][ageRangeString][intakeType] * 0.8
      ) {
        recString = recString.concat(
          `You have consumed 80% of the recommended daily intake of fiber(${thresholds[genderString][ageRangeString][intakeType] * 0.8
          } grams)\n`
        );

      }
    }
  }


  if (recString != "Recommendations:\n") {
    console.log(recString);
    return recString;
  } else {
    console.log("You adhered to all recommended daily amount of nutrients. Great work!\n");
    return "You adhered to all recommended daily amount of nutrients. Great work!\n";
  }
};

export const userIntake = async (
  uid,
  fat,
  protein,
  fiber,
  cholesterol,
  calories
) => {
  console.log("userIntake called");

  var db = database;
  var initIntake = 0;
  var dayCounter = 0;

  const data = await userIntakerHelper("counter", uid);
  initIntake = data.firstIntake;
  dayCounter = data.dayCounter;

  const currentDay = new Date().getDate();

  if (initIntake == 0) {
    // TODO: fix date system, currently rewrites over data every month
    await set(ref(db, "counter/" + uid), {
      firstIntake: 0,
      dayCounter: 0,
      currentDay: currentDay,
    });

    await set(ref(db, "intakes/" + uid), {
      fat: { [dayCounter]: fat },
      protein: { [dayCounter]: protein },
      fiber: { [dayCounter]: fiber },
      cholesterol: { [dayCounter]: cholesterol },
      calories: { [dayCounter]: calories },
    });
    await set(ref(db, "counter/" + uid), {
      dayCounter: 0,
      firstIntake: 1,
      currentDay: currentDay,
    });
  } else {
    const currentDayData = await userIntakerHelper("counter", uid);
    if (currentDayData.currentDay != currentDay) {
      await set(ref(db, "counter/" + uid), {
        dayCounter: currentDayData.dayCounter + 1,
        firstIntake: 1,
        currentDay: currentDay,
      });
      dayCounter = currentDayData.dayCounter + 1;
    }

    get(child(ref(db), "intakes/" + uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          for (var [key, value] of Object.entries(snapshot.val())) {
            const newValue = eval(key) + parseInt(eval(value[dayCounter]));
            const updates = {};
            if (value[dayCounter] != null) {
              updates["/intakes/" + uid + "/" + key + "/" + dayCounter] = newValue;
              update(ref(db), updates);
            } else {
              updates["/intakes/" + uid + "/" + key + "/" + dayCounter] = eval(key);
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

  const res = await checkThresholds(uid);
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
