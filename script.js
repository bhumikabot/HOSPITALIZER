
let hospitals = [];
async function fetchHospitals() {
    try {
        const res = await fetch('/api/hospitals');
        hospitals = await res.json();
    } catch (err) {
        hospitals = [];
    }
}

async function renderHospitals(filter = "") {
    if (!hospitals.length) await fetchHospitals();
    const list = document.querySelector('.hospital-list');
    let html = '<h2>Hospitals Nearby</h2>';
    html += `<div class='search-bar'>
        <input type='text' id='searchInput' placeholder='Search hospitals...'>
        <button id='searchBtn'>Search</button>
    </div>`;
    hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(filter.toLowerCase()) ||
        hospital.address.toLowerCase().includes(filter.toLowerCase())
        ).forEach((hospital, idx) => {
            html += `<div class="hospital-card">
                <h3>
                    <a href="#" class="hospital-link" data-idx="${idx}" style="color:#ffd700;text-decoration:underline;">${hospital.name}</a>
                    <span>(${hospital.type})</span>
                </h3>
                <p><strong>Address:</strong> ${hospital.address}</p>
                <p><strong>Website:</strong> <a href="${hospital.website}" target="_blank">Visit</a></p>
                <p><strong>Helpline:</strong> <a href="tel:${hospital.helpline}">${hospital.helpline}</a></p>
                <p><strong>Timings:</strong> ${hospital.timings}</p>
                <p><strong>Status:</strong> <span style="color:${hospital.status==='Open'?'green':'red'}">${hospital.status}</span></p>
                <p><a href="https://www.google.com/maps/search/?api=1&query=${hospital.location}" target="_blank">View on Google Maps</a></p>
            </div>`;
        });
        list.innerHTML = html;
        // Add search bar event
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        if(searchInput && searchBtn) {
            searchBtn.onclick = () => renderHospitals(searchInput.value);
            searchInput.onkeyup = (e) => {
                if(e.key === 'Enter') renderHospitals(searchInput.value);
            };
        }
        // Add hospital name click event
        document.querySelectorAll('.hospital-link').forEach(link => {
            link.onclick = function(e) {
                e.preventDefault();
                const idx = this.getAttribute('data-idx');
                const hospital = hospitals[idx];
                if(hospital) {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${hospital.location}`, '_blank');
                }
            };
        });
    }

    function showTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.style.display = 'block';
            activeTab.classList.add('active');
            if(tabId === 'hospitals') {
                // If coming from home search, use value
                const homeSearchInput = document.getElementById('homeSearchInput');
                if(homeSearchInput && homeSearchInput.value) {
                    renderHospitals(homeSearchInput.value);
                } else {
                    renderHospitals();
                }
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Home page search bar
        const homeSearchInput = document.getElementById('homeSearchInput');
        const homeSearchBtn = document.getElementById('homeSearchBtn');
        if(homeSearchInput && homeSearchBtn) {
            homeSearchBtn.onclick = () => {
                showTab('hospitals');
                renderHospitals(homeSearchInput.value);
            };
            homeSearchInput.onkeyup = (e) => {
                if(e.key === 'Enter') {
                    showTab('hospitals');
                    renderHospitals(homeSearchInput.value);
                }
            };
        }
        // Tab navigation (event delegation for robustness)
        var navbar = document.querySelector('.navbar');
        if(navbar) {
            navbar.addEventListener('click', function(e) {
                const link = e.target.closest('.tab-link');
                if(link) {
                    e.preventDefault();
                    const tab = link.getAttribute('data-tab');
                    showTab(tab);
                    // Highlight active nav button
                    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                    link.classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
        // Set Home as active on load
        document.querySelector('.nav-btn[data-tab="home"]').classList.add('active');
        showTab('home');
    
        // Login form validation (via backend)
        const loginForm = document.getElementById('loginForm');
        if(loginForm) {
            loginForm.onsubmit = async function(e) {
                e.preventDefault();
                const email = document.getElementById('emailInput').value.trim();
                const password = document.getElementById('passwordInput').value;
                const errorDiv = document.getElementById('loginError');
                let errorMsg = "";
                try {
                    const res = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });
                    const data = await res.json();
                    if (!res.ok) {
                        errorMsg = data.error || 'Login failed.';
                    } else {
                        errorDiv.style.display = 'none';
                        showTab('profile');
                        document.getElementById('profile').innerHTML = `<h2>Your Profile</h2><p>Email: ${email}</p><p>Welcome!</p>`;
                    }
                } catch (err) {
                    errorMsg = 'Network error.';
                }
                if(errorMsg) {
                    errorDiv.textContent = errorMsg;
                    errorDiv.style.display = 'block';
                }
            };
        }
    });
