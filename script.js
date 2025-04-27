
async function fetchTokenData() {
    const tokenAddress = "0x1234567890abcdef"; // Ganti dengan address token SOL-mu

    const twitterUrl = `https://api.twitter.com/2/users/by/username/tokenrafli?user.fields=public_metrics`;
    const solscanUrl = `https://pro-api.solscan.io/v1.0/token/meta?tokenAddress=${tokenAddress}`;

    try {
        const [twitterRes, solscanRes] = await Promise.all([
            fetch(twitterUrl, {
                headers: {
                    "Authorization": `Bearer ${config.twitterBearerToken}`
                }
            }),
            fetch(solscanUrl, {
                headers: {
                    "accept": "application/json",
                    "token": config.solscanApiKey
                }
            })
        ]);

        const twitterData = await twitterRes.json();
        const solscanData = await solscanRes.json();

        document.getElementById('lastUpdate').innerText = `Terakhir update: ${new Date().toLocaleString()}`;

        document.getElementById('tokenData').innerHTML = `
            <h2>Token Rafli</h2>
            <p>Address: ${tokenAddress}</p>
            <p>Follower: ${twitterData.data.public_metrics.followers_count}</p>
            <p>Liquidity: ${solscanData.data.liquidity || 'N/A'}</p>
            <p>Website: <a href="https://tokenrafli.com" target="_blank">tokenrafli.com</a></p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Auto refresh setiap 10 detik
fetchTokenData();
setInterval(fetchTokenData, 10000);
