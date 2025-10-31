import { deleteRequest, getRequest } from ".";

type GetPaymentMethodListResponse = string[];

export const getPaymentMethodList = () => {
  return getRequest<GetPaymentMethodListResponse>("/payment-method");
};

export const deletePaymentMethod = (method: string) => {
  return deleteRequest(`/payment-method/${encodeURIComponent(method)}`);
};
