import * as Ham from "@svta/common-media-library/cmaf-ham";

export default function Track({ track }: { track: Ham.Track }) {
  return (
    <div>
      <span>${track.id}</span>
    </div>
  );
}
