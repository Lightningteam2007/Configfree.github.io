document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const configList = document.getElementById('config-list');

    // نمایش لودینگ
    loading.style.display = 'block';
    configList.style.display = 'none';

    fetch('configs.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            loading.style.display = 'none';
            configList.style.display = 'block';

            if (!data.trim()) {
                console.error('فایل configs.txt خالی است');
                configList.innerHTML = '<p class="error">فایل کانفیگ خالی است.</p>';
                return;
            }

            const configs = data.trim().split('\n');
            configList.innerHTML = ''; // پاک کردن محتوای قبلی
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
            loading.style.display = 'none';
            configList.style.display = 'block';
            console.error('خطا در لود configs.txt:', error);
            configList.innerHTML = '<p class="error">خطا در بارگذاری کانفیگ‌ها. لطفاً بعداً امتحان کنید.</p>';
        });
});

function copyConfig(config) {
    navigator.clipboard.writeText(config).then(() => {
        alert('کانفیگ کپی شد!');
    }).catch(err => {
        console.error('خطا در کپی:', err);
    });
              }
