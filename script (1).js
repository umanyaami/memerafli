
const tokenListContainer = document.createElement('div');
document.body.appendChild(tokenListContainer);

async function fetchNewTokens() {
  try {
    const response = await fetch('https://api.solscan.io/token/list?sort_by=createdAt&limit=10', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3NDU3NzIyMjE1NzAsImVtYWlsIjoidW1hbnlhYW1pQGdtYWlsLmNvbSIsImFjdGlvbiI6InRva2VuLWFwaSIsImFwaVZlcnNpb24iOiJ2MiIsImlhdCI6MTc0NTc3MjIyMX0.rBuN697yMv_kNHd5EdRkuAUzuR0rBtRar7vubrvmXk4'
      }
    });

    const data = await response.json();

    if (data?.data?.length > 0) {
      tokenListContainer.innerHTML = ''; // Bersihkan list sebelumnya

      data.data.forEach(token => {
        const tokenElement = document.createElement('div');
        tokenElement.textContent = `Name: ${token.name || 'Unknown'}, Symbol: ${token.symbol || 'Unknown'}, Address: ${token.address}`;
        tokenElement.style.margin = '10px 0';
        tokenListContainer.appendChild(tokenElement);
      });
    } else {
      tokenListContainer.innerHTML = 'Belum ada token baru.';
    }
  } catch (error) {
    console.error('Error fetch token:', error);
    tokenListContainer.innerHTML = 'Gagal mengambil data.';
  }
}

// Pertama kali fetch
fetchNewTokens();

// Auto refresh tiap 10 detik
setInterval(fetchNewTokens, 10000);
