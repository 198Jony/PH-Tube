function showLoader() {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}

function hideLoader() {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

//fetch categories

const fetchCategory = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=>displayCategory(data.categories))
}
//display fetch categories
const displayCategory = (category) => {
    
     const categoryContainer = document.getElementById('category-container');
     for(const cat of category){
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML=`<button id="btn-${cat.category_id}" onclick="loadCategoryWiseVideo(${cat.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white">${cat.category}</button>`
        categoryContainer.appendChild(categoryDiv);
     }
}

//fetch videos
const fetchVideos = (videoDetailes = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${videoDetailes}`)
    .then(res=>res.json())
    .then(data=>displayVideo(data.videos))
}

//Display fetch videos
const displayVideo = (video) => {
    showLoader();
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    if(video.length==0){
        videoContainer.innerHTML=` <div class="flex justify-center items-center col-span-full mt-20">
                <div>
                    <img class="mx-auto" src="assets/Icon.png" alt="">
                    <p>Oops!! Sorry, There is no content here</p>
                </div>
            </div>`
            hideLoader();
            return;
    }

    for(const vid of video){
        const videoDiv = document.createElement("div");
        videoDiv.innerHTML =`<div class="card bg-base-100 shadow-sm">
                <figure class="relative">
                  <img class="w-full h-44"
                    src="${vid.thumbnail}"
                    alt="Shoes" />
                    <span class="absolute bg-black px-2 text-white rounded-sm bottom-2 right-2">3hrs 56 min ago</span>
                </figure>
                <div class="flex gap-5 py-5 px-2">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                          <img src="${vid.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div>
                        <h2 class="font-bold">${vid.title}</h2>
                        <div class="flex items-center gap-2">
                            <p>${vid.authors[0].profile_name}</p>
                             ${vid.authors[0].verified ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">` : ``}
                        </div>
                        <p>${vid.others.views}</p>
                    </div>
                </div>
              </div>`

              videoContainer.appendChild(videoDiv);
    }
    hideLoader();
}

//load categoriesWise video
const loadCategoryWiseVideo = (id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {

        const activeID = document.getElementById(`btn-${id}`)
        activeID.classList.add('active');
        console.log(activeID);
        displayVideo(data.category)
    })
}

document.getElementById("valid-input").addEventListener("keyup",function(e){
    const input = e.target.value;
    fetchVideos(input);
})
//call fetch categories
fetchCategory()



