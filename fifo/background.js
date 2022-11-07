let trashId; // ID of the bookmarks trash bin

// retrieve and store ID of bookmarks trash bin
chrome.bookmarks.getRootByName('trash', function(object) {
	trashId = object.id; 
});

// add listener for bookmark creation
chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
	moveToEnd(bookmark); // Move bookmark to end
});

// add listener for bookmark move
chrome.bookmarks.onMoved.addListener(function(id, moveInfo) {
	if (moveInfo.parentId == trashId) { return; } // if move to trash dont do anything

	// If moved to new folder
	if (moveInfo.parentId != moveInfo.oldParentId) {
		if (moveInfo.index == 0) { // if left to go to first index
			moveToEnd({"id":id, "parentId":moveInfo.parentId}); // move to bottom of list
		}
	}
});

// function to move node (bookmark or folder) to bottom of list
function moveToEnd(node) {
	chrome.bookmarks.getChildren(node.parentId, function(children) { // get all children of parent node
		endIndex = children.length; // Get length (also end index)

		chrome.bookmarks.move(node.id, {"index":endIndex}); // move node
	});
}