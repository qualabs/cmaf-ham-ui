import Info from "@mui/icons-material/Info";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}));

const ToolTip = ({ title }: { title: string }) => {
  return (
    <LightTooltip title={title} placement="right">
      <Info fontSize="medium"></Info>
    </LightTooltip>
  );
};

export default ToolTip;
