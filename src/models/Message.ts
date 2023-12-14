import { PrimitiveConstant } from "./Base";

type Phone = PrimitiveConstant<string, 'Phone'>;
type MessageBody = PrimitiveConstant<string, 'MessageBody'>;

export interface MessageBase {
  phone_number: Phone;
  body: MessageBody;
}

type MessageId = PrimitiveConstant<number, 'MessageId'>;
export interface MessageResponse extends Omit<MessageBase, 'phone_number'> {
  id: MessageId;
  phone: Phone;
  status: 'accepted' | 'scheduled' | 'canceled' | 'queued' | 'sending' | 'sent' | 'failed'
  | 'delivered' | 'undelivered' | 'receiving' | 'received' | 'read';
  sentAt: Date;
  errorMessage?: string;
}
