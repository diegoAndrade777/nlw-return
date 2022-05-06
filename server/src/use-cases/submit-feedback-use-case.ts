import { MailAdapter } from "../adapters/mail.adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdpter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required!");
    }

    if (!comment) {
      throw new Error("Comment is required!");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format!");
    }

    this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdpter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `\n`,
        screenshot ? `<img src='${screenshot}' alt='imagem'/>` : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
