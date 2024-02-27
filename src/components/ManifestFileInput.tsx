export const ManifestFileInput = ({
  onSubmit,
  onFile,
  toggleMediaPlaylistInputs
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onFile: React.FormEventHandler<HTMLInputElement>;
  toggleMediaPlaylistInputs: boolean;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="file" onInput={onFile} />
      <button type="submit">Go</button>
    </form>
  );
};
