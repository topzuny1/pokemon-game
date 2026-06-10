// js/script.js

const images = ['./images/bg1.png', './images/bg2.png', './images/bg3.png'];
const pokemonImages = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png'
];

const STORAGE_KEYS = { ADMIN: 'adminMode' };
const MENU_ROUTES = { '설명': 'description.html', '야생': 'wild.html', '파밍': 'farming.html' };

let currentIndex = 0;
let pokemonIndex = 0;

function getStorage(key, fallback = null) {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
}

function setStorage(key, value) {
    localStorage.setItem(key, value);
}

function removeStorage(key) {
    localStorage.removeItem(key);
}

function isAdminMode() {
    return getStorage(STORAGE_KEYS.ADMIN) === 'true';
}

function setAdminMode(value) {
    if (value) {
        setStorage(STORAGE_KEYS.ADMIN, 'true');
    } else {
        removeStorage(STORAGE_KEYS.ADMIN);
    }
    updateAdminToggle();
}

function toggleAdminMode() {
    const nextMode = !isAdminMode();
    setAdminMode(nextMode);
    alert(`어드민 모드가 ${nextMode ? 'ON' : 'OFF'} 되었습니다.`);
}

function updateAdminToggle() {
    const btn = document.getElementById('adminToggleBtn');
    const status = document.getElementById('adminStatus');
    if (!btn || !status) return;

    const active = isAdminMode();
    btn.textContent = active ? '어드민 ON' : '어드민 OFF';
    status.textContent = `어드민 모드: ${active ? 'ON' : 'OFF'}`;
}

function rotatePokemonImage() {
    const img = document.getElementById('pokemonRotatorImg');
    if (!img) return;
    pokemonIndex = (pokemonIndex + 1) % pokemonImages.length;
    img.src = pokemonImages[pokemonIndex];
}

function changeBackground() {
    const bgSlider = document.getElementById('bg-slider');
    if (!bgSlider) return;

    bgSlider.style.backgroundImage = `url('${images[currentIndex]}')`;
    console.log(`메인 배경 화면 변경 완료: ${images[currentIndex]}`);
    currentIndex = (currentIndex + 1) % images.length;
}

// 스크립트 로드 시 즉시 안전 기동
document.addEventListener('DOMContentLoaded', () => {
    updateAdminToggle();
    
    // 💡 첫 화면 구동 시 딜레이 없이 첫 번째 사진 강제 로드
    changeBackground(); 
    setInterval(changeBackground, 7000); // 7초마다 슬라이드 전환
    
    // 포켓몬 로테이터 초기화
    rotatePokemonImage();
    setInterval(rotatePokemonImage, 5000);
});

function selectMenu(menuName) {
    window.location.href = MENU_ROUTES[menuName] || 'index.html';
}