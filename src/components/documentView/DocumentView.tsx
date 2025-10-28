import EntryList from "./entryList/EntryList";
import InputBar from "./inputBar/InputBar";

export default function DocumentView() {
  return (
    <div>
      <InputBar />
      <EntryList />
    </div>
  );
}
