fetch('configs.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        if (!data.trim()) {
            console.error('فایل configs.txt خالی است');
            return;
        }
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
    })
    .catch(error => {
        console.error('خطا در لود configs.txt:', error);
        document.getElementById('config-list').innerHTML = '<p>خطا در بارگذاری کانفیگ‌ها. لطفاً بعداً امتحان کنید.</p>';
    });

function copyConfig(config) {
    navigator.clipboard.writeText(config).then(() => {
        alert('کانفیگ کپی شد!');
    }).catch(err => {
        console.error('خطا در کپی:', err);
    });
    }
