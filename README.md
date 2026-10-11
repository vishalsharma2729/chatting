# Chatting

A simple group chat app hosted on Netlify. Pages are static HTML in `public/`, messages are stored in Netlify Database and served by the `netlify/functions/messages.ts` function (`/api/messages`). The chat page polls for new messages every 2 seconds.

## Run locally

1) `git clone https://github.com/vishalsharma2729/chatting.git`
2) `npm install`
3) `npm install -g netlify-cli`
4) `npm run dev` (runs `netlify dev`) and open the URL it prints

## How to use

1) Enter your name and press Login
2) Type your message and press Send

Open the site in two browser tabs (or on two devices) to send and receive messages.
