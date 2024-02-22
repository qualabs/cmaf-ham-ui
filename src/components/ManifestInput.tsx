import React, { useEffect, useMemo, useState } from "react";

export const ManifestInput = ({
	onInput,
}: {
	onInput: React.FormEventHandler<HTMLInputElement>;
}) => {
	return <input type="file" onInput={onInput} />;
};
