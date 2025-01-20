const iceConfig = [
  {
    urls: "stun:stun.relay.metered.ca:80",
  },
  {
    urls: "turn:global.relay.metered.ca:80",
    username: import.meta.env.VITE_RTC_USER,
    credential: import.meta.env.VITE_RTC_PASS,
  },
  {
    urls: "turn:global.relay.metered.ca:80?transport=tcp",
    username: import.meta.env.VITE_RTC_USER,
    credential: import.meta.env.VITE_RTC_PASS,
  },
  {
    urls: "turn:global.relay.metered.ca:443",
    username: import.meta.env.VITE_RTC_USER,
    credential: import.meta.env.VITE_RTC_PASS,
  },
  {
    urls: "turns:global.relay.metered.ca:443?transport=tcp",
    username: import.meta.env.VITE_RTC_USER,
    credential: import.meta.env.VITE_RTC_PASS,
  },
];

export default iceConfig;
