import IconButton from "../IconButton/IconButton";
import "./info.css";
import { motion } from "framer-motion";
import CloseIcon from "../../assets/icons/close.svg?react";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="info-container"
    >
      <div className="info-header">
        <h3>
          <motion.span>About CMAF HAM Converter</motion.span>
        </h3>
        <div className="info-actions">
          <IconButton
            icon={<CloseIcon />}
            onClick={onClose}
            backgroundColor="transparent"
            label="Edit Info"
          />
        </div>
      </div>
      <div className="info-content">
        <p>
          CMAF HAM Converter is a tool that transforms configuration manifests
          into a more manageable or compatible format, simplifying the
          management of complex settings by converting them into an
          easier-to-use file.
        </p>
        <br />
        <p>
          Developed by <strong>Qualabs</strong>-
          <a href="https://github.com/qualabs/cmaf-ham-ui" target="_blank">
            Github
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Info;
