export default function fetcher(url: string) {
  return fetch(url, {
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  }).then((res) => res.json());
}
