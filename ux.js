
function showMale() {
    modalIndex.style.display = "none";
    modalGenerateMale.style.display = "block";
}

function showFemale() {
    modalIndex.style.display = "none";
    modalGenerateFemale.style.display = "block";
}

function showIndex() {
    modalLoaded.style.display = "none";
    modalIndex.style.display = "block";
}

function goBack() {
    location.reload();
}

//when page completely loads, execute anonymous function
window.onload = function() {
    maleIcon.addEventListener("click", showMale);
    femaleIcon.addEventListener("click", showFemale);
    newProfile.addEventListener("click", showIndex);
    refreshMale.addEventListener("click", goBack);
    refreshFemale.addEventListener("click", goBack);
}

