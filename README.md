# Libera o Wifi Bot

Telegram Bot for the #liberaowifi campaign.

## Usage
To use the Telegram Bot API, you first have to get a bot account by [chatting with BotFather](https://core.telegram.org/bots#6-botfather).

Build the image
```
docker build -t liberaowifi-bot .
```

Run the image
```
docker run -d --name liberaowifi-bot \
  -e BOT_TOKEN="xxx-xxx-xx" \
  -p 4000:4000 \
  --restart unless-stopped \
  liberaowifi-bot
```
Or Rename the `.env.sample` file to `.env` and edit it with needed configuration.
