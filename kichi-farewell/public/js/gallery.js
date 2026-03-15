// ============================
// KICHI FAREWELL - GALLERY JS
// ============================

const galleryContainer = document.getElementById("gallery");

const API_URL = "http://localhost:5000/api/photos";


// ============================
// LOAD PHOTOS FROM SERVER
// ============================

async function loadGallery() {

    try {

        const res = await fetch(API_URL);

        const photos = await res.json();

        renderGallery(photos);

    } catch (error) {

        console.error("Lỗi tải ảnh:", error);

        galleryContainer.innerHTML = `
            <p class="error">
                Không tải được album ảnh 😢
            </p>
        `;

    }

}


// ============================
// RENDER GALLERY
// ============================

function renderGallery(photos) {

    galleryContainer.innerHTML = "";

    if (photos.length === 0) {

        galleryContainer.innerHTML = `
            <p class="empty">
                Chưa có ảnh nào trong album 📸
            </p>
        `;

        return;
    }


    photos.forEach(photo => {

        const card = document.createElement("div");

        card.className = "gallery-card";

        card.innerHTML = `

            <img src="${photo.imageUrl}" alt="photo">

            <div class="gallery-info">
                <p class="name">${photo.name}</p>
                <p class="date">${formatDate(photo.createdAt)}</p>
            </div>

        `;

        // click mở ảnh lớn
        card.addEventListener("click", () => {

            openLightbox(photo.imageUrl);

        });

        galleryContainer.appendChild(card);

    });

}



// ============================
// LIGHTBOX VIEW
// ============================

function openLightbox(imageUrl) {

    let lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `

        <span class="close">&times;</span>

        <img src="${imageUrl}" class="lightbox-img">

    `;

    document.body.appendChild(lightbox);


    lightbox.querySelector(".close").onclick = () => {

        lightbox.remove();

    };

    lightbox.onclick = (e) => {

        if (e.target === lightbox) {

            lightbox.remove();

        }

    };

}



// ============================
// FORMAT DATE
// ============================

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("vi-VN", {

        year: "numeric",

        month: "2-digit",

        day: "2-digit"

    });

}



// ============================
// AUTO LOAD
// ============================

document.addEventListener("DOMContentLoaded", () => {

    loadGallery();

});



// ============================
// AUTO REFRESH GALLERY
// ============================

setInterval(() => {

    loadGallery();

}, 30000);