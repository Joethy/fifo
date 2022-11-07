let trashId;

chrome.bookmarks.getRootByName('trash', function(object) {
	trashId = object.id;
});

chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
	moveToEnd(bookmark,"create");
});

chrome.bookmarks.onMoved.addListener(function(id, moveInfo) {
	if (moveInfo.parentId == trashId) { return; }

	if (moveInfo.parentId != moveInfo.oldParentId) {
		if (moveInfo.index == 0) {
			moveToEnd({"id":id, "parentId":moveInfo.parentId}, "move");
		}
	}
});

function moveToEnd(node, source) {
	chrome.bookmarks.get(node.parentId, function(parent) {
		parentId = parent[0].id;

		chrome.bookmarks.getChildren(parentId, function(children) {
			endIndex = children.length-1;
			
			console.log(node.id+" "+source);
		});
	});
}