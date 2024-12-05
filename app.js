// app.mjs
import "./MatchCard.mjs";
import { fetchMatches } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  //const API_URL = "http://localhost:3001/api";

  // League abbreviations mapped to their full names
  const leagues = {
    PL: "Premier League",
    PD: "La Liga",
    SA: "Serie A",
    BL1: "Bundesliga",
    PPL: "Primeira Liga",
    DED: "Eredivisie",
    BSA: "Serie A (Brazil)",
  };

  const matchToggle = document.getElementById("matchToggle");
  const leaguesContainer = document.getElementById("leagues");
  let cachedMatches = {}; // Cache to store fetched match data

  // Event listener for the toggle switch
  matchToggle.addEventListener("change", () => {
    const matchType = matchToggle.checked ? "upcoming" : "recent";
    if (cachedMatches[matchType]) {
      renderLeagues(cachedMatches[matchType]);
    } else {
      fetchAndRenderMatches(matchType);
    }
  });

  /**
   * Fetches and renders matches for all leagues.
   * @param {string} type - The type of matches to fetch ('recent' or 'upcoming').
   */
  async function fetchAndRenderMatches(type) {
    leaguesContainer.innerHTML = ""; // Clear previous content
    const leagueData = {};
    await Promise.all(
      Object.keys(leagues).map(async (league) => {
        try {
          const data = await fetchMatches(league, type);
          if (data && data.matches) {
            leagueData[league] = data.matches;
          }
        } catch (error) {
          console.error(`Failed to fetch matches for league: ${league}`, error);
        }
      })
    );
    cachedMatches[type] = leagueData;
    renderLeagues(leagueData);
  }

  /**
   * Renders the leagues and their matches.
   * @param {Object} leagueData - The match data for each league.
   */
  function renderLeagues(leagueData) {
    leaguesContainer.innerHTML = ""; // Clear previous content
    for (const [league, matches] of Object.entries(leagueData)) {
      const leagueDiv = document.createElement("div");
      leagueDiv.className = "league-carousel";
      leagueDiv.innerHTML = `<h2>${leagues[league]}</h2>`; // Use full league name

      const carouselInner = document.createElement("div");
      carouselInner.className = "carousel-inner";

      matches.forEach((match) => {
        const matchCard = document.createElement("match-card");
        /* matchCard.setAttribute("home-team", match.homeTeam.name);
        matchCard.setAttribute("away-team", match.awayTeam.name);
        matchCard.setAttribute("home-crest", match.homeTeam.crest);
        matchCard.setAttribute("away-crest", match.awayTeam.crest);
        matchCard.setAttribute("date", match.utcDate);
        matchCard.setAttribute("home-score", match.score.fullTime.home);
        matchCard.setAttribute("away-score", match.score.fullTime.away);
        matchCard.setAttribute("class", "match-card"); */
        matchCard.dataset.homeTeam = match.homeTeam.name;
        matchCard.dataset.awayTeam = match.awayTeam.name;
        matchCard.dataset.homeCrest = match.homeTeam.crest;
        matchCard.dataset.awayCrest = match.awayTeam.crest;
        matchCard.dataset.date = match.utcDate;
        matchCard.dataset.homeScore = match.score?.fullTime?.home;
        matchCard.dataset.awayScore = match.score?.fullTime?.away;
        matchCard.setAttribute("class", "match-card");
        carouselInner.appendChild(matchCard);
        //console.log(match.score.fullTime.homeTeam,match.score.fullTime.awayTeam);
      });

      leagueDiv.appendChild(carouselInner);
      leagueDiv.appendChild(createCarouselButton("left", carouselInner));
      leagueDiv.appendChild(createCarouselButton("right", carouselInner));
      /* const leftButton = document.createElement("button");
      leftButton.className = "carousel-button left";
      leftButton.innerHTML = "&#10094;"; // Left arrow
      leftButton.onclick = () => slideCarousel(carouselInner, -1);

      const rightButton = document.createElement("button");
      rightButton.className = "carousel-button right";
      rightButton.innerHTML = "&#10095;"; // Right arrow
      rightButton.onclick = () => slideCarousel(carouselInner, 1);

      leagueDiv.appendChild(leftButton);
      leagueDiv.appendChild(rightButton); */

      leaguesContainer.appendChild(leagueDiv);
    }
  }

  /**
   * Creates a carousel navigation button.
   * @param {string} direction - The direction of the button ('left' or 'right').
   * @param {HTMLElement} carouselInner - The carousel inner container.
   * @returns {HTMLButtonElement} - The created button element.
   */
  function createCarouselButton(direction, carouselInner) {
    const button = document.createElement("button");
    button.className = `carousel-button ${direction}`;
    button.innerHTML = direction === "left" ? "&#10094;" : "&#10095;";
    button.onclick = () =>
      slideCarousel(carouselInner, direction === "left" ? -1 : 1);
    return button;
  }

  /**
   * Slides the carousel in the specified direction.
   * @param {HTMLElement} carouselInner - The carousel inner container.
   * @param {number} direction - The direction to slide (-1 for left, 1 for right).
   */
  function slideCarousel(carouselInner, direction) {
    const currentTransform = getComputedStyle(carouselInner).transform;
    const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
    const currentTranslateX = matrixValues
      ? parseFloat(matrixValues[1].split(", ")[4])
      : 0;
    const cardWidth = carouselInner.firstElementChild.offsetWidth;
    const newTranslateX = currentTranslateX - cardWidth * direction;

    // Ensure the carousel doesn't slide out of bounds
    const maxTranslateX = -(cardWidth * (carouselInner.children.length - 1));
    if (newTranslateX <= 0 && newTranslateX >= maxTranslateX) {
      carouselInner.style.transform = `translateX(${newTranslateX - 10.5}px)`;
    }
  }

  // Initial fetch for recent matches
  fetchAndRenderMatches("recent");
});
