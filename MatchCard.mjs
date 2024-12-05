// MatchCard.mjs
import { formatDate } from "./utils.js";

class MatchCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    /* const homeTeam = this.getAttribute("home-team");
    const awayTeam = this.getAttribute("away-team");
    const homeCrest = this.getAttribute("home-crest");
    const awayCrest = this.getAttribute("away-crest");
    const date = new Date(this.getAttribute("date"));
    const homeScore = this.getAttribute("home-score");
    const awayScore = this.getAttribute("away-score"); */

    // Destructure attributes from the dataset for easier access
    const {
      homeTeam,
      awayTeam,
      homeCrest,
      awayCrest,
      date,
      homeScore,
      awayScore,
    } = this.dataset;

    //console.log(homeTeam, awayTeam, date, homeScore, awayScore);

    /* const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`; */

    this.shadowRoot.innerHTML = `
          <style>
              .card {
                  padding: 10px 10px 5px 40px;
                  margin: 5px;
                  border-radius: 5px;
                  background-color: #f9f9f9;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  position: relative;
              }
              .date {
                  position: absolute;
                  top: 5px;
                  margin-bottom: 5px;
                  left: 5px;
                  font-size: 12px;
                  color: #555;
              }
              .team {
                  margin-top: 10px;
                  margin-bottom: 5px;
                  font-size: 16px;
              }
                  .team img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
              .score {
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
              }
              .score-box {
                  background-color: #e0e0e0;
                  padding: 5px;
                  border-radius: 3px;
                  width: 40px;
                  text-align: center;
              }
          </style>
          <div class="card">
              <div class="date">${formatDate(date)}</div>
              <div class="team">
                    <img src="${homeCrest}" alt="${homeTeam} crest">
                    ${homeTeam}
                </div>
                <div class="team">
                    <img src="${awayCrest}" alt="${awayTeam} crest">
                    ${awayTeam}
                </div>
              <div class="score">
                  <div class="score-box">${
                    homeScore !== "null" && homeScore !== undefined
                      ? homeScore
                      : "n/a"
                  }</div>
                  <div class="score-box">${
                    awayScore !== "null" && awayScore !== undefined
                      ? awayScore
                      : "n/a"
                  }</div>
              </div>
          </div>
      `;
  }
}

customElements.define("match-card", MatchCard);
