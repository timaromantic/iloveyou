// Настройки сайта. Дата начала отношений: 29 августа 2026 года.
const START_DATE = new Date(2026, 7, 29, 0, 0, 0); // месяцы в JavaScript начинаются с нуля

const intro = document.getElementById("intro");
const app = document.getElementById("app");
const envelopeButton = document.getElementById("open-envelope");

envelopeButton.addEventListener("click", () => {
  envelopeButton.classList.add("opening");
  setTimeout(() => {
    intro.classList.add("hidden");
    app.classList.remove("hidden");
    showPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 900);
});

// Навигация между разделами
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active-page", page.id === pageId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

// Счётчик: полные месяцы + дни, а дни отношений считаются включительно.
// Например, 29 августа — первый день, 2 ноября — 66-й день.
function updateCounter() {
  const now = new Date();
  if (now < START_DATE) return;

  const elapsedMs = now - START_DATE;
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const elapsedDays = Math.floor(totalHours / 24);
  const relationshipDay = elapsedDays + 1;

  let months = (now.getFullYear() - START_DATE.getFullYear()) * 12
    + (now.getMonth() - START_DATE.getMonth());
  const anniversary = new Date(START_DATE);
  anniversary.setMonth(START_DATE.getMonth() + months);
  if (anniversary > now) months--;

  document.getElementById("days-together").textContent = relationshipDay.toLocaleString("ru-RU");
  document.getElementById("months").textContent = months.toLocaleString("ru-RU");
  document.getElementById("hours").textContent = totalHours.toLocaleString("ru-RU");
  document.getElementById("minutes").textContent = totalMinutes.toLocaleString("ru-RU");
  document.getElementById("seconds").textContent = totalSeconds.toLocaleString("ru-RU");
}
updateCounter();
setInterval(updateCounter, 1000);

// Фотоальбом: добавь свои снимки как images/photo1.jpg ... images/photo14.jpg
const photoFiles = Array.from({ length: 14 }, (_, i) => `images/photo${i + 1}.jpg`);
const captions = [
  "Самые красивые моменты — с тобой",
  "Твоя улыбка — моё любимое",
  "Маленькое воспоминание о нас",
  "Хочу сохранить каждый такой момент",
  "С тобой даже обычный день особенный",
  "Ещё одна причина улыбнуться",
  "Такая красивая, что слов не хватает",
  "Пусть таких моментов будет больше",
  "Моё любимое фото сегодня",
  "И это воспоминание — в копилку",
  "Счастье в простых моментах",
  "Продолжение нашей истории впереди ♡",
  "Моя любимый осенний день с тобой♡🌹",
  "Каждый момент с тобой бесценен",
  "Ещё одно наше воспоминание",
  "Хочу переживать это снова",
  "Моя розочка 🌹",
  "Ты делаешь меня счастливее",
  "И таких фотографий будет ещё много",
  "Впереди у нас целая жизнь ♡"
];
let photoIndex = 0;
const photo = document.getElementById("album-photo");
const placeholder = document.getElementById("photo-placeholder");
const photoCaption = document.getElementById("photo-caption");
const pageNumber = document.getElementById("page-number");
const dots = document.getElementById("photo-dots");

function renderDots() {
  dots.innerHTML = "";
  photoFiles.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = `dot${i === photoIndex ? " active" : ""}`;
    dots.appendChild(dot);
  });
}
function showPhoto(index) {
  photoIndex = (index + photoFiles.length) % photoFiles.length;
  const src = photoFiles[photoIndex];
  photo.classList.remove("loaded");
  placeholder.style.display = "flex";
  const testImage = new Image();
  testImage.onload = () => {
    photo.src = src;
    photo.classList.add("loaded");
    placeholder.style.display = "none";
  };
  testImage.onerror = () => {
    photo.classList.remove("loaded");
    placeholder.style.display = "flex";
  };
  testImage.src = src;
  photoCaption.textContent = captions[photoIndex];
  pageNumber.textContent = `${String(photoIndex + 1).padStart(2, "0")} / ${photoFiles.length}`;
  renderDots();
  const page = document.getElementById("photo-page");
  page.animate([{ opacity: .55, transform: "translateX(12px) rotateY(-5deg)" }, { opacity: 1, transform: "translateX(0) rotateY(0)" }], { duration: 360, easing: "ease-out" });
}
document.getElementById("prev-photo").addEventListener("click", () => showPhoto(photoIndex - 1));
document.getElementById("next-photo").addEventListener("click", () => showPhoto(photoIndex + 1));
showPhoto(0);

// Свайпы по альбому на телефоне
let touchStartX = 0;
const photoPage = document.getElementById("photo-page");
photoPage.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
photoPage.addEventListener("touchend", e => {
  const delta = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 45) showPhoto(photoIndex + (delta < 0 ? 1 : -1));
}, { passive: true });

// Открытки
const cards = [
  { emoji: "🌷", title: "Просто так", message: "Моя любимая Аля, просто напоминаю тебе, что ты очень важна для меня. Надеюсь, сегодня у тебя будет много поводов улыбнуться. А если нет — я постараюсь придумать хотя бы один. ♡" },
  { emoji: "💗", title: "Твоя улыбка", message: "Знаешь, твоя улыбка — одна из моих самых любимых вещей на свете. Так что улыбайся почаще, ладно? Тебе безумно идёт. ❤️" },
  { emoji: "🍫", title: "Сладкий сюрприз", message: "Моя любимая Аля, кажется, тебе сейчас захотелось чего-нибудь сладенького… Поэтому загляни в свою сумочку. Там тебя ждёт маленький сюрприз от меня. 🍫\n\nПриятного аппетита, моя сладкоежка! Люблю тебя. ♡" },
  { emoji: "🌙", title: "Когда скучаешь", message: "Если ты сейчас скучаешь, представь, что я крепко-крепко тебя обнимаю. Даже если мы не рядом, ты всё равно в моих мыслях. Скоро увидимся, любимая. ♡" },
  { emoji: "🧸", title: "Обнимашка", message: "Лови самое крепкое виртуальное объятие! При встрече обязательно обменяю его на настоящее. Обнимаю тебя, Аля. 💗" },
  { emoji: "💌", title: "Для моей Али", message: "Ты — моё любимое «хочу ещё немного побыть рядом». Спасибо за наши два месяца и за каждый момент вместе. Впереди ещё столько всего хорошего. ♡" }
];
const modal = document.getElementById("postcard-modal");
document.querySelectorAll("[data-card]").forEach(button => {
  button.addEventListener("click", () => {
    const card = cards[Number(button.dataset.card)];
    document.getElementById("modal-emoji").textContent = card.emoji;
    document.getElementById("modal-title").textContent = card.title;
    document.getElementById("modal-message").textContent = card.message;
    modal.classList.remove("hidden");
  });
});
function closeModal() { modal.classList.add("hidden"); }
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// Секретный сюрприз
document.getElementById("secret-heart-button").addEventListener("click", () => {
  document.getElementById("secret-response").classList.remove("hidden");
  burstHearts(18);
});

// Музыка: Safari/iPhone разрешает воспроизведение после нажатия пользователя.
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Выключить";
      musicToggle.setAttribute("aria-label", "Выключить музыку");
    } catch {
      musicLabel.textContent = "Добавь music.mp3";
    }
  } else {
    music.pause();
    musicLabel.textContent = "Музыка";
    musicToggle.setAttribute("aria-label", "Включить музыку");
  }
});

// Ненавязчивые сердечки на фоне
const heartLayer = document.getElementById("floating-hearts");
function addFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .5 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 14}px`;
  heart.style.animationDuration = `${9 + Math.random() * 8}s`;
  heartLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 18000);
}
setInterval(addFloatingHeart, 1700);
function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = "♥";
      heart.style.left = `${35 + Math.random() * 30}%`;
      heart.style.bottom = "35%";
      heart.style.fontSize = `${15 + Math.random() * 20}px`;
      heart.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      heartLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, i * 65);
  }
}
