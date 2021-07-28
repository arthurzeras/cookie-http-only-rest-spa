const loginBtn = document.querySelector('#login-btn');
const getUserBtn = document.querySelector('#get-user-btn');

async function auth() {
  try {
    const response = await fetch('http://localhost:1234/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'example@gmail.com', password: '1234' }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();

    console.log({ data });
  } catch (error) {
    console.error(error);
  }
}

async function getUser() {
  try {
    const response = await fetch('http://localhost:1234/me', {
      credentials: 'include',
    });

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();

    console.log({ data });
  } catch (error) {
    console.error(error);
  }
}

loginBtn.addEventListener('click', () => auth());
getUserBtn.addEventListener('click', () => getUser());
