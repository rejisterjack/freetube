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
        console.log("Fetched videos:", data.data.data)
        
      } else {
        console.error("Invalid API response format")
      }
    })
    .catch((error) => console.error("Error fetching videos:", error))
})
