var comments = document.getElementsByClassName("comment-tree")[0].firstElementChild.children;
var commentsIndex = document.getElementsByClassName("comment-tree")[0].getElementsByClassName("ind");
var parents = [];
var parentsYCoords = [];

for (var i = 0; i < comments.length; i++) {
	var widthOfComment = commentsIndex[i].children[0].width;
	if (widthOfComment === 0){
		parents.push(comments[i]);
		parentsYCoords.push(comments[i].getBoundingClientRect().top);
	}
}

function goToParentLeft(){
	var currentElement = -1;
	var currentSmallestCoordDifference = Number.NEGATIVE_INFINITY;
	var yCoordDifference;
	for (var i = 0; i < parents.length; i++) {
		yCoordDifference = parentsYCoords[i] - window.pageYOffset + 1;
		if (yCoordDifference < 0 && yCoordDifference > currentSmallestCoordDifference) {
			currentSmallestCoordDifference = yCoordDifference;
			currentElement = i;
		}
	}
	window.scrollTo(0,parentsYCoords[currentElement]);
}

function goToParentRight(){
	var currentElement = -1;
	var currentSmallestCoordDifference = Number.POSITIVE_INFINITY;
	var yCoordDifference;
	for (var i = 0; i < parents.length; i++) {
		yCoordDifference = parentsYCoords[i] - window.pageYOffset - 1;
		if (yCoordDifference > 0 && yCoordDifference < currentSmallestCoordDifference) {
			currentSmallestCoordDifference = yCoordDifference;
			currentElement = i;
		}
	}
	window.scrollTo(0,parentsYCoords[currentElement]);
}

function checkKey(e) {
	e = e || window.event;
	var left = "37";
	var right = "39";
	
	if (e.keyCode == left) {
		goToParentLeft();
	}
	else if (e.keyCode == right) {
		goToParentRight();
	}
}

document.onkeydown = checkKey;
