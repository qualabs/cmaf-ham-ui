export const ManifestInput = ({
  onSubmit,
  onFile,
  onUri,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onFile: React.FormEventHandler<HTMLInputElement>;
  onUri: React.FormEventHandler<HTMLInputElement>;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="file" onInput={onFile} />
      <input type="uri" onInput={onUri} />
      <button type="submit">Go</button>
    </form>
  );
};
