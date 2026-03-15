const form = document.getElementById("wishForm")
const wishList = document.getElementById("wishList")

form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const data = new FormData(form)

    await fetch("/api/wish", {

        method: "POST",
        body: data

    })

    loadWishes()

    form.reset()

})


async function loadWishes() {

    const res = await fetch("/api/wishes")

    const wishes = await res.json()

    wishList.innerHTML = ""

    wishes.forEach(w => {

        wishList.innerHTML += `

<div class="wish-card">

<b>${w.name}</b>

<p>${w.message}</p>

${w.image ? `<img src="${w.image}" width="200">` : ""}

</div>

`

    })

}

loadWishes()