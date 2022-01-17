document.querySelector('#encrypt').addEventListener('click', function(){
    console.log("clicked")
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {encrypt: true});
	});
})
