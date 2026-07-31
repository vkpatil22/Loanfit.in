console.log("script.js loaded");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    let current = "";

    sections.forEach((section) => {

        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.id;
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);

window.addEventListener("load", updateActiveLink);

// ===============================
// Contact Form AJAX
// ===============================

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = document.getElementById("submitBtn");
        const message = document.getElementById("formMessage");

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Sending...
        `;

        message.style.display = "none";

        const formData = new FormData(form);

        try {

            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                message.className = "success";
                message.style.display = "block";
                message.innerHTML = `
                    <i class="bi bi-check-circle-fill"></i>
                    Thank you! Your message has been sent successfully.
                    We'll get back to you shortly.
                `;

                form.reset();

                setTimeout(() => {
                    message.style.display = "none";
                }, 5000);

            } else {

                throw new Error();

            }

        } catch (error) {

            message.className = "error";
            message.style.display = "block";
            message.innerHTML = `
                <i class="bi bi-exclamation-circle-fill"></i>
                Sorry! We couldn't send your message.
                Please try again.
            `;

        }

        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <i class="bi bi-send-fill"></i>
            Send Message
        `;

    });

}

// ===============================
// Live Validation
// ===============================

const fields = document.querySelectorAll(
    "#name,#email,#subject,#message"
);

fields.forEach(field=>{

    field.addEventListener("input",()=>{

        if(field.value.trim() !== ""){

            field.classList.remove("invalid");
            field.classList.add("valid");

        }else{

            field.classList.remove("valid");
            field.classList.add("invalid");

        }

    });

});

// Email Validation

const email = document.getElementById("email");

email.addEventListener("input",()=>{

    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(email.value)){

        email.classList.remove("invalid");
        email.classList.add("valid");

    }else{

        email.classList.remove("valid");
        email.classList.add("invalid");

    }

});

// Character Counter

const messageBox=document.getElementById("message");
const charCount=document.getElementById("charCount");

messageBox.addEventListener("input",()=>{

    const length=messageBox.value.length;

    charCount.innerHTML=`${length} / 500`;

    if(length>450){

        charCount.classList.add("limit");

    }else{

        charCount.classList.remove("limit");

    }

});