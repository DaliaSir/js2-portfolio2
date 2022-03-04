export function logout() {
    const logoutButton = document.querySelector("#logout");

    if (logoutButton) {
        logoutButton.onclick = () => {
            if (confirm("Are you sure you want to leave?")) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                location.href = "/login.html";
            }
        };
    }
}