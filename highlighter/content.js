function highlight(node, pos, keyword, options) {
	var element = document.createElement("b");
	element.className = "highlighted";
	element.style.color = options.foreground;
	element.style.backgroundColor = options.background;

	var highlighted = node.splitText(pos);
	/*var afterHighlighted = */highlighted.splitText(keyword.length);
	var highlightedClone = highlighted.cloneNode(true);

	element.appendChild(highlightedClone);
	highlighted.parentNode.replaceChild(element, highlighted);
}

function addHighlights(node, keywords, options) {
	var skip = 0;

	var i;
	if (3 == node.nodeType) {
		for (i = 0; i < keywords.length; i++) {
			var keyword = keywords[i].toLowerCase();
			var pos = node.data.toLowerCase().indexOf(keyword);
			if (0 <= pos) {
				highlight(node, pos, keyword, options);
				skip = 1;
			}
		}
	}
	else if (1 == node.nodeType && !/(script|style|textarea)/i.test(node.tagName) && node.childNodes) {
		for (i = 0; i < node.childNodes.length; i++) {
			i += addHighlights(node.childNodes[i], keywords, options);
		}
	}

	return skip;
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/", false);
xhr.send();
var result = xhr.responseText;
var keywords = result.split(",");

var options = {"foreground": "#000000", "background": "#ffff00"};

addHighlights(document.body, keywords, options);
