type FallbackProps = {
  message?: string;
};

export default function Fallback({ message }: FallbackProps) {
  return <div>{message || "로딩 중..."}</div>;
}
