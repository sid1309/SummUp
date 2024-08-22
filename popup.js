chrome.tabs.query({active: true, currentWindow: true},async function(tabs) {
  var tab = tabs[0];
  var url = tab.url;
  var video_id= url.split('=')[1];
  if (url.includes("youtube.com") || url.includes("youtu.be")) 
  {
  
    if (video_id) {
      const apiUrl = `https://youtube-captions-and-transcripts.p.rapidapi.com/getCaptions?videoId=${video_id}&lang=en&format=json`;
      const options = {
        method: 'GET',
	headers: {
		'x-rapidapi-key': '2de403dc2bmsh562c19d31e0ab5ep1628a6jsn9936eb128634',
		'x-rapidapi-host': 'youtube-captions-and-transcripts.p.rapidapi.com'
        }
      };



      try {
        const response = await fetch(apiUrl, options);
        const parsedResult = await response.json();
       
        let concatenatedText = "";
        if (parsedResult.data) {
          for (let i = 0; i < parsedResult.data.length; i++) {
            concatenatedText += parsedResult.data[i].text + " ";
        }

            console.log(concatenatedText);

        
          const summarizationApiUrl = 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text';
          const summarizationOptions = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '2de403dc2bmsh562c19d31e0ab5ep1628a6jsn9936eb128634',
		'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        lang: 'en',
        text: concatenatedText
    })
    
};

try {
    const summarizationResponse = await fetch(summarizationApiUrl, summarizationOptions);
    const summarizationResult = await summarizationResponse.json();
    const summaryText = summarizationResult.summary;

    // Display the summary
    document.getElementById('summary').innerText = summaryText;

} catch (error) {
    console.error(error);
    document.getElementById('summary').innerText = "Error fetching summarization data.";
}
        
        }
      } catch (error) {
        console.error(error);
        document.getElementById('summary').innerText = "Error fetching transcript data.";
      }

  } else {
    document.getElementById('summary').innerText = "This is not a YouTube video.";
  }
}else {
  document.getElementById('summary').innerText = "This is not a YouTube video.";
}
}
);
