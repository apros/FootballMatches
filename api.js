// api.js

/**
 * Fetches match data for a given league and match type.
 * @param {string} league - The league abbreviation.
 * @param {string} type - The type of matches to fetch ('recent' or 'upcoming').
 * @returns {Promise<Object>} - A promise that resolves to the match data.
 */
export async function fetchMatches(league, type) {
  const response = await fetch(
    `http://localhost:3001/api/${league}/matches?status=${
      type === "recent" ? "FINISHED" : "SCHEDULED"
    }`
  );
  return response.json();
}
