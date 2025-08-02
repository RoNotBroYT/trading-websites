const hotStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, squeezeDuration: '3 weeks', earnings: 'Positive Q3' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 720.10, change: -1.2, squeezeDuration: '2.5 weeks', earnings: 'Strong Q2' },
];

const newsFeed = [
    { title: 'Apple Reports Record Earnings', date: '2025-07-30', source: 'CNBC' },
    { title: 'Tesla Plans New Factory', date: '2025-07-29', source: 'Reuters' },
];

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        toggleButton.textContent = 'Toggle Light Mode';
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isNowDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDark);
        toggleButton.textContent = isNowDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });

    showSection('home');

    const stockTableBody = document.getElementById('hot-stock-body');
    hotStocks.forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.name} (${stock.symbol})</td>
            <td>$${stock.price.toFixed(2)}</td>
            <td class="${stock.change >= 0 ? 'positive' : 'negative'}">${stock.change.toFixed(2)}%</td>
            <td>${stock.squeezeDuration}</td>
            <td>${stock.earnings}</td>
            <td><button onclick="addToWatchlist('${stock.symbol}')">Add to Watchlist</button></td>
        `;
        stockTableBody.appendChild(row);
    });

    const newsContainer = document.getElementById('news-feed');
    newsFeed.forEach(news => {
        const div = document.createElement('article');
        div.innerHTML = `<h3>${news.title}</h3><p>${news.date} - ${news.source}</p>`;
        newsContainer.appendChild(div);
    });

    const forumPosts = document.getElementById('forum-posts');
    const forumForm = document.getElementById('forum-form');
    forumForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('post-content').value;
        const div = document.createElement('div');
        div.className = 'forum-post';
        div.innerHTML = `<p>${content}</p><small>Posted on ${new Date().toLocaleString()}</small>`;
        forumPosts.prepend(div);
        forumForm.reset();
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function addToWatchlist(symbol) {
    alert(`Added ${symbol} to watchlist!`);
}
