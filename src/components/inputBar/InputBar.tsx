import LabeledInput from "../common/LabledInput";

import MinusIcon from "@/assets/icons/minus.svg?react";

export default function InputBar() {
  return (
    <div className="bg-neutral-surface-default border-neutral-border-default flex h-19 gap-6 divide-x-1 border px-6 py-4 [&>*:not(:last-child)]:pr-6">
      <DateField />
      <AmountField />
      <DescriptionField />
      <PaymentMethodField />
      <CategoryField />
    </div>
  );
}

function DateField() {
  return (
    <LabeledInput label="일자" htmlFor="date" width="w-[88px]">
      <input type="date" id="date" className="text-semibold-12" />
    </LabeledInput>
  );
}

function AmountField() {
  return (
    <LabeledInput label="금액" htmlFor="amount" width="w-[134px]">
      <div className="flex justify-between">
        <button>
          <MinusIcon />
        </button>
        <div className="flex gap-1">
          <input type="text" id="amount" className="text-semibold-12 w-full" />
          원
        </div>
      </div>
    </LabeledInput>
  );
}

function DescriptionField() {
  return (
    <LabeledInput label="내용" htmlFor="description" width="w-[160px]">
      <input
        type="text"
        id="description"
        className="text-semibold-12"
        placeholder="입력하세요"
      />
    </LabeledInput>
  );
}

function PaymentMethodField() {
  return (
    <LabeledInput label="결제수단" htmlFor="payment-method" width="w-[104px]">
      <select id="payment-method" className="text-semibold-12">
        <option value="card">신용카드</option>
        <option value="bank">계좌이체</option>
        <option value="cash">현금</option>
      </select>
    </LabeledInput>
  );
}

function CategoryField() {
  return (
    <LabeledInput label="카테고리" htmlFor="category" width="w-[104px]">
      <select id="category" className="text-semibold-12">
        <option value="food">식비</option>
        <option value="transport">교통비</option>
        <option value="entertainment">오락비</option>
      </select>
    </LabeledInput>
  );
}
