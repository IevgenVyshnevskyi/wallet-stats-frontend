export default function setCSRFToken() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("csrftoken=")) {
      localStorage.setItem('X-CSRFToken', cookie.substring(10, cookie.length));
    }
  }
}