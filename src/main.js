document.addEventListener("DOMContentLoaded", () => {
  // API URL to fetch YouTube videos
  const apiUrl = "https://api.freeapi.app/api/v1/public/youtube/videos"

  // DOM elements
  const videoGrid = document.getElementById("videoGrid")
  const searchInput = document.getElementById("search")
  const themeToggle = document.getElementById("theme-toggle")
  const headerText = document.getElementById("header-text")

  // Array to store fetched videos
  let videos = []

  // Fetch videos from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Check if the API response is valid
      if (
        data.statusCode === 200 &&
        data.data &&
        Array.isArray(data.data.data)
      ) {
        // Map API response to a simplified video object
        videos = data.data.data.map((item) => {
          const video = item.items
          return {
            videoId: video.id,
            title: video.snippet.title,
            channelName: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.high.url,
          }
        })

        // Display the fetched videos
        displayVideos(videos)
      } else {
        console.error("Invalid API response format")
      }
    })
    .catch((error) => console.error("Error fetching videos:", error))

  // Function to display videos in the grid
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

  // Utility function to debounce user input
  function debounce(func, delay) {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), delay)
    }
  }

  // Function to filter videos based on search input
  function searchVideos() {
    const searchText = searchInput.value.toLowerCase()
    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(searchText)
    )
    displayVideos(filteredVideos)
  }

  // Debounce the search function to improve performance
  const debouncedSearch = debounce(searchVideos, 300)

  // Add event listener for search input
  searchInput.addEventListener("input", debouncedSearch)

  // Add event listener for theme toggle button
  themeToggle.addEventListener("click", () => {
    const body = document.body

    // Toggle between dark and light themes
    if (body.getAttribute("data-bs-theme") === "dark") {
      body.setAttribute("data-bs-theme", "light")
      headerText.classList.remove("text-light")
      headerText.classList.add("text-dark")
      themeToggle.textContent = "Dark Mode"
    } else {
      body.setAttribute("data-bs-theme", "dark")
      headerText.classList.remove("text-dark")
      headerText.classList.add("text-light")
      themeToggle.textContent = "Light Mode"
    }
  })
})
