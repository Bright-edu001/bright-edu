const Url =
  "https://script.google.com/macros/s/AKfycbwMZClqtPETWQ6ZOBU0pPX9XfALmkUqBd4P1tu-L3b4Frwmvl1yPAwj4YQ7uCXPjfov/exec";
// REQUEST (GET, POST) value --擇一
export const request = async (query, value) => {
  if (query === "GET") {
    const response = await fetch(`${Url}?${ObjectToQueryString(value)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  }
  if (query === "POST") {
    const response = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  }
};

const ObjectToQueryString = (data) => {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
};
