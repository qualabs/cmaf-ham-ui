import { Box } from "@mui/material";
import ToolTip from "./ToolTip";

interface Props {
  id?: string;
  text: string;
  info: string;
  headerLevel: number;
}

const InfoBox = ({ id, text, info, headerLevel }: Props) => {
  const HeaderTag = `h${headerLevel}` as keyof JSX.IntrinsicElements;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      gap={1}
    >
      <HeaderTag>
        {text}:{id}
      </HeaderTag>
      <ToolTip title={info}></ToolTip>
    </Box>
  );
};

export default InfoBox;
