fetch('configs.txt')
    .then(response => response.text())
    .then(data => {
        const configs = data.trim().split('\n');
        const configList = document.getElementById('config-list');
        configs.forEach(config => {
            const div = document.createElement('div');
            div.className = 'config-item';
            div.innerHTML = `
                <span class="config-text">${config}</span>
                <button class="copy-btn" onclick="copyConfig('${config}')">کپی</button>
            `;
            configList.appendChild(div);
        });
    });

function copyConfig(config) {
    navigator.clipboard.writeText(config).then(() => {
        alert('کانفیگ کپی شد!');
    });
}
