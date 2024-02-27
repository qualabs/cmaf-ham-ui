export const ManifestUrlInput = ({
  onSubmit,
  onUri,
  toggleMediaPlaylistInputs
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onUri: React.FormEventHandler<HTMLInputElement>;
  toggleMediaPlaylistInputs: boolean;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="uri" onInput={onUri} />
      <button type="submit">Go</button>
    </form>
  );
};
