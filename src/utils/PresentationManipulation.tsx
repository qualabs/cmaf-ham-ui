import * as Ham from "@svta/common-media-library";

export const deleteTrack = (
  presentation: Ham.Presentation,
  trackId: string
) => {
  // We create a new object so react can see the state change
  return { ...deleteTrackFromPresentation(presentation, trackId) };
};

const deleteTrackFromPresentation = (
  presentation: Ham.Presentation,
  trackId: string
): Ham.Presentation => {
  let _selectionSet = presentation.selectionSets.find((selectionSet) => {
    return deleteTrackFromSelectionSet(selectionSet, trackId);
  });
  // delete selecionSet if empty
  return presentation;
};

const deleteTrackFromSelectionSet = (
  selectionSet: Ham.SelectionSet,
  trackId: string
) => {
  let switchingSet = selectionSet.switchingSets.find((switchingSet) =>
    deleteTrackFromSwitchingSet(switchingSet, trackId)
  );
  // delete switchingSet if empty
  return switchingSet;
};

const deleteTrackFromSwitchingSet = (
  switchingSet: Ham.SwitchingSet,
  trackId: string
) => {
  const index = switchingSet.tracks.findIndex((track) => track.id == trackId);
  if (index == -1) {
    return undefined;
  }
  // only splice array when item is found
  switchingSet.tracks = switchingSet.tracks.splice(index, 1);
  return switchingSet;
};
