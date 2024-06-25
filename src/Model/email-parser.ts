type mailObjectType = {
  body: string;
  id: string;
  threadId: string;
  snippet: string;
  sender: string;
  label?: string;
  reply?: string;
};

class EmailParser {
  mails: mailObjectType[];
  constructor() {
    this.mails = [];
  }

  addMail(mail: mailObjectType) {
    this.mails.push(mail);
    console.log(mail);
  }
}

const emailParser = new EmailParser();
export default emailParser;
