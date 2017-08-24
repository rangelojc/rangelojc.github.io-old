//attaches function to the onload event of the page
window.addEventListener("load", function () {
    generateMale.setAttribute('onclick', 'execute("male")');
    generateFemale.setAttribute('onclick', 'execute("female")');
    resetProfile.setAttribute('onclick', 'resetProfileData()');
});



/**********************************************************************************************
Function: generateName()
Parameters: request, gender
            request - defines the type of data that will be requested by the execute() function
            gender  - defines the gender basis that will be used in the script

Description:
          - Generate random name data from pre-defined arrays, and then
            return values based on request type.

************************************************************************************************/

function generateName(request, gender) {

    var fname = [];          //defines holder of first names

    if (gender == "male") {                                                 //gives male first name values to fname array
        fname = [
            "Dandelion", "Vernon", "Letho", "Zoltan",
            "Olgierd", "Geralt", "Vlodimir", "Vesimir", "Eskel", "Emhyr"
        ];
    }
    else if (gender == "female") {                                          //gives female first name values to fname array
        fname = [
            "Yennefer", "Shani", "Priscilla", "Philippa",
            "Cerys", "Iris", "Triss", "Cirilla", "Corinne", "Keira"
        ];
    }

    var lname = [                                                           //defines the holder of data for last names
        "Doe", "Carter", "Merigold", "Johnson", "Calvin", "Natalis",
        "le Tancarville", "Chivay", "Blaze", "Metz", "O'Dimm",
        "McDonald", "Gabriel", "O'Dimm", "Blockstock", "von Everec",
        "an Craite", "Vigo", "var Emhreis", "Anna", "La Vallete"
    ];
    var age = [];              //defines holder of age numbers

    for (i = 20; i < 80; i++){     //adds age numbers via for loop
      age.push(i+1);
    }

    //determines which to return when function is called by randomizing array indexes then rounding off
    if (request == "fname") {
      var aindex = Math.round(Math.random() * (fname.length - 1))           //limits index selection by deducting 1 from the length of the array
      return fname[aindex];
    }
    else if (request == "lname") {
      var aindex = Math.round(Math.random() * (lname.length - 1))           //limits index selection by deducting 1 from the length of the array
      return lname[aindex];
    }
    else if (request == "age") {
      var aindex = Math.round(Math.random() * (age.length - 1));            //limits index selection by deducting 1 from the length of the array
      return age[aindex];
    }
}




/*********************************************************************
Function: setObject()
Parameters: fname, lname, age
            fname   - defines the first name variable
            lname   - defines the last name variable
            age     - defines the age variable
Description:
          - Assign random values taken from the generateData
            function into a single object then return the object.   
*********************************************************************/

function setObject(fname, lname, age) {

    var personHolder = {};
    personHolder.fname = fname;
    personHolder.lname = lname;
    personHolder.age = age;

    return personHolder;
}




/************************************************************************************
Function: execute()
Parameters: gender
            gender - defined by the button onclick event,
                     determines which button is calling the execute() function
Description:
          - Calls generateName function to get name data
          - Calls setObject function to consolidate name data to an object
          - Loops through the object contents in for displaying purposes
          - Saves the generated profile and corresponding gender data into the browser localStorage
************************************************************************************/

function execute(gender) {

  var fname = generateName("fname", gender),
      lname = generateName("lname"),
      age = generateName("age");

  var person = setObject(fname, lname, age);

  var lbl = [
      "First Name: \xa0\xa0\xa0\xa0\xa0 ",
      "Last Name: \xa0\xa0\xa0\xa0\xa0\xa0",
      "Age: \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 "
  ];

  var text = ""; var i = 0;

  for (var x in person) {
      text += lbl[i] + person[x] + "<br/><br/>";
     i++;
  }

  if (gender == "male") {
      document.getElementById("resultMale").innerHTML = text;
      localStorage.setItem('profileType', "male");              //save gender
  }
  else if (gender == "female") {
      document.getElementById("resultFemale").innerHTML = text;
      localStorage.setItem('profileType', "female");            //save gender
  }

  localStorage.setItem('profileData', text);                    //save profile data
}



/************************************************************************************
Function: loadProfileData()
Parameters:
Description:
          - Check if profile already exists
          - Load profile from the localStorage based on gender
          - Set the appropriate color accents
************************************************************************************/

//when page completely loads, execute function
window.addEventListener("load", loadProfileData);

function loadProfileData() {
    var profileType = localStorage.getItem('profileType');
    var profileData = localStorage.getItem('profileData');

    if (profileType && profileData) {
        loadedProfile.innerHTML = profileData;
        if (profileType == "male") {
            loadedTitle.style.backgroundColor = "#448AFF";
            loadedAvatar.setAttribute("src", "src/malet.png");
            modalLoaded.style.backgroundColor = "#82B1FF";
            newProfile.style.color = "#82B1FF";
            resetProfile.style.color = "#82B1FF";

        }
        if (profileType == "female") {
            loadedTitle.style.backgroundColor = "#FF4081";
            loadedAvatar.setAttribute("src", "src/femalet.png");
            modalLoaded.style.backgroundColor = "#FF80AB";
            newProfile.style.color = "#FF80AB";
            resetProfile.style.color = "#FF80AB";
        }
    }
}

/************************************************************************************
Function: clearProfile()
Parameters:
Description:
          - Reset the localStorage then reload the page
************************************************************************************/

function resetProfileData() {
    window.localStorage.clear();
    location.reload();
}