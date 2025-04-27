async function fetchNewTokens() {
    const url = "https://api.solscan.io/token/list?sortType=createdAtDesc&limit=10"; // ambil 10 token terbaru
    try {
        const response = await fetch(url, {
            headers: {
                "accept": "application/json",
                "token": SOLSCAN_API_KEY
            }
        });
        const data = await response.json();
        
        const list = document.getElementById('tokenList');
        list.innerHTML = ''; // Clear sebelumnya

        if (data && data.data && data.data.length > 0) {
            data.data.forEach(token => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>${token.tokenName}</strong> (${token.symbol})`;
                list.appendChild(div);
            });
        } else {
            list.innerHTML = "Tidak ada data token baru.";
        }

    } catch (error) {
        console.error("Gagal fetch data:", error);
        document.getElementById('tokenList').innerHTML = "Error mengambil data.";
    }
}

// Jalankan pertama kali
fetchNewTokens();

// Update tiap 10 detik
setInterval(fetchNewTokens, 10000);
