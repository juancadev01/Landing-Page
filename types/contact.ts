export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  service: string;
  city: string;
  message: string;
  consent: boolean;
  website: string;
};

export type ContactApiResponse = {
  ok?: boolean;
  error?: string;
};
