/* eslint-disable prefer-const */
export default function FindIndex() {
  let numberArray1 = [1, 2, 4, 5, 6];
  let stringArray1 = ["string1", "string3"];

  const fourIndex = numberArray1.findIndex((a) => a === 4);
  const string3Index = stringArray1.findIndex((a) => a === "string3");
  return (
    <div id="wd-find-index">
      <h4>FindIndex function</h4>
      <p>fourIndex = {fourIndex}</p>
      <p>string3Index = {string3Index}</p>
    </div>
  );
}
