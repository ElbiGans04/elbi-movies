export default function fetcher(url: string) {
  return fetch(url, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjIwZTI3ZmY5ZTUxMTdiY2FlNDEyZjRhNGU4MTEyMyIsInN1YiI6IjY0ZTYyNDhlNzcwNzAwMDBhZTA2ZTM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TA8Z8JtMng1RYdz9wTad8RXhmKXOaI3Ltt_0KAeq_pY",
    },
  }).then((res) => res.json());
}
