document.addEventListener("DOMContentLoaded", function () {

  /*  
  =======================================
  TODO1: Welcome Board
  ---------------------------------------
  */
  const t1 = document.getElementById("t1-msg");
  if (t1) t1.textContent = "Hello, World!";

  /*  
  =======================================
  TODO2: Interaction Corner
  ---------------------------------------
  */
  const btn = document.getElementById("t2-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      const statusP = document.getElementById("t2-status");
      if (statusP) statusP.textContent = "You clicked the button!";
    });
  }

  /*  
  =======================================
  TODO3: Inspiring Quote Board
  ---------------------------------------
  */
  const quoteBtn = document.getElementById("t3-loadQuote");
  if (quoteBtn) {
    quoteBtn.addEventListener("click", function () {
      fetch("https://dummyjson.com/quotes/random")
        .then(function (response) {
          if (!response.ok) { throw new Error("HTTP " + response.status); }
          return response.json();
        })
        .then(function (data) {
          const qEl = document.getElementById("t3-quote");
          const aEl = document.getElementById("t3-author");
          if (qEl) qEl.textContent = (data && data.quote) ? data.quote : "—";
          if (aEl) aEl.textContent = (data && data.author) ? "— " + data.author : "";
        })
        .catch(function () {
          const qEl = document.getElementById("t3-quote");
          const aEl = document.getElementById("t3-author");
          if (qEl) qEl.textContent = "Failed to load quote.";
          if (aEl) aEl.textContent = "";
        });
    });
  }

  /*  
  =======================================
  TODO4: Dammam Weather Now
  ---------------------------------------
  */
  const wxBtn  = document.getElementById("t4-loadWx");
  const tempEl = document.getElementById("t4-temp");
  const humEl  = document.getElementById("t4-hum");
  const windEl = document.getElementById("t4-wind");
  const errEl  = document.getElementById("t4-err"); // عنصر الخطأ حسب الـHTML

  if (wxBtn) {
    wxBtn.addEventListener("click", function () {
      const base  = "https://api.openweathermap.org/data/2.5/weather";
      const city  = "Dammam";
      const units = "metric";
      const key   = "d51f2f00c3b137ccfd135bd8f9dd50aa"; // ← ضعي مفتاحك هنا

      const url = `${base}?q=${encodeURIComponent(city)}&appid=${key}&units=${units}`;

      wxBtn.disabled = true;
      if (errEl) errEl.textContent = "Loading…";
      tempEl.textContent = "—";
      humEl.textContent  = "—";
      windEl.textContent = "—";

      fetch(url)
        .then(function (response) {
          if (!response.ok) { throw new Error("HTTP " + response.status); }
          return response.json();
        })
        .then(function (data) {
          const t = data && data.main ? data.main.temp : undefined;
          const h = data && data.main ? data.main.humidity : undefined;
          const w = data && data.wind ? data.wind.speed : undefined;

          tempEl.textContent = (typeof t === "number") ? Math.round(t) + " °C" : "—";
          humEl.textContent  = (typeof h === "number") ? h + " %" : "—";
          windEl.textContent = (typeof w === "number") ? w + " m/s" : "—";

          if (errEl) errEl.textContent = "";
        })
        .catch(function () {
          if (errEl) errEl.textContent = "Couldn't load weather.";
        })
        .finally(function () {
          wxBtn.disabled = false;
        });
    });
  }
});
