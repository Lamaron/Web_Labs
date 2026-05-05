        // Задача 1: Таймеры
        
        // Функция counter(n)
        function counter(n) {
            const logDiv = document.getElementById('counterLog');
            logDiv.innerHTML += `<p>Запуск counter(${n}):</p>`;
            
            let current = n;
            const intervalId = setInterval(() => {
                console.log(current);
                logDiv.innerHTML += `<p>${current}</p>`;
                if (current === 0) {
                    clearInterval(intervalId);
                    logDiv.innerHTML += `<p style="color: green;">✓ Завершено!</p>`;
                }
                current--;
            }, 1000);
        }

        // Функция createCounter(n)
        function createCounter(n) {
            let current = n;
            let intervalId = null;
            
            return {
                start() {
                    if (intervalId) return; // Уже запущен
                    
                    const logDiv = document.getElementById('counterLog');
                    const display = document.getElementById('counterDisplay');
                    
                    intervalId = setInterval(() => {
                        if (current >= 0) {
                            console.log(current);
                            display.textContent = current;
                            logDiv.innerHTML += `<p>${current}</p>`;
                            current--;
                        } else {
                            this.stop();
                            display.textContent = 'Готов к запуску';
                            logDiv.innerHTML += `<p style="color: green;">✓ Завершено!</p>`;
                        }
                    }, 1000);
                },
                
                pause() {
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = null;
                        const logDiv = document.getElementById('counterLog');
                        logDiv.innerHTML += `<p style="color: orange;">⏸ Пауза</p>`;
                    }
                },
                
                stop() {
                    if (intervalId) {
                        clearInterval(intervalId);
                        intervalId = null;
                    }
                    current = n; // Сбрасываем счётчик
                    const display = document.getElementById('counterDisplay');
                    display.textContent = 'Готов к запуску';
                    const logDiv = document.getElementById('counterLog');
                    logDiv.innerHTML += `<p style="color: red;">⏹ Остановлен и сброшен</p>`;
                }
            };
        }

        let myCounter = createCounter(5);

        function startCounter() {
            document.getElementById('counterLog').innerHTML = '';
            document.getElementById('counterDisplay').textContent = '5';
            myCounter.start();
        }

        function pauseCounter() {
            myCounter.pause();
        }

        function stopCounter() {
            myCounter.stop();
        }

        // ====================
        // Задача 2: Промисы
        // ====================
        
        function delay(N) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, N * 1000);
            });
        }

        async function counterWithDelay(n) {
            const logDiv = document.getElementById('counterLog');
            const display = document.getElementById('promiseCounterDisplay');
            
            for (let i = n; i >= 0; i--) {
                if (promiseCounterStopped) break;
                
                console.log(i);
                display.textContent = i;
                logDiv.innerHTML += `<p>${i}</p>`;
                
                if (i > 0) {
                    await delay(1);
                }
            }
            
            if (!promiseCounterStopped) {
                display.textContent = 'Готов к запуску';
                logDiv.innerHTML += `<p style="color: green;">✓ Завершено!</p>`;
            }
        }

        let promiseCounterStopped = false;

        function startPromiseCounter() {
            promiseCounterStopped = false;
            document.getElementById('counterLog').innerHTML = '';
            document.getElementById('promiseCounterDisplay').textContent = '5';
            counterWithDelay(5);
        }

        function stopPromiseCounter() {
            promiseCounterStopped = true;
            document.getElementById('promiseCounterDisplay').textContent = 'Готов к запуску';
            document.getElementById('counterLog').innerHTML += `<p style="color: red;">⏹ Остановлен</p>`;
        }

        // Функция для получения первого репозитория пользователя GitHub
        async function getFirstRepo(username) {
            const loading = document.getElementById('githubLoading');
            const error = document.getElementById('githubError');
            const userCard = document.getElementById('userCard');
            const repoList = document.getElementById('repoList');
            
            loading.classList.add('show');
            error.style.display = 'none';
            userCard.classList.remove('show');
            repoList.innerHTML = '';
            
            try {
                // Первый запрос: получение информации о пользователе
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                
                if (!userResponse.ok) {
                    throw new Error(`Пользователь ${username} не найден`);
                }
                
                const userData = await userResponse.json();
                
                // Показываем информацию о пользователе
                document.getElementById('userAvatar').src = userData.avatar_url;
                document.getElementById('userName').textContent = userData.name || username;
                document.getElementById('userBio').textContent = userData.bio || 'Нет описания';
                document.getElementById('userRepos').textContent = userData.public_repos;
                document.getElementById('userLocation').textContent = userData.location || 'Не указано';
                userCard.classList.add('show');
                
                // Второй запрос: получение репозиториев
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=1`);
                
                if (!reposResponse.ok) {
                    throw new Error('Не удалось получить репозитории');
                }
                
                const repos = await reposResponse.json();
                
                if (repos.length > 0) {
                    const firstRepo = repos[0];
                    repoList.innerHTML = `
                        <h3>Первый репозиторий:</h3>
                        <div class="repo-item">
                            <a href="${firstRepo.html_url}" target="_blank">${firstRepo.name}</a>
                            <p>${firstRepo.description || 'Нет описания'}</p>
                            <p>⭐ ${firstRepo.stargazers_count} | 🍴 ${firstRepo.forks_count} | ${firstRepo.language || 'Не указан'}</p>
                        </div>
                    `;
                } else {
                    repoList.innerHTML = '<p>У пользователя нет публичных репозиториев</p>';
                }
                
            } catch (err) {
                error.textContent = err.message;
                error.style.display = 'block';
            } finally {
                loading.classList.remove('show');
            }
        }

        function getGithubUserInfo() {
            const username = document.getElementById('githubUsername').value.trim();
            if (username) {
                getFirstRepo(username);
            } else {
                alert('Пожалуйста, введите имя пользователя');
            }
        }

        // ====================
        // Задача 3: Async/Await
        // ====================
        
        class HttpError extends Error {
            constructor(response) {
                super(`${response.status} for ${response.url}`);
                this.name = 'HttpError';
                this.response = response;
            }
        }

        async function loadJson(url) {
            const response = await fetch(url);
            if (response.status == 200) {
                return response.json();
            } else {
                throw new HttpError(response);
            }
        }

        // Переписанная функция getGithubUser с использованием async/await и цикла
        async function getGithubUser() {
            const usernameInput = document.getElementById('asyncGithubUsername');
            const loading = document.getElementById('asyncGithubLoading');
            const error = document.getElementById('asyncGithubError');
            const userCard = document.getElementById('asyncUserCard');
            const repoList = document.getElementById('asyncRepoList');
            
            let name = usernameInput.value.trim();
            
            if (!name) {
                alert('Пожалуйста, введите имя пользователя');
                return;
            }
            
            loading.classList.add('show');
            error.style.display = 'none';
            userCard.classList.remove('show');
            repoList.innerHTML = '';
            
            // Используем цикл вместо рекурсии
            while (true) {
                try {
                    const user = await loadJson(`https://api.github.com/users/${name}`);
                    
                    // Показываем информацию о пользователе
                    document.getElementById('asyncUserAvatar').src = user.avatar_url;
                    document.getElementById('asyncUserName').textContent = user.name || name;
                    document.getElementById('asyncUserBio').textContent = user.bio || 'Нет описания';
                    document.getElementById('asyncUserRepos').textContent = user.public_repos;
                    userCard.classList.add('show');
                    
                    // Получаем репозитории
                    const repos = await loadJson(`https://api.github.com/users/${name}/repos?sort=created&order=desc`);
                    
                    if (repos.length > 0) {
                        repoList.innerHTML = '<h3>Репозитории:</h3>';
                        repos.slice(0, 5).forEach(repo => {
                            repoList.innerHTML += `
                                <div class="repo-item">
                                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                    <p>${repo.description || 'Нет описания'}</p>
                                    <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | ${repo.language || 'Не указан'}</p>
                                </div>
                            `;
                        });
                    } else {
                        repoList.innerHTML = '<p>У пользователя нет публичных репозиториев</p>';
                    }
                    
                    alert(`Полное имя: ${user.name || 'Не указано'}.`);
                    return user;
                    
                } catch (err) {
                    if (err instanceof HttpError && err.response.status == 404) {
                        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
                        name = prompt("Введите другой логин?", "iliakan");
                        if (!name) {
                            loading.classList.remove('show');
                            return;
                        }
                        usernameInput.value = name;
                    } else {
                        error.textContent = `Ошибка: ${err.message}`;
                        error.style.display = 'block';
                        loading.classList.remove('show');
                        throw err;
                    }
                }
            }
        }

function getGithubUserAsync() {
    getGithubUser().catch(err => {
        console.error('Final error:', err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('counterLog').innerHTML = '<p><strong>Демонстрация counter(5):</strong></p>';
    counter(5);
});