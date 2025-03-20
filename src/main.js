document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.freeapi.app/api/v1/public/youtube/videos"
  const videoGrid = document.getElementById("videoGrid")
  const searchInput = document.getElementById("search")
  const themeToggle = document.getElementById("theme-toggle")
  const headerText = document.getElementById("header-text")
  let videos = []

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (
        data.statusCode === 200 &&
        data.data &&
        Array.isArray(data.data.data)
      ) {
        videos = data.data.data.map((item) => {
          const video = item.items
          return {
            videoId: video.id,
            title: video.snippet.title,
            channelName: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.high.url,
          }
        })

        displayVideos(videos)
      } else {
        console.error("Invalid API response format")
      }
    })
    .catch((error) => console.error("Error fetching videos:", error))

  function displayVideos(videos) {
    videoGrid.innerHTML = videos
      .map(
        (video) => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">
                        <img src="${video.thumbnail}" class="card-img-top" alt="${video.title}">
                    </a>
                    <div class="card-body">
                        <h6 class="card-title">${video.title}</h6>
                        <p class="card-text text-muted">Channel: ${video.channelName}</p>
                    </div>
                </div>
            </div>
        `
      )
      .join("")
  }
})
