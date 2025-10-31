import { deleteRequest, getRequest, postRequest } from ".";

type GetPaymentMethodListResponse = string[];

export const getPaymentMethodList = () => {
  return getRequest<GetPaymentMethodListResponse>("/payment-method");
};

export const createPaymentMethod = (method: string) => {
  return postRequest("/payment-method", { method });
};

export const deletePaymentMethod = (method: string) => {
  return deleteRequest(`/payment-method/${encodeURIComponent(method)}`);
};
