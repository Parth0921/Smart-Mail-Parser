import { google, gmail_v1 } from "googleapis";
import oauth2Client from "./get-auth-url.js";
import { Base64 } from "js-base64";
import { htmlToText } from "html-to-text";

type formattedMessagesType = {
  id: string;
  threadId: string;
  snippet: string;
  body: string;
};

export const getMessageIds = async () => {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 5,
  });
  const messageIds = res.data.messages;
  if (!messageIds) {
    return [];
  }
  return messageIds;
};

export const fetchMessages = async (
  messageIds: gmail_v1.Schema$Message[] | undefined
) => {
  if (!messageIds || messageIds.length == 0) {
    return [];
  }

  const messages = await Promise.all(
    messageIds.map(async (message) => {
      const res = await google
        .gmail({ version: "v1", auth: oauth2Client })
        .users.messages.get({
          userId: "me",
          id: message.id!,
        });
      return res.data;
    })
  );

  return messages;
};

export const getFormattedMessages = (messages: gmail_v1.Schema$Message[]) => {
  const formattedMessages = messages.map((message) => {
    if (
      !message.payload ||
      !message.payload.parts ||
      !message.id ||
      !message.threadId ||
      !message.snippet
    ) {
      return {
        id: "",
        threadId: "",
        snippet: "",
        body: "",
      };
    }

    const snippet = message.snippet;
    const parts = message.payload.parts;

    let body = "";

    parts.forEach((part) => {
      if (part.mimeType === "text/plain") {
        if (part.body?.data) {
          body = Base64.decode(part.body.data);
        }
      }
      if (part.mimeType === "text/html") {
        if (part.body?.data) {
          body = Base64.decode(part.body.data);
        }
      }
    });

    if (message.payload?.body?.data) {
      body = Base64.decode(message.payload.body.data);
    }

    return {
      id: message.id,
      threadId: message.threadId,
      snippet: snippet,
      body: body,
    };
  });

  return formattedMessages;
};

export const convertHtmlToText = (
  formattedMessages: formattedMessagesType[]
) => {
  const convertedMessagesToPlainText = formattedMessages.map((message) => {
    const body = message.body;
    const plainTextFromBody = htmlToText(body);
    return {
      ...message,
      body: plainTextFromBody,
    };
  });
  return convertedMessagesToPlainText;
};
