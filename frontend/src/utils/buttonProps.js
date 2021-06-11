export const buttonFocusProps = {
  _focus: {
    boxShadow: "rgb(255, 208, 174) 0px 0px 0px 3px",
  },
};

export const navButtonProps = {
  display: "flex",
  fontWeight: "semibold",
  _hover: {
    textDecoration: "none",
    color: "accent.400",
  },
  _focus: {
    color: "accent.500",
  },
};

export const primaryButtonStyleProps = {
  color: "gray.50",
  bg: "orange.500",
  width: "100%",
  cursor: "pointer",
  px: "1rem",
  borderRadius: "full",
  py: "0.5rem",
  height: "auto",
  fontWeight: "normal",
  _hover: { bg: "orange.600" },
  _active: {
    bg: "orange.600",
    borderColor: "orange.700",
  },
  _focus: {
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
};
