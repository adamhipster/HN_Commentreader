var comments = document.getElementsByClassName("comment-tree")[0].firstElementChild.children;
var commentsIndex = document.getElementsByClassName("comment-tree")[0].getElementsByClassName("ind");
var parents = new Array();
var parentsYCoords = new Array();

for (i = 0; i < comments.length; i++) {
	var widthOfComment = commentsIndex[i].children[0].width;
	if (widthOfComment == 0){
		parents.push(comments[i]);
		parentsYCoords.push(comments[i].getBoundingClientRect().y);
	}
}

function goToParentLeft(currentSmallestCoordDifference, stopCondition){
	currentElement = -1;
	currentSmallestCoordDifference = -100000;
	for (i = 0; i < parents.length; i++){
		yCoordDifference = parentsYCoords[i] - window.pageYOffset;
		console.log(yCoordDifference + " " + currentSmallestCoordDifference);
		if(yCoordDifference < 0 && yCoordDifference > currentSmallestCoordDifference){
			currentSmallestCoordDifference = yCoordDifference;
			currentElement = i;
		}
	}
	window.scrollTo(0,parentsYCoords[currentElement]);
}

function goToParentRight(){
	currentElement = -1;
	currentSmallestCoordDifference = 100000;
	for (i = 0; i < parents.length; i++){
		yCoordDifference = parentsYCoords[i] - window.pageYOffset;
		console.log(yCoordDifference + " " + currentSmallestCoordDifference);
		if(yCoordDifference > 0 && yCoordDifference < currentSmallestCoordDifference){
			currentSmallestCoordDifference = yCoordDifference;
			currentElement = i;
		}
	}
	window.scrollTo(0,parentsYCoords[currentElement]);
}

function checkKey(e) {
	e = e || window.event;
	left = "37";
	right = "39";
	
	if (e.keyCode == left) {
		goToParentLeft();
	}
	else if (e.keyCode == right) {
		goToParentRight();
	}
}

document.onkeydown = checkKey;